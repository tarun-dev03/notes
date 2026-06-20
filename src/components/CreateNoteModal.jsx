import { useState, useEffect } from "react";
export default function CreateNoteModal({ onClose, onSave,editingNote }) {
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
    // Don't save if both fields are empty
    if (!title.trim() && !content.trim()) return;

    onSave({
      title,
      content,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 w-125">
        <h2 className="text-2xl font-bold mb-4">
          Create New Note
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        />

        <textarea
          placeholder="Write your note..."
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-xl p-3"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-sky-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}