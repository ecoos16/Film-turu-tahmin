"use client";

import { useEffect, useMemo, useState } from "react";

type PredictResponse = {
  prediction: string;
  probabilities?: Record<string, number>;
};

const favTurOptions = [
  "Aksiyon",
  "Bilim-Kurgu",
  "Fantastik",
  "Animasyon",
  "Komedi",
  "Romantik",
  "Dram",
  "Korku",
];

const ruhHaliOptions = [
  "Mutlu",
  "Sakin",
  "Stresli",
  "Yorgun",
  "Heyecanlı",
  "Üzgün",
  "Sinirli",
  "Kararsız",
];

const dilOptions = ["Türkçe", "Yabancı", "Fark etmez"];
const yeniKlasikOptions = ["Yeni çıkan", "Klasik", "Fark etmez"];
const sureOptions = ["Kısa", "Orta", "Uzun"];
const saatOptions = ["Sabah", "Öğle", "Akşam", "Gece"];
const kiminleOptions = ["Tek başıma", "Arkadaşlarımla", "Ailemle", "Sevgilimle", "Diğer"];
const platformOptions = ["Netflix", "BluTV", "Disney+", "Amazon Prime", "Sinema", "TV", "YouTube", "Fark etmez"];

const recommendations: Record<string, { title: string; note: string }[]> = {
  Macera: [
    { title: "Mad Max: Fury Road", note: "yüksek tempo, aksiyon" },
    { title: "Inception", note: "macera + zihin oyunu" },
    { title: "The Martian", note: "bilim-kurgu / hayatta kalma" },
  ],
  "Eğlenceli": [
    { title: "The Grand Budapest Hotel", note: "absürt/estetik komedi" },
    { title: "Inside Out", note: "animasyon + duygusal mizah" },
    { title: "Jojo Rabbit", note: "kara mizah" },
  ],
  Duygusal: [
    { title: "The Pursuit of Happyness", note: "motivasyon + dram" },
    { title: "La La Land", note: "romantik + müzikal" },
    { title: "A Man Called Otto", note: "hüzünlü ama sıcak" },
  ],
  Gerilim: [
    { title: "Get Out", note: "gerilim + sosyal eleştiri" },
    { title: "Shutter Island", note: "psikolojik gerilim" },
    { title: "A Quiet Place", note: "yüksek tansiyon" },
  ],
};

type Stats = { total: number; correct: number };

export default function DemoForm() {
  // ✅ Modelin eğitimde gördüğü alanlar (raw)
  const [yas, setYas] = useState<number>(22);
  const [cinsiyet, setCinsiyet] = useState("Kadın");
  const [ruh_hali, setRuhHali] = useState("Mutlu");
  const [enerji, setEnerji] = useState<number>(3);

  const [saat_araligi, setSaatAraligi] = useState("Akşam");
  const [kiminle, setKiminle] = useState("Tek başıma");
  const [sure_tercihi, setSureTercihi] = useState("Orta");

  const [dil, setDil] = useState("Fark etmez");
  const [yeni_klasik, setYeniKlasik] = useState("Fark etmez");
  const [platform, setPlatform] = useState("Fark etmez");
  const [favori_tur, setFavoriTur] = useState("Komedi");

  const [result, setResult] = useState<string | null>(null);
  const [proba, setProba] = useState<Record<string, number> | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Kendi test doğruluk sayacı
  const [trueLabel, setTrueLabel] = useState<string>("");
  const [stats, setStats] = useState<Stats>({ total: 0, correct: 0 });

  useEffect(() => {
    const raw = localStorage.getItem("demo_stats");
    if (raw) {
      try {
        setStats(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("demo_stats", JSON.stringify(stats));
  }, [stats]);

  const sortedProba = useMemo(() => {
    if (!proba) return [];
    return Object.entries(proba).sort((a, b) => b[1] - a[1]);
  }, [proba]);

  const topConfidence = useMemo(() => {
    if (sortedProba.length === 0) return null;
    return Math.round(sortedProba[0][1] * 100);
  }, [sortedProba]);

  const accuracyLocal = useMemo(() => {
    if (stats.total === 0) return null;
    return Math.round((stats.correct / stats.total) * 100);
  }, [stats]);

  async function handlePredict() {
    setLoading(true);
    setError(null);
    setResult(null);
    setProba(null);
    setTrueLabel("");

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: {
            yas,
            cinsiyet,
            ruh_hali,
            enerji,
            saat_araligi,
            kiminle,
            sure_tercihi,
            dil,
            yeni_klasik,
            platform,
            // ✅ tek süre seçimi: ikinci alanı UI’dan kaldırdık, burada eşit gönderiyoruz
            onerilen_sure: sure_tercihi,
            favori_tur,
          },
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok) throw new Error(data?.details || data?.error || "Tahmin sırasında hata oluştu.");

      const parsed = data as PredictResponse;
      setResult(parsed.prediction);
      setProba(parsed.probabilities ?? null);
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 shadow-sm">
      {/* Model rapor metrikleri */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="text-sm text-zinc-400">Model rapor metrikleri (hold-out test)</div>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-zinc-700 bg-zinc-900/30 px-3 py-1 text-zinc-200">
            Accuracy: <b>0.688</b>
          </span>
          <span className="rounded-full border border-violet-700/40 bg-violet-900/20 px-3 py-1 text-violet-200">
            Macro-F1: <b>0.596</b>
          </span>
          <span className="rounded-full border border-zinc-700 bg-zinc-900/30 px-3 py-1 text-zinc-200">
            Sınıflar: <b>4</b>
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Yaş */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Yaş</div>
          <input
            type="number"
            min={10}
            max={90}
            value={yas}
            onChange={(e) => setYas(Number(e.target.value))}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
          />
        </label>

        {/* Cinsiyet */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Cinsiyet</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={cinsiyet}
            onChange={(e) => setCinsiyet(e.target.value)}
          >
            <option>Kadın</option>
            <option>Erkek</option>
            <option>Diğer</option>
          </select>
        </label>

        {/* Ruh hali (dropdown) */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Ruh hali</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={ruh_hali}
            onChange={(e) => setRuhHali(e.target.value)}
          >
            {ruhHaliOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        {/* Enerji */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Enerji (1–5)</div>
          <input
            type="number"
            min={1}
            max={5}
            value={enerji}
            onChange={(e) => setEnerji(Number(e.target.value))}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
          />
        </label>

        {/* Saat aralığı */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Zaman dilimi</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={saat_araligi}
            onChange={(e) => setSaatAraligi(e.target.value)}
          >
            {saatOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        {/* Kiminle */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Genelde kiminle?</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={kiminle}
            onChange={(e) => setKiminle(e.target.value)}
          >
            {kiminleOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        {/* Süre tercihi (tek) */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Süre tercihi</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={sure_tercihi}
            onChange={(e) => setSureTercihi(e.target.value)}
          >
            {sureOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        {/* Dil */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Dil</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={dil}
            onChange={(e) => setDil(e.target.value)}
          >
            {dilOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        {/* Yeni/Klasik */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Yeni mi klasik mi?</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={yeni_klasik}
            onChange={(e) => setYeniKlasik(e.target.value)}
          >
            {yeniKlasikOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        {/* Platform */}
        <label className="space-y-2">
          <div className="text-sm text-zinc-300">Platform</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {platformOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        {/* Favori tür */}
        <label className="space-y-2 md:col-span-3">
          <div className="text-sm text-zinc-300">Favori tür</div>
          <select
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-violet-600"
            value={favori_tur}
            onChange={(e) => setFavoriTur(e.target.value)}
          >
            {favTurOptions.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={handlePredict}
        disabled={loading}
        className="w-full rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-60"
      >
        {loading ? "Tahmin ediliyor..." : "Tahmin Et"}
      </button>

      {error && (
        <div className="rounded-2xl border border-red-900/40 bg-red-950/30 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Tahmin kutusu */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="text-sm text-zinc-400">Tahmin edilen tür</div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <div className="text-2xl font-semibold text-violet-200">{result}</div>
              {topConfidence !== null && (
                <div className="rounded-full border border-violet-700/40 bg-violet-900/20 px-3 py-1 text-sm text-violet-200">
                  %{topConfidence} güven
                </div>
              )}
            </div>
          </div>

          {/* Sınıf olasılıkları */}
          {proba && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-sm text-zinc-400">Sınıf olasılıkları</div>
              <div className="mt-3 space-y-2">
                {sortedProba.map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <div className="w-32 text-sm text-zinc-200">{k}</div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                      <div className="h-full bg-violet-500" style={{ width: `${Math.round(v * 100)}%` }} />
                    </div>
                    <div className="w-12 text-right text-sm text-zinc-300">%{Math.round(v * 100)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Film önerisi */}
          {recommendations[result] && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-sm text-zinc-400">Film önerileri ({result})</div>
              <ul className="mt-3 space-y-2 text-zinc-200">
                {recommendations[result].map((r) => (
                  <li key={r.title} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-violet-400" />
                    <div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-zinc-400">{r.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          </div>
        
      )}
    </div>
  );
}
