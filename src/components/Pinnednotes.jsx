export default function PinnedNotes({ pinnedNotes = [], onViewAll, darkMode }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm border mt-4 mb-4 animate-fade-up ${
        darkMode
          ? "bg-slate-900/80 border-slate-700"
          : "bg-white/85 border-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📌 Pinned Notes</h2>

        <button onClick={onViewAll} className="text-blue-500 hover:underline text-sm">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {pinnedNotes.length === 0 && (
          <p className={darkMode ? "text-slate-300" : "text-slate-500"}>
            No pinned notes yet.
          </p>
        )}
        {pinnedNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-xl border ${
              darkMode ? "border-slate-700 bg-slate-800/70" : "border-slate-200 bg-white"
            }`}
          >
            <h3 className="font-medium">{note.title}</h3>

            <p className={`text-sm mt-1 ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
              {note.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}