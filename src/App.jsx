import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Dashboard from "./components/Dashboard";
import { loadUser, saveUser, clearUser } from "./utils/localStorage";
import { supabase } from "./Supabase";

export default function App() {
  const [user, setUser] = useState(() => loadUser());

  const handleLogin = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // ← clears the Supabase session
    clearUser();
    setUser(null);
  };

  if (!user) {
    return <WelcomeScreen onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}