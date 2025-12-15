import Image from "next/image";
import StatCard from "@/components/StatCard";
import ModelTable from "@/components/ModelTable";

export default function Results() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-violet-950/40 to-zinc-950 p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Model <span className="text-violet-300">Sonuçları</span>
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Sınıf dengesizliği nedeniyle accuracy tek başına yanıltıcı olabildiği için,
          değerlendirmede <span className="text-violet-300">Macro-F1</span> metriği de kullanılmıştır.
        </p>

        {/* Akademik mini not */}
        <p className="mt-3 text-sm text-zinc-400">
          Not: Aşağıdaki değerler <span className="text-zinc-200">hold-out test</span> (n=93) sonuçlarıdır.
          (Train/Test: %65/%35, stratified split)
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {/* "En iyi" yerine "Final (Hold-out Test)" çok daha doğru */}
        <StatCard
          title="Final Accuracy (Hold-out Test)"
          value="0.688"
          note="Random Forest (F1-Macro Tuned)"
        />
        <StatCard
          title="Final Macro-F1 (Hold-out Test)"
          value="0.596"
          note="Random Forest (F1-Macro Tuned)"
        />
        <StatCard title="Veri" value="263" note="Temizlenmiş anket kayıtları" />
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="text-lg font-semibold">Model Karşılaştırması</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Aynı train/test bölünmesi üzerinde farklı modellerin performans karşılaştırması.
        </p>
        <div className="mt-4">
          <ModelTable />
        </div>
      </section>

    </div>
  );
}
