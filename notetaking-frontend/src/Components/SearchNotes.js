import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchNotes = ({ onSearchResults, onSearchQueryChange }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setLoading(true);
        axios.get(`https://ec2-3-86-95-170.compute-1.amazonaws.com/api/search/?search=${query}`)
            .then(response => {
                onSearchResults(response.data);
                onSearchQueryChange(query);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error searching the notes!', error);
                setLoading(false);
            });
    };

    return (
        <div className="mb-6">
            <div className="flex items-center bg-white border border-secondary rounded-lg p-1 shadow-md">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-none outline-none flex-grow p-2 text-primary focus:ring-0"
                    placeholder="Search notes..."
                />
                <button
                    onClick={handleSearch}
                    className="ml-2  text-primary px-4 py-2 rounded-lg hover:text-secondary transition duration-300 flex items-center"
                >
                    <FontAwesomeIcon icon={faSearch} className="ml-2" />
                    
                </button>
            </div>
            {loading && <p className="mt-4 text-gray-600 animate-pulse">Searching...</p>}
        </div>
    );
};

export default SearchNotes;
