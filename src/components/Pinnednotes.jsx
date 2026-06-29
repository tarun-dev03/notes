export default function PinnedNotes({ pinnedNotes = [], onViewAll, darkMode }) {
  return (
    <div className={`rounded-2xl p-5 border mt-4 mb-4 animate-fade-up ${
      darkMode
        ? "bg-white/4 border-white/6"
        : "bg-white/85 border-white shadow-sm"
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-base font-semibold ${darkMode ? "text-white/80" : "text-slate-800"}`}>
          📌 Pinned Notes
        </h2>
        <button
          onClick={onViewAll}
          className={`text-xs font-medium transition-colors ${
            darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:underline"
          }`}
        >
          View All
        </button>
      </div>

      <div className="space-y-2">
        {pinnedNotes.length === 0 && (
          <p className={`text-sm ${darkMode ? "text-white/30" : "text-slate-400"}`}>
            No pinned notes yet.
          </p>
        )}
        {pinnedNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-xl border ${
              darkMode
                ? "border-white/6 bg-white/3 hover:bg-white/6 transition-colors"
                : "border-slate-100 bg-white"
            }`}
          >
            <h3 className={`font-medium text-sm ${darkMode ? "text-white/80" : "text-slate-800"}`}>
              {note.title}
            </h3>
            <p className={`text-xs mt-1 leading-5 ${darkMode ? "text-white/35" : "text-gray-500"}`}>
              {note.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}