import { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Dashboard from "./components/Dashboard";
import { loadUser, saveUser, clearUser } from "./utils/localStorage";
import { supabase } from "./Supabase";

export default function App() {
  const [user, setUser] = useState(() => loadUser());

  useEffect(() => {
    // Listen for auth state changes (handles OAuth redirect & email session)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          const rawName = session.user.user_metadata?.full_name;
          const email = session.user.email || "";
          const localPart = email.split("@")[0] || "User";
          const formattedEmailName = localPart
            .split(/[._-]+/)
            .filter(Boolean)
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
            .join(" ");

          const userData = {
            name: rawName || formattedEmailName,
            email: email,
            provider: session.user.app_metadata?.provider || "email",
          };
          saveUser(userData);
          setUser(userData);
        } else if (event === "SIGNED_OUT") {
          clearUser();
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
    setUser(null);
  };

  if (!user) return <WelcomeScreen onLogin={handleLogin} />;
  return <Dashboard user={user} onLogout={handleLogout} />;
}