import { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import loginNotesBg from "./assets/login-notes-bg.svg";
import Particles from "./components/Particles";

function getNameFromEmail(email) {
  const localPart = email.split("@")[0] || "User";
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

export default function WelcomeScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        onLogin({
          name:
            user.user_metadata.full_name ||
            getNameFromEmail(user.email || "User"),
          email: user.email,
          provider: "google",
        });
      }
    };

    getUser();
  }, [onLogin]);

  const handleEmailLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    // Dummy login (replace with Supabase email auth later)
    onLogin({
      name: getNameFromEmail(email.trim()),
      email: email.trim(),
      provider: "email",
    });
  };

  const handleGuestLogin = () => {
    onLogin({
      name: "Guest",
      email: "guest@notez.app",
      provider: "guest",
    });
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(15,23,42,0.88), rgba(30,41,59,0.78)), url(${loginNotesBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.35),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.28),transparent_30%)] z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="text-white animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
              <span className="animate-pulse-soft">✨</span>
              Modern Notes Workspace
            </div>

            <h1 className="mt-5 text-5xl sm:text-6xl font-bold leading-tight">
              Capture ideas.
              <br />
              Organize fast.
            </h1>

            <p className="mt-5 text-lg text-slate-200 max-w-lg">
              Notez helps you write, pin, share, and search your notes in a
              clean workspace with light and dark themes.
            </p>
          </div>

          {/* Login Card */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="w-full p-8 sm:p-10 rounded-[32px] bg-white/90 glass-panel border border-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800">
                Welcome Back
              </h2>

              <p className="mt-2 text-center text-slate-500 text-base">
                Sign in to continue
              </p>

              <form onSubmit={handleEmailLogin} className="mt-8 space-y-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                />

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-900 text-white text-base font-semibold shadow-lg hover:scale-[1.01] hover:shadow-xl transition-all duration-300 disabled:opacity-60"
                  >
                  Login
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all duration-300 disabled:opacity-60"
                >
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={handleGuestLogin}
                  disabled={loading}
                  className="w-full py-3 rounded-2xl text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Continue as Guest
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}