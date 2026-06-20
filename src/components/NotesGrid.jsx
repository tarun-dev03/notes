import NoteCard from "./Notecard";

export default function NotesGrid({ notes, onDelete, onEdit }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        Recent Notes
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}