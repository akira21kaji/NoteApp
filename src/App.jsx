import { useEffect, useState } from "react";
import "./App.css";
import Main from "./commponents/Main";
import Sidebar from "./commponents/Sidebar";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote,setActiveNote] = useState(false);

  useEffect(() => {
    // ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes]);

  useEffect(() => {
    setActiveNote(notes[0].id);
  },[]);

  const onAddNote = () => {
    console.log("新しくnoteが追加されました");
    const newNote = {
      id: uuid(),
      title: "",
      content: "",
      createdAt: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };
 
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id){
        return updatedNote;
      } else {
        return note;
      }
    });

    setNotes(updatedNotesArray);
  }

  return (
    <div className="App">
      <Sidebar 
      onAddNote={onAddNote} 
      notes={notes}
      onDeleteNote={onDeleteNote}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default App;
