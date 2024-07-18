import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const AddNote = ({ addNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://ec2-3-86-95-170.compute-1.amazonaws.com/api/notes/', { title, content })
            .then(response => {
                addNote(response.data);
                setTitle('');
                setContent('');
            })
            .catch(error => {
                console.error('There was an error adding the note!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Add a New Note</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Title:</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Content:</label>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                ></textarea>
            </div>
            <button type="submit" className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add Note
            </button>
        </form>
    );
};

export default AddNote;
