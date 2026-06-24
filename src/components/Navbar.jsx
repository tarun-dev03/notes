import { FiBell, FiMoon, FiSun, FiSearch, FiLogOut } from "react-icons/fi";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
  user,
  onLogout,
  onMenuToggle,
}) {
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6 animate-fade-up">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuToggle}
          className={`lg:hidden text-2xl px-2 py-1 rounded-lg ${
            darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"
          }`}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div
          className={`flex items-center flex-1 border rounded-2xl px-4 py-3 shadow-sm ${
            darkMode
              ? "bg-slate-900/80 border-slate-700"
              : "bg-white/80 border-white"
          }`}
        >
          <FiSearch
            className={`mr-3 text-lg ${
              darkMode ? "text-slate-400" : "text-gray-400"
            }`}
          />

          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full outline-none bg-transparent ${
              darkMode
                ? "text-slate-100 placeholder:text-slate-400"
                : "text-gray-700"
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:ml-6">
        <button
          className={`w-10 h-10 rounded-xl grid place-items-center transition-colors ${
            darkMode
              ? "bg-slate-900/70 border border-slate-700 text-slate-300 hover:bg-slate-800"
              : "bg-white/80 border border-white text-slate-500 hover:bg-slate-100"
          }`}
          aria-label="Notifications"
        >
          <FiBell />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-10 rounded-xl grid place-items-center transition-colors ${
            darkMode
              ? "bg-slate-900/70 border border-slate-700 text-slate-200 hover:bg-slate-800"
              : "bg-white/80 border border-white text-slate-600 hover:bg-slate-100"
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <button
          onClick={onLogout}
          title={`Sign out (${user?.name || "User"})`}
          className="px-3 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold hover:opacity-95 transition-all gap-2"
        >
          <span className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-xs">{initial}</span>
          <FiLogOut className="text-sm" />
        </button>
      </div>
    </div>
  );
}
