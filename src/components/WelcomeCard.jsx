import Particles from "./Particles";

function getFormattedName(userName) {
  if (!userName) return "User";
  // If userName is an email or contains @
  let nameStr = userName;
  if (nameStr.includes("@")) {
    nameStr = nameStr.split("@")[0];
  }
  // Split dot, underscore, or hyphens (e.g., "tarun.pandey" or "john_doe")
  const parts = nameStr.split(/[._-]+/).filter(Boolean);
  if (parts.length > 0) {
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }
  return nameStr.charAt(0).toUpperCase() + nameStr.slice(1);
}

export default function WelcomeCard({ darkMode, userName }) {
  const displayName = getFormattedName(userName);

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
          Welcome Back, {displayName} 👋
        </h1>
        <p className={`mt-3 text-sm ${darkMode ? "text-white/40" : "text-gray-500"}`}>
          Capture your thoughts and never lose what matters.
        </p>
      </div>
    </div>
  );
}