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
          Accuracy tek başına yeterli olmadığı için Macro-F1 ile sınıf dengesizliğini daha adil değerlendirdik.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="En İyi Accuracy" value="0.677" note="Random Forest (tuned)" />
        <StatCard title="En İyi Macro-F1" value="0.576" note="RF (F1-Macro Tuned)" />
        <StatCard title="Veri" value="263" note="Temizlenmiş anket kayıtları" />
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="text-lg font-semibold">Model Karşılaştırması</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Aynı veri bölünmesi üzerinde farklı modellerin performans karşılaştırması.
        </p>
        <div className="mt-4">
          <ModelTable />
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="text-lg font-semibold">Confusion Matrix</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Modelin sınıfları ne kadar doğru ayırdığını gösterir.
        </p>

        <div className="mt-4 mx-auto max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
  <Image
    src="/cm.png"
    alt="Confusion Matrix"
    width={900}
    height={600}
    className="h-auto w-full"
  />
  <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
  Confusion matrix incelendiğinde, <span className="text-violet-300">Macera </span> sınıfının
  yüksek doğrulukla tahmin edildiği görülmektedir. 
  <span className="text-violet-300"> Gerilim </span> sınıfında ise veri sayısının az olması
  nedeniyle sınıflar arası karışma gözlemlenmiştir. 
  Bu durum, Macro-F1 metriğinin tercih edilmesinin nedenini desteklemektedir.
</p>

        </div>
      </section>
    </div>
  );
}
