import NoteCard from "./Notecard";

export default function NotesGrid({
  title = "Recent Notes",
  notes,
  onDelete,
  onEdit,
  onFavorite,
  onPinned,
  onShare,
  darkMode,
  showRestore,
  onRestore,
}) {
  return (
    <section
      className={`mt-6 animate-fade-up rounded-2xl border p-4 sm:p-5 ${
        darkMode ? "border-slate-700 bg-slate-900/40" : "border-white bg-white/60"
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          {notes.length} notes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {notes.length === 0 && (
          <p className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-500"}`}>
            No notes found in this section.
          </p>
        )}

        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
            onFavorite={onFavorite}
            onPinned={onPinned}
            onShare={onShare}
            darkMode={darkMode}
            showRestore={showRestore}
            onRestore={onRestore}
          />
        ))}
      </div>
    </section>
  );
}