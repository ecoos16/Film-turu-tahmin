const rows = [
  { model: "Decision Tree", acc: 0.548, f1: 0.459 },
  { model: "Naive Bayes", acc: 0.301, f1: 0.269 },
  { model: "RF (Accuracy Tuned)", acc: 0.677, f1: 0.474 },
  { model: "RF (F1-Macro Tuned)", acc: 0.677, f1: 0.576 },
];

export default function ModelTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900/70 text-zinc-300">
          <tr>
            <th className="px-4 py-3">Model</th>
            <th className="px-4 py-3">Accuracy</th>
            <th className="px-4 py-3">Macro F1</th>
          </tr>
        </thead>
        <tbody className="text-zinc-200">
          {rows.map((r) => (
            <tr key={r.model} className="border-t border-zinc-800">
              <td className="px-4 py-3">{r.model}</td>
              <td className="px-4 py-3">{r.acc.toFixed(3)}</td>
              <td className="px-4 py-3">{r.f1.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
