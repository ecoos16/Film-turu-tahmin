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
      "Random Forest’ın düşük görünmesi, küçük veri + dengesiz sınıflarda güçlü modellerin bile kararsız sonuçlar üretebileceğinin işaretidir.",
      "Bazı film türlerinin test setinde yalnızca 1 örnekle temsil edilmesi, bu sınıfların model tarafından öğrenilememesine yol açmış; buna bağlı olarak precision/recall değerleri 0 olarak hesaplanmıştır. Bu durum küçük ve dengesiz veri setlerinde yaygın görülen yapısal bir problemdir.",
    ],
  },
  {
    img: "/progress/2.png",
    title: "Stratejik karar: 8 sınıftan 4 ana kategoriye geçiş",
    takeaways: [
      "Bu aşamada problemin modelden değil, ‘çok sınıf + az örnek’ kombinasyonundan kaynaklandığı netleşmiştir.",
      "Mantıksal olarak ilişkili film türleri birleştirilerek sınıflar daha dengeli ve öğrenilebilir hale getirilmiştir.",
      "Az örnekli sınıfların (ör. korku/dram gibi) model performansını bozucu etkisi bu adımla azaltılmıştır.",
    ],
  },
  {
    img: "/progress/6.png",
    title: "İyileştirme özeti: %44 → %71 → %75",
    takeaways: [
      "%44’ten %71’e sıçrama: en büyük kazanım sınıf sadeleştirmeden geldi (veri problemini çözdük).",
      "%71’den %75’e artış: optimizasyon/tuning gibi ince ayarlar devreye girdi (modeli parlatma).",
      "Not: Bu bölüm 44 veriyle yapılan erken denemelerin özetidir; nihai metrikler 263 veriyle ‘Sonuçlar’ bölümünde raporlanmıştır.",
    ],
  },
];

const steps263: Step[] = [
  {
    img: "/progress263/1-263.png",
    title: "İlk deneme sonuçları (iyileştirme öncesi)",
    takeaways: [
      "Bu sonuçlar, iyileştirme adımlarından önce alınan erken çıktılardır (problem tanımı/etiket yapısı henüz oturmadan).",
      "Bazı sınıflarda precision/recall değerlerinin 0.00 olması, o sınıfların ya çok az örneğe sahip olduğunu ya da model tarafından ayırt edilemediğini gösterir.",
      "Bu aşama, accuracy’nin tek başına yanıltıcı olabileceğini ve sınıflar arası adil performans için Macro-F1 metriğinin neden kritik olduğunu net biçimde ortaya koymaktadır.",
    ],
  },
  {
    img: "/progress263/5-263.png",
    title: "Sınıf bazlı rapor: Precision / Recall / F1 ne söylüyor? (Final Hold-out)",
    takeaways: [
      "Support değerleri (Duygusal: 18, Eğlenceli: 31, Gerilim: 3, Macera: 41) test setinde (n=93) ciddi bir dengesizlik olduğunu gösterir; bu yüzden metrikler yorumlanırken örnek sayıları mutlaka dikkate alınmalıdır.",
      "Gerilim sınıfında precision 1.00, recall 0.20: model ‘Gerilim’ dediğinde doğru; ancak az örnek nedeniyle genelleme sınırlıdır. Bu durum veri azlığının tipik sonucudur.",
      "Macera sınıfı (support=38) yüksek recall (1.00) ile en güçlü performansı gösterir; çoğunluk sınıflarının veri dengesizliğinde doğal avantajını açıkça yansıtır.",
      "Macro Avg her sınıfı eşit ağırlıkla değerlendirir; Weighted Avg ise çoğunluk sınıflarını kayırabilir. Bu nedenle bu projede model kalitesini en doğru özetleyen metrik Macro-F1’dir.",
    ],
  },
  {
    img: "/progress263/2-263.png",
    title: "Veri analizi: sınıf dağılımı (dengesizlik)",
    takeaways: [
      "Tüm veri setinde Macera 116 örneğe sahipken Gerilim yalnızca 9 örnek içeriyor; bu dağılım modelin çoğunluk sınıflarına yönelmesini neredeyse kaçınılmaz hale getirir.",
      "Bu tür dengesizliklerde accuracy yanıltıcı olabilir: model azınlık sınıfları kaçırsa bile toplam doğruluk çok fazla düşmeyebilir.",
      "Bu nedenle Macro-F1 metriği tercih edildi; her sınıfı eşit ağırlıkla değerlendirerek az temsil edilen sınıfların göz ardı edilmesini doğrudan yansıtır.",
    ],
  },
  {
    img: "/progress263/6-263.png",
    title: "Model karşılaştırması: %74 nereden geldi, neden final metrik olmadı?",
    takeaways: [
      "Önceden gördüğümüz %74 (0.7419) değeri: Random Forest’ın ‘accuracy’yi maksimize edecek şekilde ayarlanmış’ konfigürasyonunun hold-out test setindeki doğruluğudur .",
      "Ancak veri dengesiz olduğu için yalnızca accuracy’ye bakmak, azınlık sınıfların (özellikle Gerilim gibi düşük support’lu sınıflar) başarısızlığını gizleyebilir; bu yüzden Macro-F1 ile desteklemek gerekir.",
      "Final senaryoda GridSearchCV, eğitim verisinde çapraz doğrulama ile ‘Macro-F1’i maksimize edecek’ parametreleri seçmiştir; bu yaklaşım sınıflar arası daha adil performans raporlaması sağlar.",
      "Bu yüzden F1-Macro tuned modelde accuracy’nin biraz düşmesi normaldir: optimizasyon hedefi accuracy değil Macro-F1 olduğu için model, bazı çoğunluk sınıf doğrularını feda edip azınlık sınıfları daha dengeli yakalamaya çalışır .",
    ],
  },
  {
    img: "/progress263/4-263.png",
    title: "Confusion Matrix (Final RF): hangi sınıflar karışıyor? (Hold-out n=93)",
    takeaways: [
      "Confusion matrix’te diyagonal hücreler doğru tahminleri gösterir; diyagonalin yoğunluğu genel öğrenmeyi yansıtır.",
      "Macera sınıfı diyagonalda en yüksek değere sahiptir ve recall’ı yüksektir: veri sayısı yüksek olduğu için model bu sınıfı daha güçlü öğrenmiştir.",
      "Eğlenceli sınıfı görece dengeli performans sergiler; model bu sınıfı istikrarlı şekilde ayırt edebilmektedir.",
      "Duygusal sınıfı en çok Eğlenceli ve Macera ile karışmaktadır; bu, türlerin içerik olarak birbirine yakın olmasından kaynaklanan mantıklı karışmalardır.",
      "Gerilim sınıfında doğru tahmin sayısı düşüktür; temel sebep model yetersizliği değil, test setinde support’un çok düşük olmasıdır.",
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
          Aşağıda önce 44 veri ile başlangıç, ardından 263 veri ile final senaryo yer alır.
          Metinler “çıktıların ne anlama geldiğini” yorumlar.
        </p>
      </section>

      {/* 44 ÖNCE */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-zinc-300">
          Ön Çalışma: 44 Veri ile İlk Denemeler
        </h2>

        <p className="text-zinc-300 max-w-4xl">
          Bu bölümde, sınırlı sayıda (44) anket verisiyle yapılan ilk model denemeleri ve
          bu denemeler sonucunda ortaya çıkan temel problemler (sınıf karmaşıklığı ve dengesizlik)
          özetlenmektedir.
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
          Bu bölümde, 263 kayıtlı anket verisi kullanılarak elde edilen nihai model sonuçları
          sunulmaktadır. Sınıf dengesizliği problemi, Macro-F1 metriğinin tercih edilme gerekçesi,
          modellerin karşılaştırılması ve final confusion matrix ile sınıf bazlı performans çıktıları
          bu kapsamda yorumlanmaktadır.
        </p>

        <div className="space-y-6">
          {steps263.map((s, idx) => (
            <ImageCard key={idx} step={s} badge="263 Veri — Ana" />
          ))}
        </div>

        {/* ================= ML PIPELINE AÇIKLAMASI ================= */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 space-y-6">
          <h3 className="text-2xl font-semibold tracking-tight">
            Model Nasıl Eğitildi? <span className="text-violet-300">(ML Pipeline)</span>
          </h3>

          <p className="text-zinc-300 max-w-4xl leading-relaxed">
            Bu projede makine öğrenmesi süreci, veri sızıntısını (data leakage) önleyecek şekilde
            adım adım kurgulanmıştır. Aşağıda, modelin nasıl eğitildiği ve hangi yöntemlerin neden
            tercih edildiği özetlenmektedir.
          </p>

          <ul className="space-y-4 text-zinc-300 leading-relaxed max-w-4xl">
            <li>
              • <b>Veri Temizleme:</b> Zaman damgası ve serbest metin gibi modele katkı sağlamayan sütunlar kaldırıldı.
              Yaş sayısallaştırıldı; eksikler ortalama/mod ile dolduruldu.
            </li>

            <li>
              • <b>Hedef Sınıf Sadeleştirme:</b> Çok sınıflı ve dengesiz türler, 4 ana sınıfa indirgenerek problem daha
              “öğrenilebilir” hale getirildi (en büyük performans kazanımı bu adımdan geldi).
            </li>

            <li>
              • <b>Encoding:</b> Kategorik özellikler One-Hot Encoding ile sayısallaştırıldı.
            </li>

            <li>
              • <b>Train/Test Ayrımı:</b> Veri %65 eğitim – %35 test olarak <b>stratified</b> şekilde bölündü.
              Test seti eğitimde kullanılmadı; final metrikler bu hold-out test üzerinden raporlandı.
            </li>

            <li>
              • <b>Baseline:</b> Decision Tree ve Naive Bayes karşılaştırma için baseline olarak çalıştırıldı.
            </li>

            <li>
              • <b>RF Tuning (iki hedef):</b>
              (1) <b>Accuracy-tuned</b> yaklaşımda hold-out testte <b>0.7419</b> doğruluk görüldü (%74).
              (2) <b>Macro-F1-tuned</b> yaklaşımda amaç, dengesiz sınıflarda daha adil performanstır.
            </li>

            <li>
              • <b>Neden F1 ile ayarlanınca accuracy de düşebiliyor?</b> Çünkü GridSearch artık accuracy’yi değil{" "}
              <b>Macro-F1</b> değerini maksimize eder. Bu da bazı çoğunluk sınıf tahminlerinde küçük bir doğruluk
              kaybı pahasına, azınlık sınıfları daha dengeli yakalamaya çalışmak demektir (trade-off).
            </li>

            <li>
              • <b>Neden %74 “final” değil?</b> Dengesiz sınıflarda yalnız accuracy’ye bakmak azınlık sınıfları “gizleyebilir”.
              Bu yüzden final raporda Macro-F1 merkezde tutuldu (raporlanabilirlik + adalet).
            </li>
          </ul>

          <p className="text-sm text-zinc-400 max-w-4xl">
            Sonuç: %74 tek başına “yanlış” değil; sadece dengesiz sınıflar nedeniyle “tek başına yeterli değil”.
            Bu yüzden final değerlendirme Macro-F1 ile desteklenmiştir.
          </p>
        </section>
        {/* ========================================================== */}
      </section>
    </div>
  );
}
