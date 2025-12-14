import { NextResponse } from "next/server";
import path from "path";

// Windows + Next.js server runtime: Python'ı child_process ile çağıracağız
import { spawn } from "child_process";

export async function GET() {
  return NextResponse.json({
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
  });
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

function runPythonPredict(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // ml klasöründeki predict.py'ı çağıracağız
    const scriptPath = path.join(process.cwd(), "ml", "predict.py");

    const py = spawn("python", [scriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (d) => (stdout += d.toString()));
    py.stderr.on("data", (d) => (stderr += d.toString()));

    py.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(stderr || `Python process exited with code ${code}`));
      }
      try {
        const parsed = JSON.parse(stdout.trim());
        resolve(parsed);
      } catch (e) {
        reject(new Error(`Python output JSON değil: ${stdout}\nERR:${stderr}`));
      }
    });

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
        { status: 400 }
      );
    }

    // Basit doğrulama
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
          { status: 400 }
        );
      }
    }

    // Python'a gönder
    const pyResult = await runPythonPredict({ features });

    return NextResponse.json({
      ok: true,
      prediction: pyResult.prediction,
      probabilities: pyResult.probabilities,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "API hata", details: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
