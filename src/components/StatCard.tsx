export default function StatCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 shadow-sm">
      <div className="text-sm text-zinc-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-violet-200">{value}</div>
      {note ? <div className="mt-2 text-sm text-zinc-400">{note}</div> : null}
    </div>
  );
}
