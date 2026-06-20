export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-md transition">

      <div className="flex justify-between items-center">

        <h3 className="font-semibold text-lg">
          {note.title}
        </h3>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(note)}
            className="text-blue-500 hover:text-blue-700 text-xl"
          >
            ✏️
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-700 text-xl"
          >
            🗑️
          </button>

        </div>

      </div>

      <p className="text-gray-500 text-sm mt-2">
        {note.preview}
      </p>

      <p className="text-xs text-gray-400 mt-4">
        {note.date}
      </p>

    </div>
  );
}