import { FiEdit2, FiTrash2, FiStar, FiMapPin, FiLink2, FiRotateCcw } from "react-icons/fi";

export default function NoteCard({
  note,
  onDelete,
  onEdit,
  onFavorite,
  onPinned,
  onShare,
  darkMode,
  showRestore,
  onRestore,
}) {
  const badgeClass = `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition-colors ${
    darkMode
      ? "border-white/8 text-white/40 hover:border-white/15 hover:text-white/60 bg-white/3"
      : "border-slate-200 text-slate-600 hover:border-slate-300"
  }`;

  return (
    <div className={`rounded-2xl p-4 border transition-all animate-fade-up ${
      darkMode
        ? "bg-white/4 border-white/6 text-white hover:bg-white/6"
        : "bg-white/90 border-slate-100 text-slate-900 hover:shadow-md"
    }`}>
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className={`font-semibold text-sm truncate ${darkMode ? "text-white/85" : "text-slate-800"}`}>
            {note.title}
          </h3>
          <p className={`text-xs mt-1 leading-5 ${darkMode ? "text-white/35" : "text-slate-500"}`}>
            {note.preview}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {!showRestore && (
            <button
              onClick={() => onEdit(note)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "text-white/30 hover:bg-white/8 hover:text-white/60"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              title="Edit"
            >
              <FiEdit2 size={14} />
            </button>
          )}
          <button
            onClick={() => onDelete(note.id)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "text-rose-400/50 hover:bg-rose-500/10 hover:text-rose-400"
                : "text-rose-500 hover:bg-rose-50"
            }`}
            title={showRestore ? "Delete permanently" : "Move to trash"}
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-2">
          {!showRestore && (
            <>
              <button onClick={() => onFavorite(note.id)} className={badgeClass}>
                <FiStar size={11} />
                {note.favorite ? "Favorited" : "Favorite"}
              </button>
              <button onClick={() => onPinned(note.id)} className={badgeClass}>
                <FiMapPin size={11} />
                {note.pinned ? "Pinned" : "Pin"}
              </button>
              <button onClick={() => onShare(note.id)} className={badgeClass}>
                <FiLink2 size={11} />
                {note.shared ? "Shared" : "Share"}
              </button>
            </>
          )}
          {showRestore && (
            <button onClick={() => onRestore(note.id)} className={badgeClass}>
              <FiRotateCcw size={11} />
              Restore
            </button>
          )}
        </div>

        <p className={`text-xs ${darkMode ? "text-white/20" : "text-slate-400"}`}>
          {note.date}
        </p>
      </div>
    </div>
  );
}
