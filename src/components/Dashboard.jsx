import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import WelcomeCard from "./WelcomeCard";
import StatsCard from "./Statscard";
import PinnedNotes from "./Pinnednotes";
import NotesGrid from "./NotesGrid";
import CreateNoteModal from "./CreateNoteModal";
import { useState } from "react";
import { notes as initialNotes } from "../data/dummynotes";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [editingNote, setEditingNote] = useState(null);
  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <div className="flex flex-col lg:flex-row gap-6">

        <Sidebar />

        <main className="flex-1 bg-white rounded-3xl p-6 shadow-sm">

          <Navbar />
          <button onClick={() => setIsModalOpen(true)} 
          className="bg-sky-500 text-white px-4 py-2 rounded-xl mt-4">
            + New Note
          </button>

          <WelcomeCard />
          {isModalOpen && 
              <CreateNoteModal
                editingNote={editingNote}
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingNote(null);
                }}
                onSave={(note) => {
                  if (editingNote) {
                    // Update existing note
                    setNotes(
                      notes.map((n) =>
                        n.id === editingNote.id
                          ? {
                              ...n,
                              title: note.title,
                              preview: note.content,
                            }
                          : n
                      )
                    );
                  } else {
                    // Create new note
                    setNotes([
                      ...notes,
                      {
                        id: Date.now(),
                        title: note.title,
                        preview: note.content,
                        date: "Just now",
                      },
                    ]);
                  }

                  setEditingNote(null);
                  setIsModalOpen(false);
                }}
              />
}
        

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <StatsCard title="All Notes" count="32" />
            <StatsCard title="Favorites" count="8" />
            <StatsCard title="Folders" count="6" />
            <StatsCard title="Tags" count="15" />
          </div>
          <PinnedNotes/>
          <NotesGrid
            notes={notes}
            onDelete={(id) => {
              setNotes(notes.filter((note) => note.id !== id));
            }}
            onEdit={(note) => {
              setEditingNote(note);
              setIsModalOpen(true);
            }}
          />


        </main>

      </div>
    </div>
  );
}