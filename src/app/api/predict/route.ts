import { NextResponse } from "next/server";
import path from "path";
import { spawn } from "child_process";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      message: "API çalışıyor. POST ile /api/predict kullan.",
      expectedBody: {
        features: {
          yas: 22,
          cinsiyet: "Kadın",
          ruh_hali: "Mutlu",
          enerji: 3,
          saat_araligi: "Akşam",
          kiminle: "Tek başıma",
          sure_tercihi: "Orta",
          dil: "Türkçe",
          yeni_klasik: "Klasik",
          favori_tur: "Komedi",
          platform: "Netflix",
          onerilen_sure: "Orta",
        },
      },
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}

type Features = {
  yas: number;
  cinsiyet: string;
  ruh_hali: string;
  enerji: number;
  saat_araligi: string;
  kiminle: string;
  sure_tercihi: string;
  dil: string;
  yeni_klasik: string;
  favori_tur: string;
  platform: string;
  onerilen_sure: string;
};

// İsteğe bağlı: bozuk Türkçe karakter gelirse düzelt (sigorta)
function fixTurkish(s: string) {
  return s
    .replaceAll("E�lenceli", "Eğlenceli")
    .replaceAll("Duygusal", "Duygusal")
    .replaceAll("Macera", "Macera")
    .replaceAll("Gerilim", "Gerilim");
}

function runPythonPredict(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "ml", "predict.py");

    // shell:true yerine direkt çalıştırmak genelde daha stabil
    const py = spawn("python", [scriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    });

    // ✅ kritik: stdout/stderr encoding’i UTF-8 yap
    py.stdout.setEncoding("utf8");
    py.stderr.setEncoding("utf8");

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (d) => (stdout += d));
    py.stderr.on("data", (d) => (stderr += d));

    py.on("error", (err) => {
      reject(err);
    });

    py.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(stderr || `Python process exited with code ${code}`));
      }

      // stdout JSON değilse debug kolay olsun
      const raw = stdout.trim();

      try {
        // JSON parse etmeden önce “sigorta” düzeltmesi:
        const fixed = fixTurkish(raw);

        const parsed = JSON.parse(fixed);
        resolve(parsed);
      } catch (e) {
        reject(new Error(`Python output JSON değil: ${raw}\nERR:${stderr}`));
      }
    });

    // Python'a JSON gönder
    py.stdin.write(JSON.stringify(payload));
    py.stdin.end();
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const features = body?.features as Features;

    if (!features) {
      return NextResponse.json(
        { ok: false, error: "features alanı zorunlu" },
        {
          status: 400,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
    }

    const requiredKeys: (keyof Features)[] = [
      "yas",
      "cinsiyet",
      "ruh_hali",
      "enerji",
      "saat_araligi",
      "kiminle",
      "sure_tercihi",
      "dil",
      "yeni_klasik",
      "favori_tur",
      "platform",
      "onerilen_sure",
    ];

    for (const k of requiredKeys) {
      if (features[k] === undefined || features[k] === null || features[k] === "") {
        return NextResponse.json(
          { ok: false, error: `Eksik alan: ${k}` },
          {
            status: 400,
            headers: { "Content-Type": "application/json; charset=utf-8" },
          }
        );
      }
    }

    const pyResult = await runPythonPredict({ features });

    // Eğer python tarafı label döndürüyorsa onu da sigortala:
    const prediction = typeof pyResult?.prediction === "string"
      ? fixTurkish(pyResult.prediction)
      : pyResult?.prediction;

    // probabilities key'leri de sigortala:
    let probabilities = pyResult?.probabilities;
    if (probabilities && typeof probabilities === "object") {
      const fixedProbs: Record<string, any> = {};
      for (const [k, v] of Object.entries(probabilities)) {
        fixedProbs[fixTurkish(k)] = v;
      }
      probabilities = fixedProbs;
    }

    return NextResponse.json(
      {
        ok: true,
        prediction,
        probabilities,
      },
      { headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "API hata", details: String(e?.message ?? e) },
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }
}
