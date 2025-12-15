// src/components/ModelTable.tsx
type Row = {
  model: string;
  accuracy: number;
  macroF1: number;
  highlight?: boolean;
  note?: string;
};

const rows: Row[] = [
  {
    model: "Decision Tree (baseline)",
    accuracy: 0.548387,
    macroF1: 0.459183,
    note: "Baseline",
  },
  {
    model: "Naive Bayes (baseline)",
    accuracy: 0.301075,
    macroF1: 0.268960,
    note: "Baseline",
  },
  {
    model: "Random Forest (Accuracy tuned)",
    accuracy: 0.698925,
    macroF1: 0.597268,
    note: "GridSearch (scoring=accuracy)",
  },
  {
    model: "Random Forest (F1-Macro tuned) — Final",
    accuracy: 0.688172,
    macroF1: 0.595588,
    highlight: true,
    note: "GridSearch (scoring=f1_macro)",
  },
];

function fmt(x: number) {
  return x.toFixed(3);
}

export default function ModelTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-950/60 text-zinc-200">
          <tr>
            <th className="px-4 py-3 font-semibold">Model</th>
            <th className="px-4 py-3 font-semibold">Accuracy</th>
            <th className="px-4 py-3 font-semibold">Macro-F1</th>
            <th className="px-4 py-3 font-semibold">Not</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800 bg-zinc-900/30">
          {rows.map((r) => (
            <tr
              key={r.model}
              className={
                r.highlight
                  ? "bg-violet-950/20"
                  : "hover:bg-zinc-900/50 transition-colors"
              }
            >
              <td className="px-4 py-3 text-zinc-100">
                <div className="flex items-center gap-2">
                  {r.highlight && (
                    <span className="inline-flex rounded-full border border-violet-700/40 bg-violet-900/20 px-2 py-0.5 text-xs text-violet-200">
                      Seçilen model
                    </span>
                  )}
                  <span>{r.model}</span>
                </div>
              </td>

              <td className="px-4 py-3 text-zinc-200">{fmt(r.accuracy)}</td>
              <td className="px-4 py-3 text-zinc-200">{fmt(r.macroF1)}</td>
              <td className="px-4 py-3 text-zinc-400">{r.note ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-zinc-800 bg-zinc-950/40 px-4 py-3 text-xs text-zinc-400">
        Not: Tüm değerler aynı train/test bölünmesi (stratified, %65/%35) üzerindeki hold-out test sonuçlarıyla
        raporlanmıştır.
      </div>
    </div>
  );
}
