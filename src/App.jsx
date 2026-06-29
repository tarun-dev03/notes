import { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Dashboard from "./components/Dashboard";
import { loadUser, saveUser, clearUser } from "./utils/localStorage";
import { supabase } from "./Supabase";

export default function App() {
  const [user, setUser] = useState(() => loadUser());

  useEffect(() => {
    // Listen for auth state changes (handles OAuth redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          const userData = {
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
            email: session.user.email,
            provider: session.user.app_metadata?.provider || "google",
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