import { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EntryForm from '../EntryForm/index.js';
import EditForm from '../EditForm/index.js';
import axios from 'axios';
import moment from 'moment';

function Journal() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://57.128.146.14:5001/api/entries').then(res => {
                console.log(res)
                const storedEntries = res.data || [];
                setEntries(storedEntries);
            })
        } catch (error) {
            console.log(error)
        }
    }, []);

    const createMarkup = (html) => {
        return { __html: html };
    }

    function handleDelete(index) {
        const newEntries = entries.filter((_, i) => i !== index);
        localStorage.setItem('entries', JSON.stringify(newEntries));
        setEntries(newEntries);
    }

    return (
        <div>
            <h1>Journal</h1>
            <br />
            <Link to="/add-entry">Add New Entry</Link>
            <br />
            <ul style={{ display: "block" }}>
                {entries.map((entry, index) => (
                    <li key={index} style={{ display: "block" }}>
                        <h2>{entry.title}</h2>
                        {/* <p>{moment.utc(entry.date).format("dddd Do MMMM YYYY")}</p> */}
                        {/* <p>{entry.content}</p> */}
                        <div dangerouslySetInnerHTML={createMarkup(entry.content)} />

                        <button>
                            <Link to={`/edit/${index}`}>Edit</Link>
                        </button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        <br />
                    </li>

                ))}
                <br />
            </ul>
            <Routes>

                <Route path="/add-entry" element={<EntryForm />} />
                <Route path="/edit/:index" element={<EditForm entries={entries} />} />
            </Routes>
        </div>
    );
}

export default Journal;
