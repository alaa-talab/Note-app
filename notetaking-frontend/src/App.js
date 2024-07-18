import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesList from './Components/NotesList';
import AddNote from './Components/AddNote';
import './styles.css';
import SearchNotes from './Components/SearchNotes';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [setSearchQuery] = useState('');

  useEffect(() => {
      axios.get('https://ec2-3-86-95-170.compute-1.amazonaws.com/api/notes/')
          .then(response => {
              setNotes(response.data);
              setFilteredNotes(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the notes!', error);
          });
  }, []);

  const handleSearchResults = (results) => {
      setFilteredNotes(results);
  };

  const handleSearchQueryChange = (query) => {
      setSearchQuery(query);
      if (query.trim() === '') {
          setFilteredNotes(notes);
      }
  };

  const addNote = (newNote) => {
      setNotes(prevNotes => [...prevNotes, newNote]);
      setFilteredNotes(prevNotes => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
      axios.delete(`https://ec2-3-86-95-170.compute-1.amazonaws.com/api/notes/${id}/`)
          .then(() => {
              setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
              setFilteredNotes(prevNotes => prevNotes.filter(note => note.id !== id));
          })
          .catch(error => {
              console.error('There was an error deleting the note!', error);
          });
  };

  const updateNote = (updatedNote) => {
      setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note));
      setFilteredNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  return (
      <div className="min-h-screen flex flex-col items-center p-4 bg-animated">
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg md:p-8">
              <h1 className="text-3xl font-bold text-gradient mb-6 text-center">Note Taking App</h1>
              <AddNote addNote={addNote} />
              <SearchNotes onSearchResults={handleSearchResults} onSearchQueryChange={handleSearchQueryChange} />
              <NotesList notes={filteredNotes} deleteNote={deleteNote} updateNote={updateNote} />
          </div>
      </div>
  );
};

export default App;