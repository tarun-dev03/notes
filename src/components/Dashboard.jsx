import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import WelcomeCard from "./WelcomeCard";
import StatsCard from "./Statscard";
import PinnedNotes from "./Pinnednotes";
import NotesGrid from "./NotesGrid";
import CreateNoteModal from "./CreateNoteModal";

import { useState, useEffect } from "react";
import { notes as initialNotes } from "../data/dummynotes";
import { saveNotes, loadNotes, saveDarkMode, loadDarkMode } from "../utils/localStorage";

function normalizeNote(note) {
  return {
    favorite: false,
    pinned: false,
    shared: false,
    deleted: false,
    ...note,
  };
}

export default function Dashboard({ user, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => loadDarkMode());

  const [notes, setNotes] = useState(() => {
    const storedNotes = loadNotes();

    if (storedNotes.length > 0) {
      return storedNotes.map(normalizeNote);
    }

    return initialNotes;
  });

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    saveDarkMode(darkMode);
  }, [darkMode]);

  const activeNotes = notes.filter((note) => !note.deleted);
  const trashedNotes = notes.filter((note) => note.deleted);
  const pinnedNotes = activeNotes.filter((note) => note.pinned);

  const searchedNotes = (activeSection === "trash" ? trashedNotes : activeNotes)
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.preview.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  const filteredNotes = searchedNotes.filter((note) => {
    if (activeSection === "favorites") return note.favorite;
    if (activeSection === "shared") return note.shared;
    if (activeSection === "tags") return true;
    return true;
  });

  const sectionTitle =
    activeSection === "home"
      ? "Recent Notes"
      : activeSection === "all"
      ? "All Notes"
      : activeSection === "favorites"
      ? "Favorite Notes"
      : activeSection === "shared"
      ? "Shared with Me"
      : activeSection === "tags"
      ? "Tagged Notes"
      : "Trash";

  const showHomeExtras = activeSection === "home";

  const openCreateModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 ${
        darkMode ? "app-bg-dark text-white" : "app-bg-light text-black"
      }`}
    >
      <div className="flex gap-6">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onCreateNote={openCreateModal}
          darkMode={darkMode}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main
          className={`flex-1 min-w-0 rounded-3xl p-4 sm:p-6 shadow-sm glass-panel animate-fade-up ${
            darkMode
              ? "bg-slate-800/80 border border-slate-700"
              : "bg-white/70 border border-white"
          }`}
        >
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            user={user}
            onLogout={onLogout}
            onMenuToggle={() => setSidebarOpen(true)}
          />

          {showHomeExtras && (
            <WelcomeCard darkMode={darkMode} userName={user?.name || "User"} />
          )}

          {isModalOpen && (
            <CreateNoteModal
              darkMode={darkMode}
              editingNote={editingNote}
              onClose={() => {
                setIsModalOpen(false);
                setEditingNote(null);
              }}
              onSave={(note) => {
                if (editingNote) {
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
                  setNotes([
                    ...notes,
                    {
                      id: Date.now(),
                      title: note.title,
                      preview: note.content,
                      date: "Just now",
                      favorite: false,
                      pinned: false,
                      shared: false,
                      deleted: false,
                    },
                  ]);
                }

                setEditingNote(null);
                setIsModalOpen(false);
              }}
            />
          )}

          {showHomeExtras && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              <StatsCard
                title="All Notes"
                count={activeNotes.length}
                darkMode={darkMode}
                onClick={() => setActiveSection("all")}
              />

              <StatsCard
                title="Favorites"
                count={activeNotes.filter((note) => note.favorite).length}
                darkMode={darkMode}
                onClick={() => setActiveSection("favorites")}
              />

              <StatsCard
                title="Pinned"
                count={pinnedNotes.length}
                darkMode={darkMode}
                onClick={() => setActiveSection("home")}
              />
            </div>
          )}

          {showHomeExtras && (
            <PinnedNotes
              darkMode={darkMode}
              pinnedNotes={pinnedNotes.slice(0, 2)}
              onViewAll={() => setActiveSection("all")}
            />
          )}

          <NotesGrid
            title={sectionTitle}
            darkMode={darkMode}
            showRestore={activeSection === "trash"}
            notes={filteredNotes}
            onDelete={(id) => {
              if (activeSection === "trash") {
                setNotes(notes.filter((note) => note.id !== id));
                return;
              }

              setNotes(
                notes.map((note) =>
                  note.id === id ? { ...note, deleted: true } : note
                )
              );
            }}
            onEdit={(note) => {
              setEditingNote(note);
              setIsModalOpen(true);
            }}
            onRestore={(id) => {
              setNotes(
                notes.map((note) =>
                  note.id === id ? { ...note, deleted: false } : note
                )
              );
            }}
            onFavorite={(id) => {
              setNotes(
                notes.map((note) =>
                  note.id === id
                    ? { ...note, favorite: !note.favorite }
                    : note
                )
              );
            }}
            onPinned={(id) => {
              setNotes(
                notes.map((note) =>
                  note.id === id
                    ? { ...note, pinned: !note.pinned }
                    : note
                )
              );
            }}
            onShare={(id) => {
              setNotes(
                notes.map((note) =>
                  note.id === id
                    ? { ...note, shared: !note.shared }
                    : note
                )
              );
            }}
          />
        </main>
      </div>
    </div>
  );
}
