import { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EntryForm from '../EntryForm/index.js';
import EditForm from '../EditForm/index.js';

function Journal() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        setEntries(storedEntries);
    }, []);

    function handleDelete(index) {
        const newEntries = entries.filter((_, i) => i !== index);
        localStorage.setItem('entries', JSON.stringify(newEntries));
        setEntries(newEntries);
    }

    return (
        <div>
            <h1>Journal</h1>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <h2>{entry.title}</h2>
                        <p>Date: {entry.date}</p>
                        <p>{entry.content}</p>
                        <button>
                            <Link to={`/edit/${index}`}>Edit</Link>
                        </button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/add-entry">Add New Entry</Link>
            <Routes>

                <Route path="/add-entry" element={<EntryForm />} />
                <Route path="/edit/:index" element={<EditForm entries={entries} />} />
            </Routes>
        </div>
    );
}

export default Journal;
