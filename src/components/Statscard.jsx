export default function Statscard({ title, count, darkMode, onClick }) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`rounded-2xl p-5 shadow-sm border text-left w-full transition animate-fade-up ${
        darkMode
          ? "bg-slate-900/80 border-slate-700"
          : "bg-white/85 border-white"
      } ${onClick ? (darkMode ? "hover:bg-slate-800 hover:-translate-y-0.5" : "hover:bg-sky-50 hover:-translate-y-0.5") : ""}`}
    >
      <h3 className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">{count}</p>
      <p className={`text-xs mt-1 ${darkMode ? "text-emerald-300" : "text-emerald-600"}`}>+2 this week</p>
    </Component>
  );
}
