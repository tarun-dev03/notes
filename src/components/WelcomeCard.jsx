import Particles from "./Particles";

export default function WelcomeCard({ darkMode, userName }) {
  return (
    <div className={`relative mb-6 rounded-3xl overflow-hidden border ${
      darkMode
        ? "border-white/6 bg-white/3"
        : "border-white bg-white shadow-sm"
    }`}>
      {/* Particles Background */}
      <div className="absolute inset-0">
        <Particles
          particleColors={darkMode ? ["#93c5fd"] : ["#6366f1"]}
          particleCount={150}
          particleSpread={20}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${
        darkMode
          ? "bg-gradient-to-br from-blue-950/40 via-transparent to-blue-900/10"
          : "bg-blue-50/60"
      }`} />

      {/* Content */}
      <div className="relative z-10 p-8">
        <h1 className={`text-3xl font-bold ${darkMode ? "text-white/85" : "text-gray-900"}`}>
          Welcome Back, {userName} 👋
        </h1>
        <p className={`mt-3 text-sm ${darkMode ? "text-white/40" : "text-gray-500"}`}>
          Capture your thoughts and never lose what matters.
        </p>
      </div>
    </div>
  );
}