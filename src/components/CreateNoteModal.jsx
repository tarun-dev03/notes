import { useState, useEffect } from "react";

export default function CreateNoteModal({ onClose, onSave, editingNote, darkMode }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.preview);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  function handleSave() {
    if (!title.trim() && !content.trim()) return;
    onSave({ title, content });
    onClose();
  }

  const inputClass = `w-full rounded-xl p-3 text-sm outline-none border transition-colors ${
    darkMode
      ? "bg-white/5 border-white/8 text-white/80 placeholder:text-white/25 focus:border-blue-700/60"
      : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400"
  }`;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-backdrop"
      onClick={onClose}
    >
      <div
        className={`rounded-3xl p-6 w-full max-w-lg animate-modal-pop border shadow-2xl transition-all ${
          darkMode
            ? "bg-[#0f0f14]/95 border-white/10 text-white backdrop-blur-xl"
            : "bg-white/95 border-white shadow-2xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-xl font-bold mb-5 ${darkMode ? "text-white/85" : "text-slate-800"}`}>
          {editingNote ? "Edit Note" : "New Note"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${inputClass} mb-3`}
        />

        <textarea
          placeholder="Write your note..."
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={inputClass}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
              darkMode
                ? "border-white/10 text-white/50 hover:bg-white/6"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-900 hover:bg-blue-800 text-white transition-colors shadow-lg shadow-blue-950/40"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}