// import { useState } from 'react'
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const notesQ = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const notes = notesQ.data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        <SearchBox />

        <Pagination />
      </header>
      <NoteList notes={notes} />
      <Modal>
        <NoteForm />
      </Modal>
    </div>
  );
}

export default App;
