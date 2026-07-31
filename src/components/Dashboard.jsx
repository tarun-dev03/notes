import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import WelcomeCard from "./WelcomeCard";
import StatsCard from "./Statscard";
import PinnedNotes from "./Pinnednotes";
import NotesGrid from "./NotesGrid";
import CreateNoteModal from "./CreateNoteModal";
import Particles from "./Particles";
import Toast from "./Toast";

import { useState, useEffect } from "react";
import { saveDarkMode, loadDarkMode } from "../utils/localStorage";
import { fetchNotes, createNote, updateNote, deleteNote } from "../utils/supabaseNotes";

export default function Dashboard({ user, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => loadDarkMode());
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
  };

  // Load notes from Supabase on mount
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      const data = await fetchNotes();
      setNotes(data);
      setLoading(false);
    };
    loadNotes();
  }, []);

  useEffect(() => { saveDarkMode(darkMode); }, [darkMode]);

  const activeNotes = notes.filter((note) => !note.deleted);
  const trashedNotes = notes.filter((note) => note.deleted);
  const pinnedNotes = activeNotes.filter((note) => note.pinned);

  const isCreatedThisWeek = (note) => {
    const dateStr = note.created_at || note.created_date;
    if (!dateStr || dateStr === "Just now") return true;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return true;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return date >= sevenDaysAgo;
  };

  const allThisWeek = activeNotes.filter(isCreatedThisWeek).length;
  const favThisWeek = activeNotes.filter((n) => n.favorite && isCreatedThisWeek(n)).length;
  const pinnedThisWeek = pinnedNotes.filter(isCreatedThisWeek).length;

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
    return true;
  });

  const sectionTitle =
    activeSection === "home" ? "Recent Notes" :
    activeSection === "all" ? "All Notes" :
    activeSection === "favorites" ? "Favorite Notes" :
    activeSection === "shared" ? "Shared with Me" :
    activeSection === "tags" ? "Tagged Notes" : "Trash";

  const showHomeExtras = activeSection === "home";

  const openCreateModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  // Save note — create or update
  const handleSave = async (note) => {
    if (editingNote) {
      const updated = await updateNote(editingNote.id, {
        title: note.title,
        preview: note.content,
      });
      if (updated) {
        setNotes(notes.map((n) => n.id === editingNote.id ? updated : n));
        showToast("Note updated successfully!");
      }
    } else {
      const created = await createNote({
        title: note.title,
        preview: note.content,
      });
      if (created) {
        setNotes([created, ...notes]);
        showToast("Note created successfully!");
      } else {
        const localNote = {
          id: Date.now(),
          title: note.title,
          preview: note.content,
          date: "Just now",
          created_at: new Date().toISOString(),
          favorite: false,
          pinned: false,
          shared: false,
          deleted: false,
        };
        setNotes([localNote, ...notes]);
        showToast("Note saved!");
      }
    }
    setEditingNote(null);
    setIsModalOpen(false);
  };

  // Soft delete (move to trash) or hard delete (from trash)
  const handleDelete = async (id) => {
    if (activeSection === "trash") {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
      showToast("Note permanently deleted.");
    } else {
      const updated = await updateNote(id, { deleted: true });
      if (updated) {
        setNotes(notes.map((n) => n.id === id ? updated : n));
        showToast("Moved note to trash.");
      }
    }
  };

  const handleRestore = async (id) => {
    const updated = await updateNote(id, { deleted: false });
    if (updated) {
      setNotes(notes.map((n) => n.id === id ? updated : n));
      showToast("Note restored!");
    }
  };

  const handleFavorite = async (id) => {
    const note = notes.find((n) => n.id === id);
    const updated = await updateNote(id, { favorite: !note.favorite });
    if (updated) {
      setNotes(notes.map((n) => n.id === id ? updated : n));
      showToast(updated.favorite ? "Added to favorites!" : "Removed from favorites.");
    }
  };

  const handlePinned = async (id) => {
    const note = notes.find((n) => n.id === id);
    const updated = await updateNote(id, { pinned: !note.pinned });
    if (updated) {
      setNotes(notes.map((n) => n.id === id ? updated : n));
      showToast(updated.pinned ? "Pinned note to top!" : "Unpinned note.");
    }
  };

  const handleShare = async (id) => {
    const note = notes.find((n) => n.id === id);
    const updated = await updateNote(id, { shared: !note.shared });
    if (updated) {
      setNotes(notes.map((n) => n.id === id ? updated : n));
      showToast(updated.shared ? "Shared note status active!" : "Removed from shared.");
    }
  };

  return (
    <div className={`relative min-h-screen p-4 sm:p-6 ${darkMode ? "app-bg-dark text-white" : "app-bg-light text-black"}`}>
      {/* Toast Notification */}
      <Toast message={toastMsg} onClose={() => setToastMsg("")} darkMode={darkMode} />

      {/* Animated mid orb for dark mode */}
      {darkMode && <div className="dark-orb-mid" />}

      {/* Particles background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={darkMode ? ["#93c5fd", "#ffffff"] : ["#6366f1", "#a5b4fc"]}
          particleCount={120}
          particleSpread={15}
          speed={0.06}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10 flex gap-6">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onCreateNote={openCreateModal}
          darkMode={darkMode}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className={`flex-1 min-w-0 rounded-3xl p-4 sm:p-6 shadow-sm glass-panel animate-fade-up border ${
          darkMode
            ? "dark-panel border-white/5"
            : "bg-white/70 border-white"
        }`}>
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
              onClose={() => { setIsModalOpen(false); setEditingNote(null); }}
              onSave={handleSave}
            />
          )}

          {showHomeExtras && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              <StatsCard title="All Notes" count={activeNotes.length} trend={allThisWeek} darkMode={darkMode} onClick={() => setActiveSection("all")} />
              <StatsCard title="Favorites" count={activeNotes.filter((n) => n.favorite).length} trend={favThisWeek} darkMode={darkMode} onClick={() => setActiveSection("favorites")} />
              <StatsCard title="Pinned" count={pinnedNotes.length} trend={pinnedThisWeek} darkMode={darkMode} onClick={() => setActiveSection("home")} />
            </div>
          )}

          {showHomeExtras && (
            <PinnedNotes
              darkMode={darkMode}
              pinnedNotes={pinnedNotes.slice(0, 2)}
              onViewAll={() => setActiveSection("all")}
            />
          )}

          {loading ? (
            <div className={`mt-10 text-center text-sm ${darkMode ? "text-white/30" : "text-slate-400"}`}>
              Loading notes...
            </div>
          ) : (
            <NotesGrid
              title={sectionTitle}
              darkMode={darkMode}
              showRestore={activeSection === "trash"}
              notes={filteredNotes}
              onDelete={handleDelete}
              onEdit={(note) => { setEditingNote(note); setIsModalOpen(true); }}
              onRestore={handleRestore}
              onFavorite={handleFavorite}
              onPinned={handlePinned}
              onShare={handleShare}
            />
          )}
        </main>
      </div>
    </div>
  );
}