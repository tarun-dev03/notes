export function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

export function loadNotes() {
  const storedNotes = localStorage.getItem("notes");

  if (storedNotes) {
    return JSON.parse(storedNotes);
  }

  return [];
}

export function saveDarkMode(isDark) {
  localStorage.setItem("darkMode", JSON.stringify(isDark));
}

export function loadDarkMode() {
  const stored = localStorage.getItem("darkMode");

  if (stored !== null) {
    return JSON.parse(stored);
  }

  return false;
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function loadUser() {
  const stored = localStorage.getItem("user");

  if (stored) {
    return JSON.parse(stored);
  }

  return null;
}

export function clearUser() {
  localStorage.removeItem("user");
}