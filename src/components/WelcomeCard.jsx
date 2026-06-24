export default function WelcomeCard({ darkMode, userName }) {
  return (
    <div
      className={`mb-6 rounded-3xl p-6 border relative overflow-hidden animate-fade-up ${
        darkMode
          ? "bg-slate-900/80 border-slate-700"
          : "bg-gradient-to-r from-white to-blue-50 border-white"
      }`}
    >
      <div className="absolute right-6 top-4 text-6xl opacity-20 animate-float">📝</div>
      <h1 className="text-3xl font-bold">
        Welcome Back, {userName} 👋
      </h1>

      <p className={`mt-2 ${darkMode ? "text-slate-300" : "text-gray-500"}`}>
        Capture your thoughts and never lose what matters.
      </p>
    </div>
  );
}
