import Link from "next/link";

function StatCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 shadow-sm">
      <div className="text-sm text-zinc-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-violet-200">
        {value}
      </div>
      <div className="mt-2 text-sm text-zinc-400">{note}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-violet-950/50 to-zinc-950 p-10">
        {/* dekoratif blurlar */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />

        <h1 className="text-4xl font-semibold tracking-tight">
          Film Tercihlerinden{" "}
          <span className="text-violet-300">Tür Tahmini</span>
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-300">
          263 kayıtlık anket verisiyle eğitilmiş, sınıf dengesizliğini
          Macro-F1 metriğiyle ele alan bir makine öğrenmesi modeli.
          <br />
          Sonuçları inceleyebilir veya canlı demo ile modeli test edebilirsin.
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/demo"
            prefetch
            className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            🚀 Canlı Demo
          </Link>

          <Link
            href="/results"
            prefetch
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900"
          >
            📊 Model Sonuçları
          </Link>
        </div>
      </section>

      {/* ÖZET KARTLAR */}
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Veri Boyutu"
          value="263"
          note="Temizlenmiş anket kayıtları"
        />
        <StatCard
          title="Model"
          value="Random Forest"
          note="Pipeline + Macro-F1 odaklı tuning"
        />
        <StatCard
          title="Ana Metrik"
          value="Macro-F1"
          note="Sınıf dengesizliğinde daha adil ölçüm"
        />
      </section>
    </div>
  );
}
