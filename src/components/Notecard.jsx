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
  index = 0,
}) {
  const badgeClass = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95 hover:scale-105 ${
    darkMode
      ? "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80 bg-white/4 hover:bg-white/8"
      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
  }`;

  return (
    <div
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 stagger-card hover:-translate-y-1 ${
        darkMode
          ? "bg-white/4 border-white/6 text-white hover:bg-white/7 hover:border-white/12 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
          : "bg-white/90 border-slate-100 text-slate-900 hover:shadow-lg hover:shadow-slate-200/50"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className={`font-semibold text-sm truncate ${darkMode ? "text-white/90" : "text-slate-800"}`}>
            {note.title}
          </h3>
          <p className={`text-xs mt-1 leading-5 line-clamp-3 ${darkMode ? "text-white/40" : "text-slate-500"}`}>
            {note.preview}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {!showRestore && (
            <button
              onClick={() => onEdit(note)}
              className={`p-2 rounded-xl transition-all active:scale-90 ${
                darkMode
                  ? "text-white/40 hover:bg-white/10 hover:text-white/80"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              }`}
              title="Edit"
            >
              <FiEdit2 size={14} />
            </button>
          )}
          <button
            onClick={() => onDelete(note.id)}
            className={`p-2 rounded-xl transition-all active:scale-90 ${
              darkMode
                ? "text-rose-400/60 hover:bg-rose-500/15 hover:text-rose-400"
                : "text-rose-400 hover:bg-rose-50 hover:text-rose-600"
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
              <button
                onClick={() => onFavorite(note.id)}
                className={`${badgeClass} ${
                  note.favorite
                    ? darkMode
                      ? "border-amber-400/40 text-amber-300 bg-amber-400/10"
                      : "border-amber-300 text-amber-600 bg-amber-50"
                    : ""
                }`}
              >
                <FiStar
                  size={12}
                  className={note.favorite ? "fill-amber-400 text-amber-400 animate-pop-click" : ""}
                />
                {note.favorite ? "Favorited" : "Favorite"}
              </button>

              <button
                onClick={() => onPinned(note.id)}
                className={`${badgeClass} ${
                  note.pinned
                    ? darkMode
                      ? "border-blue-400/40 text-blue-300 bg-blue-400/10"
                      : "border-blue-300 text-blue-600 bg-blue-50"
                    : ""
                }`}
              >
                <FiMapPin
                  size={12}
                  className={note.pinned ? "fill-blue-500 text-blue-500 animate-pop-click" : ""}
                />
                {note.pinned ? "Pinned" : "Pin"}
              </button>

              <button
                onClick={() => onShare(note.id)}
                className={`${badgeClass} ${
                  note.shared
                    ? darkMode
                      ? "border-purple-400/40 text-purple-300 bg-purple-400/10"
                      : "border-purple-300 text-purple-600 bg-purple-50"
                    : ""
                }`}
              >
                <FiLink2 size={12} className={note.shared ? "text-purple-400" : ""} />
                {note.shared ? "Shared" : "Share"}
              </button>
            </>
          )}
          {showRestore && (
            <button onClick={() => onRestore(note.id)} className={badgeClass}>
              <FiRotateCcw size={12} />
              Restore
            </button>
          )}
        </div>

        <p className={`text-xs ${darkMode ? "text-white/25" : "text-slate-400"}`}>
          {note.date}
        </p>
      </div>
    </div>
  );
}
