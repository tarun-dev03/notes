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
    <section className={`mt-6 animate-fade-up rounded-2xl border p-4 sm:p-5 ${
      darkMode
        ? "border-white/5 bg-white/3"
        : "border-white bg-white/60"
    }`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className={`text-base font-semibold ${darkMode ? "text-white/75" : "text-slate-800"}`}>
          {title}
        </h2>
        <p className={`text-xs ${darkMode ? "text-white/25" : "text-slate-400"}`}>
          {notes.length} notes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {notes.length === 0 && (
          <p className={`text-sm ${darkMode ? "text-white/30" : "text-slate-400"}`}>
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
