import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ 
  onAddNote , 
  notes, 
  onDeleteNote, 
  activeNote, 
  setActiveNote, 
  onDeleteAllNotes}) => {
    
  const [sortOrder, setSortOrder] = useState("");
  const [searchText, setSearchText] = useState("");
  
  
  const sortedNotes = notes.sort((a, b) => {
    const sortOptions = {
      createdAsc: a.createdAt - b.createdAt,
      createdDesc: b.createdAt - a.createdAt,
      modifiedAsc: a.modifiedAt - b.modifiedAt,
      modifiedDesc: b.modifiedAt - a.modifiedAt,
    };
    return sortOptions[sortOrder] || 0;
  });
  
  const filterNotes = sortedNotes.filter((note) => 
    note.title.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <div className="sortButton">
          <p>追加日</p>
          <button onClick={() => setSortOrder("createdAsc")}>▲昇順</button>
          <button onClick={() => setSortOrder("createdDesc")}>▼降順</button>
          <p>修正日</p>
          <button onClick={() => setSortOrder("modifiedAsc")}>▲昇順</button>
          <button onClick={() => setSortOrder("modifiedDesc")}>▼降順</button>
        </div>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="app-sidebar-search">
        <input type="text" placeholder="検索" onChange={(e) => setSearchText(e.target.value)}/>
        <button className="allDeleteButton" onClick={onDeleteAllNotes}>全削除</button>
      </div>
      <div className="app-sidebar-notes">
        {filterNotes.map((note) => (
          <div 
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            key={note.id} 
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>削除</button>
            </div>
            <p>{note.content}</p>
            <small>最初の追加日:{new Date(note.createdAt).toLocaleDateString("ja-JP",{
              hour: "2-digit",
              minute: "2-digit",
            })}</small>
            <small>最後の修正日:{new Date(note.modifiedAt).toLocaleDateString("ja-JP",{
              hour: "2-digit",
              minute: "2-digit",
            })}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
