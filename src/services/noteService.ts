import axios from "axios";
import type { Note, CreateNote, UpdateNote } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (): Promise<FetchNotesResponse> => {
  const allNotes = await axios.get<FetchNotesResponse>("/notes");
  return allNotes.data;
};
export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", payload);
  return data;
};

export const updateNote = async ([noteId, payload]: [
  Note["id"],
  UpdateNote,
]): Promise<Note> => {
  const { data } = await axios.patch<Note>(`/notes/${noteId}`, payload);
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<void> => {
  await axios.delete(`/notes/${noteId}`);
};
