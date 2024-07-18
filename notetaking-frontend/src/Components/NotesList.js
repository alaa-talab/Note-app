import React, { useState } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const NotesList = ({ notes, deleteNote, updateNote }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const startEdit = (note) => {
        setIsEditing(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const handleEdit = (note) => {
        axios.put(`https://ec2-3-86-95-170.compute-1.amazonaws.com/api/notes/${note.id}/`, { title: editTitle, content: editContent })
            .then(response => {
                updateNote(response.data);
                setIsEditing(null);
            })
            .catch(error => {
                console.error('There was an error updating the note!', error);
            });
    };

    return (
        <div className="space-y-4">
            {notes.map(note => (
                <div key={note.id} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
                    {isEditing === note.id ? (
                        <div>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="block w-full mb-2 border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                            />
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="block w-full mb-2 border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                            ></textarea>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(note)}
                                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                            <p className="text-gray-600 mb-4">{note.content}</p>
                            <div className="mt-2 flex space-x-2">
                                <button
                                    onClick={() => startEdit(note)}
                                    className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    <PencilIcon className="w-5 h-5 mr-2" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    <TrashIcon className="w-5 h-5 mr-2" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NotesList;
