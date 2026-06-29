import { supabase } from "../Supabase";

// Fetch all notes for the logged-in user
export async function fetchNotes() {
  const { data: { user } } = await supabase.auth.getUser();

  console.log("fetchNotes → user:", user);

  if (!user) {
    console.warn("fetchNotes: no user session, skipping.");
    return [];
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error.message);
    return [];
  }

  console.log("fetchNotes → fetched:", data);
  return data;
}

// Create a new note
export async function createNote(note) {
  const { data: { user } } = await supabase.auth.getUser();

  console.log("createNote → user:", user);

  if (!user) {
    console.error("createNote: no user session. Cannot save note.");
    return null;
  }

  const { data, error } = await supabase
    .from("notes")
    .insert([{
      user_id: user.id,
      title: note.title,
      preview: note.preview,
      date: "Just now",
      favorite: false,
      pinned: false,
      shared: false,
      deleted: false,
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating note:", error.message, error);
    return null;
  }

  console.log("createNote → saved:", data);
  return data;
}

// Update any fields on a note by id
export async function updateNote(id, fields) {
  const { data: { user } } = await supabase.auth.getUser();

  console.log("updateNote → user:", user, "id:", id, "fields:", fields);

  if (!user) {
    console.error("updateNote: no user session.");
    return null;
  }

  const { data, error } = await supabase
    .from("notes")
    .update(fields)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating note:", error.message, error);
    return null;
  }

  console.log("updateNote → updated:", data);
  return data;
}

// Permanently delete a note by id
export async function deleteNote(id) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("deleteNote: no user session.");
    return;
  }

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting note:", error.message, error);
  } else {
    console.log("deleteNote → deleted id:", id);
  }
}