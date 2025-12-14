import DemoForm from "@/components/DemoForm";

export default function Demo() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-violet-950/40 to-zinc-950 p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Canlı <span className="text-violet-300">Demo</span>
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Tercihleri seç ve modelin tahmin ettiği film türünü gör. (Şimdilik mock
          tahmin — bir sonraki adımda gerçek ML modeline bağlayacağız.)
        </p>
      </section>

      <DemoForm />
    </div>
  );
}
