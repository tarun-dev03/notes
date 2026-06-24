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
    `w-full h-10 px-3 text-left rounded-xl transition duration-300 flex items-center gap-3 ${
      isActive
        ? darkMode
          ? "bg-slate-700 text-white"
          : "bg-blue-50 text-blue-700"
        : darkMode
        ? "hover:bg-slate-700 text-slate-200"
        : "hover:bg-slate-100 text-slate-600"
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
        className={`fixed lg:static top-0 left-0 z-50 w-72 h-full lg:h-auto lg:min-h-[calc(100vh-3rem)] rounded-none lg:rounded-3xl p-5 shadow-sm transition-transform duration-300 animate-fade-up ${
          darkMode
            ? "bg-slate-800/90 border border-slate-700"
            : "bg-white/80 border border-white"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm grid place-items-center">
              N
            </span>
            Notez
          </h1>
          <button
            onClick={onClose}
            className={`lg:hidden text-xl px-2 rounded-lg ${
              darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"
            }`}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <button
          onClick={() => {
            onCreateNote();
            onClose?.();
          }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:opacity-95 transition-all mb-6"
        >
          + New Note
        </button>

        <div className="space-y-1.5">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => handleSectionChange(section.key)}
              className={navButton(activeSection === section.key)}
            >
              <section.icon size={16} />
              {section.label}
            </button>
          ))}
        </div>

        <div
          className={`mt-8 rounded-2xl p-4 border ${
            darkMode
              ? "bg-slate-900/70 border-slate-700"
              : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100"
          }`}
        >
          <p className="text-sm font-semibold">Upgrade to Pro</p>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
            Unlock unlimited notes and advanced sharing.
          </p>
          <button className="mt-3 w-full py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Upgrade Now
          </button>
        </div>
      </aside>
    </>
  );
}
