import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Dashboard from "./components/Dashboard";
import { loadUser, saveUser, clearUser } from "./utils/localStorage";

export default function App() {
  const [user, setUser] = useState(() => loadUser());

  const handleLogin = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
  };

  if (!user) {
    return <WelcomeScreen onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
