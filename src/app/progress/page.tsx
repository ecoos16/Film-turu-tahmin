import Image from "next/image";

type Step = {
  img: string;
  title: string;
  takeaways: string[];
};

const steps44: Step[] = [
 {
  img: "/progress/1.png",
  title: "İlk doğruluk tablosu (karmaşık sınıflar)",
  takeaways: [
    "Doğruluklar düşük ve birbirine yakın: bu, modelden çok veri yapısının sınırlayıcı olduğunu gösterir.",
    "Random Forest’ın en düşük görünmesi, küçük veri + dengesiz sınıflarda güçlü modellerin bile kararsız sonuçlar üretebileceğinin işaretidir.",
    "Bu tabloda ‘hangi model daha iyi?’ sorusundan ziyade ‘veri/etiket yapısı problemli mi?’ sorusu öne çıkmaktadır.",
    "Bazı film türlerinin test setinde yalnızca 1 örnekle temsil edilmesi, bu sınıfların model tarafından öğrenilememesine yol açmış; buna bağlı olarak precision ve recall değerleri 0 olarak hesaplanmıştır. Bu durum, küçük ve dengesiz veri setlerinde yaygın görülen yapısal bir problemdir.",
  ],
},

{
  img: "/progress/2.png",
  title: "Stratejik karar: 8 sınıftan 4 ana kategoriye geçiş",
  takeaways: [
    "Bu aşamada problemin modelden değil, ‘çok sınıf + az örnek’ kombinasyonundan kaynaklandığı netleşmiştir.",
    "Mantıksal olarak ilişkili film türleri birleştirilerek sınıflar daha dengeli ve öğrenilebilir hale getirilmiştir.",
    "Az örnekli sınıfların (ör. korku, dram) model performansını bozucu etkisi bu adımla azaltılmıştır.",
    "Bu karar, performans artışının temel nedenidir: elde edilen kazanım ‘daha karmaşık algoritma’ değil, ‘daha doğru problem tanımı’ sayesinde gerçekleşmiştir.",
  ],
},

  {
  img: "/progress/6.png",
  title: "İyileştirme özeti: %44 → %71 → %75",
  takeaways: [
    "%44’ten %71’e sıçrama: en büyük kazanım sınıf sadeleştirmeden geldi (veri problemini çözdük).",
    "%71’den %75’e artış: optimizasyon/tuning gibi ince ayarlar devreye girdi (modeli parlatma).",
    "Random Forest’ta %75’e çıkaran en iyi ağaç/hiperparametre kombinasyonu: n_estimators=300 (ağaç sayısı), max_depth=None (sınırsız derinlik), min_samples_split=2, min_samples_leaf=2 (yaprak başına en az 2 örnek).",

  ],
},

];

const steps263: Step[] = [
 {
  img: "/progress263/1-263.png",
  title: "İlk deneme sonuçları (iyileştirme öncesi)",
  takeaways: [
    "Bu sonuçlar, herhangi bir hiperparametre ayarı veya iyileştirme (sınıf sadeleştirme, tuning vb.) yapılmadan elde edilen baseline çıktılardır.",
    "Random Forest en iyi görünen model olsa da Macro-F1 ≈ 0.16 seviyesinde kaldı; bu durum bazı sınıfların neredeyse hiç öğrenilemediğini gösterir.",
    "Classification report’ta bazı sınıflarda precision/recall değerlerinin 0.00 olması, bu sınıfların ya çok az örneğe sahip olduğunu ya da model tarafından ayırt edilemediğini ortaya koyar.",
    "Bu aşama, accuracy’nin tek başına yanıltıcı olabileceğini ve sınıflar arası adil performansı ölçmek için Macro-F1 metriğinin neden kritik olduğunu net biçimde göstermektedir.",
  ],
},

{
  img: "/progress263/5-263.png",
  title: "Sınıf bazlı rapor: Precision / Recall / F1 ne söylüyor?",
  takeaways: [
    "Support değerleri (Duygusal: 19, Eğlenceli: 31, Gerilim: 5, Macera: 38) sınıflar arasında ciddi bir dengesizlik olduğunu gösteriyor; bu yüzden metrikler yorumlanırken örnek sayıları mutlaka dikkate alınmalı.",
    "Gerilim sınıfında precision 1.00, recall 0.20: model ‘Gerilim’ dediğinde neredeyse her zaman doğru söylüyor; ancak gerilim örneklerinin büyük kısmını yakalayamıyor. Bu durum az örnekli sınıflarda modelin temkinli davranmasının tipik bir sonucu.",
    "Macera sınıfı yüksek support (38) sayesinde en güçlü performansı gösteriyor; bu da çoğunluk sınıflarının veri dengesizliğinde doğal avantajını açıkça ortaya koyuyor.",
    "Macro Avg, her sınıfı eşit ağırlıkla değerlendirir; Weighted Avg ise çoğunluk sınıflarını kayırabilir. Bu nedenle bu projede model kalitesini en doğru yansıtan özet metrik Macro-F1’dir.",
  ],
},

 {
  img: "/progress263/2-263.png",
  title: "Veri analizi: sınıf dağılımı (dengesizlik)",
  takeaways: [
    "Macera sınıfı 116 örneğe sahipken Gerilim yalnızca 9 örnek içeriyor; bu dağılım, modelin çoğunluk sınıflarına yönelmesini neredeyse kaçınılmaz hale getiriyor.",
    "Bu tür dengesizliklerde accuracy yanıltıcı olabilir: model azınlık sınıfları tamamen kaçırsa bile toplam doğruluk çok fazla düşmeyebilir.",
    "Bu nedenle Macro-F1 metriği tercih edildi; her sınıfı eşit ağırlıkla değerlendirerek az temsil edilen sınıfların göz ardı edilmesini doğrudan cezalandırır.",
  ],
},

  {
  img: "/progress263/3-263.png",
  title: "Model karşılaştırması: RF (Macro-F1 tuned) seçimi",
  takeaways: [
    "RF (Accuracy tuned) ve RF (Macro-F1 tuned) modellerinin accuracy değeri aynı seviyede (0.68); bu nedenle fark, modelin sınıfları ne kadar dengeli öğrendiğinde ortaya çıkıyor.",
    "Macro-F1 için ayarlanmış Random Forest modelinde Macro-F1 skorunun 0.58’e yükselmesi, azınlık sınıfların (özellikle Gerilim ve Duygusal) önceki modellere göre daha iyi temsil edildiğini gösteriyor.",
    "Accuracy sabit kalırken Macro-F1’in artması, modelin yalnızca çoğunluk sınıfları ezberlemediğini; sınıflar arası performans dengesinin iyileştiğini kanıtlıyor.",
    "Tablodaki ⭐ işareti, bu projede ‘en yüksek doğruluk’ yerine ‘en adil ve güvenilir sınıf performansı’nın bilinçli olarak tercih edildiğini vurguluyor.",
    "Bu karar, dengesiz veri problemi olan bir senaryoda metrik seçiminin rastgele değil, bilimsel gerekçelere dayandığını açıkça gösteriyor.",
  ],
},
{
  img: "/progress263/4-263.png",
  title: "Confusion Matrix (Final RF): hangi sınıflar karışıyor?",
  takeaways: [
    "Confusion matrix’te diyagonal hücreler (sol üstten sağ alta) doğru tahminleri gösterir; bu hücrelerin yoğunluğu, modelin genel öğrenme başarısını yansıtır.",
    "Macera sınıfı diyagonalda en yüksek değere sahiptir (≈35 doğru): veri sayısı fazla olduğu için model bu sınıfı en güçlü ve en güvenilir şekilde öğrenmiştir (yüksek recall).",
    "Eğlenceli sınıfı görece dengeli bir performans sergiler; hem doğru tahmin sayısı yüksektir hem de model bu sınıfı istikrarlı biçimde ayırt edebilmektedir.",
    "Duygusal sınıfı en çok Eğlenceli ve Macera ile karışmaktadır; bu durum model hatasından ziyade, bu türlerin içerik olarak birbirine yakın olmasından kaynaklanan mantıklı karışmalardır.",
    "Gerilim sınıfında doğru tahmin sayısı düşüktür; bunun temel nedeni modelin yetersizliği değil, bu sınıfa ait örnek sayısının çok az olmasıdır (düşük support).",
    "Genel olarak matris, modelin çoğunluk sınıflarında güçlü, azınlık sınıflarında ise veri kısıtı nedeniyle temkinli davrandığını açık biçimde ortaya koymaktadır.",
  ],
},

  
];

function ImageCard({ step, badge }: { step: Step; badge: string }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6">
      <div className="inline-flex rounded-full border border-violet-700/40 bg-violet-900/20 px-3 py-1 text-xs text-violet-200">
        {badge}
      </div>

      <h2 className="mt-3 text-xl font-semibold">{step.title}</h2>

      <ul className="mt-3 space-y-2 text-zinc-300">
        {step.takeaways.map((t, i) => (
          <li key={i} className="leading-relaxed">
            • {t}
          </li>
        ))}
      </ul>

      {/* 🔽 GÖRSEL – KÜÇÜLTÜLMÜŞ VE DÜZENLENMİŞ HALİ */}
      <div className="mt-5 mx-auto max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        <div className="relative w-full h-[260px] md:h-[320px]">
          <Image
            src={step.img}
            alt={step.title}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
            priority={badge.includes("263") && step.img.includes("1-263")}
          />
        </div>
      </div>
    </section>
  );
}

export default function ProgressPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-violet-950/40 to-zinc-950 p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Süreç <span className="text-violet-300">Çıktı Yorumları</span>
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Aşağıda önce 44 veri ile başlangıç , ardından 263 veri ile final senaryo yer alır.
          Metinler “çıktıların ne anlama geldiğini” yorumlar.
        </p>
      </section>

      {/* 44 ÖNCE */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-300">
  Ön Çalışma: 44 Veri ile İlk Denemeler
</h2>

        <p className="text-zinc-300 max-w-4xl">
          Bu bölümde, sınırlı sayıda (44) anket verisiyle yapılan ilk model denemeleri
ve bu denemeler sonucunda ortaya çıkan temel problemler (sınıf karmaşıklığı
ve dengesizlik) özetlenmektedir.

        </p>

        <div className="space-y-6">
          {steps44.map((s, idx) => (
            <ImageCard key={idx} step={s} badge="44 Veri — Özet" />
          ))}
        </div>
      </section>

      {/* 263 SONRA (ANA) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">263 Veri ile Nihai Model Sonuçları</h2>
        <p className="text-zinc-300 max-w-4xl">
          Bu bölümde, 263 kayıtlı anket verisi kullanılarak elde edilen nihai model
sonuçları sunulmaktadır. Sınıf dengesizliği problemi, Macro-F1 metriğinin
tercih edilme gerekçesi, farklı modellerin karşılaştırılması ve final
confusion matrix ile sınıf bazlı performans çıktıları bu kapsamda
yorumlanmaktadır.

        </p>

        <div className="space-y-6">
          {steps263.map((s, idx) => (
            <ImageCard key={idx} step={s} badge="263 Veri — Ana" />
          ))}
        </div>
      </section>
    </div>
  );
}
