import { FiHome, FiFileText, FiStar, FiUsers, FiTrash2, FiTag } from "react-icons/fi";

const sections = [
  { key: "home", label: "Home", icon: FiHome },
  { key: "all", label: "All Notes", icon: FiFileText },
  { key: "favorites", label: "Favorites", icon: FiStar },
  { key: "shared", label: "Shared with Me", icon: FiUsers },
  { key: "tags", label: "Tags", icon: FiTag },
  { key: "trash", label: "Trash", icon: FiTrash2 },
];

export default function Sidebar({
  activeSection,
  onSectionChange,
  onCreateNote,
  darkMode,
  isOpen,
  onClose,
}) {
  const navButton = (isActive) =>
    `w-full h-10 px-3 text-left rounded-xl transition duration-300 flex items-center gap-3 text-sm ${
      isActive
        ? darkMode
          ? "bg-white/10 text-white font-medium"
          : "bg-blue-50 text-blue-700 font-medium"
        : darkMode
        ? "text-white/50 hover:bg-white/8 hover:text-white/80"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  const handleSectionChange = (key) => {
    onSectionChange(key);
    onClose?.();
  };

  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-64 h-full lg:h-auto lg:min-h-[calc(100vh-3rem)] rounded-none lg:rounded-3xl p-5 transition-transform duration-300 animate-fade-up border ${
          darkMode
            ? "bg-[#0f0f14]/90 border-white/5 backdrop-blur-xl"
            : "bg-white/80 border-white backdrop-blur-xl"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-900 text-white text-xs grid place-items-center font-bold">
              N
            </span>
            <span className={darkMode ? "text-white" : "text-slate-800"}>Notez</span>
          </h1>
          <button
            onClick={onClose}
            className={`lg:hidden text-xl px-2 rounded-lg ${
              darkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-slate-100"
            }`}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* New Note Button */}
        <button
          onClick={() => { onCreateNote(); onClose?.(); }}
          className="w-full h-11 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium transition-all mb-6 shadow-lg shadow-blue-950/40"
        >
          + New Note
        </button>

        {/* Nav */}
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => handleSectionChange(section.key)}
              className={navButton(activeSection === section.key)}
            >
              <section.icon size={15} />
              {section.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}