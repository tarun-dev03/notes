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
  const showNotifications = false; 

  const iconBtn = darkMode
    ? "w-10 h-10 rounded-xl grid place-items-center transition-colors bg-white/5 border border-white/8 text-white/50 hover:bg-white/10 hover:text-white/80"
    : "w-10 h-10 rounded-xl grid place-items-center transition-colors bg-white/80 border border-white text-slate-500 hover:bg-slate-100";

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6 animate-fade-up">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuToggle}
          className={`lg:hidden text-2xl px-2 py-1 rounded-lg ${
            darkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-slate-100"
          }`}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div className={`flex items-center flex-1 rounded-2xl px-4 py-3 border ${
          darkMode
            ? "bg-white/4 border-white/6 backdrop-blur-sm"
            : "bg-white/80 border-white shadow-sm"
        }`}>
          <FiSearch className={`mr-3 text-lg ${darkMode ? "text-white/30" : "text-gray-400"}`} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full outline-none bg-transparent text-sm ${
              darkMode
                ? "text-white/80 placeholder:text-white/25"
                : "text-gray-700 placeholder:text-gray-400"
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:ml-4">
        {showNotifications && (
      <button className={iconBtn} aria-label="Notifications">
        <FiBell size={16} />
      </button>
      )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={iconBtn}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>

        <button
          onClick={onLogout}
          title={`Sign out (${user?.name || "User"})`}
          className={`px-3 h-10 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
            darkMode
              ? "bg-white/8 border border-white/10 text-white/70 hover:bg-white/12 hover:text-white"
              : " bg-blue-900 hover:bg-blue-800 text-white hover:opacity-95"
          }`}
        >
          <span className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold ${
            darkMode ? "bg-blue-900 text-white" : "bg-white/20 text-white"
          }`}>
            {initial}
          </span>
          <FiLogOut size={14} />
        </button>
      </div>
    </div>
  );
}