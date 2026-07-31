import { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import loginNotesBg from "./assets/login-notes-bg.svg";
import Particles from "./components/Particles";

function getNameFromEmail(email, customName) {
  if (customName && customName.trim()) {
    return customName.trim();
  }
  if (!email) return "User";
  const localPart = email.split("@")[0] || "User";
  const parts = localPart.split(/[._-]+/).filter(Boolean);
  if (parts.length > 0) {
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

export default function WelcomeScreen({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        onLogin({
          name:
            user.user_metadata?.full_name ||
            getNameFromEmail(user.email || "User"),
          email: user.email,
          provider: "google",
        });
      }
    };

    getUser();
  }, [onLogin]);

  const handleEmailAuth = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMsg("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data?.session && data?.user) {
          onLogin({
            name:
              data.user.user_metadata?.full_name ||
              getNameFromEmail(data.user.email || trimmedEmail, fullName),
            email: data.user.email || trimmedEmail,
            provider: "email",
          });
        } else if (data?.user) {
          setSuccessMsg("Account created! Check your email to confirm registration or sign in.");
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: password,
        });

        if (signInError) {
          throw signInError;
        }

        if (data?.user) {
          onLogin({
            name:
              data.user.user_metadata?.full_name ||
              getNameFromEmail(data.user.email || trimmedEmail),
            email: data.user.email || trimmedEmail,
            provider: "email",
          });
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      const msg = err.message?.toLowerCase() || "";
      if (msg.includes("invalid login credentials")) {
        setError("Invalid email or password. If you haven't created an account yet, click the 'Sign Up' tab above first.");
      } else if (msg.includes("email not confirmed")) {
        setError("Your email address has not been confirmed yet. Please check your email inbox or disable 'Confirm email' in Supabase Dashboard.");
      } else if (msg.includes("rate limit")) {
        setError("Email rate limit exceeded. Please wait a few minutes before trying again.");
      } else {
        setError(err.message || "Authentication failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
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
    setSuccessMsg("");
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
              {/* Sign In / Sign Up Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setError("");
                    setSuccessMsg("");
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    !isSignUp
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setError("");
                    setSuccessMsg("");
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isSignUp
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>

              <p className="mt-2 text-center text-slate-500 text-base">
                {isSignUp ? "Sign up to get started" : "Sign in to continue"}
              </p>

              <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
                {isSignUp && (
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400 animate-fade-up"
                  />
                )}

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
                  <p className="text-sm text-red-500 text-center font-medium bg-red-50 p-3 rounded-xl border border-red-200">
                    {error}
                  </p>
                )}

                {successMsg && (
                  <p className="text-sm text-green-600 text-center font-medium bg-green-50 p-3 rounded-xl border border-green-200">
                    {successMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-900 text-white text-base font-semibold shadow-lg hover:scale-[1.01] hover:shadow-xl transition-all duration-300 disabled:opacity-60"
                >
                  {loading
                    ? isSignUp
                      ? "Creating account..."
                      : "Signing in..."
                    : isSignUp
                    ? "Sign Up"
                    : "Sign In"}
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