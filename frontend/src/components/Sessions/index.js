import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import EntryForm from '../EntryForm/index.js';
// import EditForm from '../EditForm/index.js';
import axios from 'axios';
import moment from 'moment';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import '../../styles/Journal.css';

function Journal() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://57.128.146.14:5001/api/entries').then((res) => {

                const storedEntries = res.data || [];
                setEntries(storedEntries);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    // const createMarkup = (html) => {
    //     return { __html: html };
    // };

    // function handleDelete(index) {
    //     const newEntries = entries.filter((_, i) => i !== index);
    //     localStorage.setItem('entries', JSON.stringify(newEntries));
    //     setEntries(newEntries);
    // }

    return (
        <div className="journal">
            <h1>Sessions</h1>
            <br />
            <center>
                <Button
                    component={Link}
                    to={`/add-entry`}
                    variant="contained"
                    color="primary"
                >
                    Add New Entry
                </Button>
            </center>
            <br />
            <ul>
                <div className="container">
                    {entries.map((entry, index) => (
                        <div key={index} className="result-item">

                            <h2>{entry.title}</h2>
                            {moment.utc(entry.date).format('ddd Do MMMM YYYY')}
                            <br />
                            <br />
                            {/* <p>{entry.content}</p> */}
                            {/* <div dangerouslySetInnerHTML={createMarkup(entry.content)} /> */}
                            <ButtonGroup
                                variant="contained"
                                aria-label="outlined primary button group"
                            >
                                <Button
                                    component={Link}
                                    to={`/entry/${entry._id}`}
                                    variant="contained"
                                    color="primary"
                                >
                                    View
                                </Button>
                                <Button
                                    component={Link}
                                    to={`/edit/${entry._id}`}
                                    variant="contained"
                                    color="primary"
                                >
                                    Edit
                                </Button>
                            </ButtonGroup>

                            {/* <Button onClick={() => handleDelete(index)}>Delete</Button> */}
                            <br />
                        </div>
                    ))}
                </div>
                <br />
            </ul>
            {/* <Routes>
                <Route path="/add-entry" element={<EntryForm />} />
                <Route path="/edit/:index" element={<EditForm entries={entries} />} />
            </Routes> */}
        </div>
    );
}

export default Journal;
