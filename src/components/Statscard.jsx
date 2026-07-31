export default function Statscard({ title, count, trend, darkMode, onClick }) {
  const Component = onClick ? "button" : "div";
  const trendCount = typeof trend === "number" ? trend : 0;

  return (
    <Component
      onClick={onClick}
      className={`rounded-2xl p-5 border text-left w-full transition-all animate-fade-up ${
        darkMode
          ? "bg-white/4 border-white/6 hover:bg-white/7 hover:-translate-y-0.5"
          : "bg-white/85 border-white hover:bg-sky-50 hover:-translate-y-0.5"
      }`}
    >
      <h3 className={`text-xs font-medium uppercase tracking-wide ${
        darkMode ? "text-white/35" : "text-gray-400"
      }`}>
        {title}
      </h3>

      <p className={`text-3xl font-bold mt-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
        {count}
      </p>

      <p className={`text-xs mt-1 ${darkMode ? "text-emerald-400/70" : "text-emerald-600"}`}>
        +{trendCount} this week
      </p>
    </Component>
  );
}
