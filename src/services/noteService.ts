import axios from "axios";
import type { Note, CreateNote, UpdateNote } from "../types/note";
// import SearchBox from "../Components/SearchBox/SearchBox";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export const fetchNotes = async (
  page: number,
  search: string,
): Promise<FetchNotesResponse> => {
  const allNotes = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
    },
  });
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
