export default function About() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-violet-950/40 to-zinc-950 p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Proje <span className="text-violet-300">Hakkında</span>
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Bu proje, kullanıcıların film izleme tercihlerini kullanarak film türü
          tahmini yapan bir makine öğrenmesi uygulamasıdır.
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
        <h2 className="text-xl font-semibold">Veri Seti</h2>
        <ul className="list-disc pl-5 text-zinc-300 space-y-1">
          <li>Toplam 263 adet anket kaydı</li>
          <li>Kullanıcı tercihlerini içeren kategorik öznitelikler</li>
          <li>Hedef değişken: Film türü (Duygusal, Eğlenceli, Gerilim, Macera)</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
        <h2 className="text-xl font-semibold">Yöntem</h2>
        <ul className="list-disc pl-5 text-zinc-300 space-y-1">
          <li>Veri temizleme ve kolon düzenleme</li>
          <li>Kategorik verilerin modele uygun hâle getirilmesi</li>
          <li>Train / Test ayrımı</li>
          <li>Decision Tree, Naive Bayes ve Random Forest modellerinin denenmesi</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
        <h2 className="text-xl font-semibold">Değerlendirme</h2>
        <p className="text-zinc-300">
          Sınıf dağılımının dengesiz olması nedeniyle Accuracy metriği tek başına
          yeterli görülmemiştir. Bu nedenle Macro-F1 metriği kullanılarak her sınıfın
          modele eşit katkı sağlaması hedeflenmiştir.
        </p>
      </section>
    </div>
  );
}
