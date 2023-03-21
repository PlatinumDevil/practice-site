import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Entry() {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);
    // const entryId = // get the entry ID from the URL
    console.log(id)

    useEffect(() => {
        try {
            axios.get(`http://57.128.146.14:5001/api/entry/${id}`).then(response => {
                setEntry(response.data)
            })
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
    }, [id]);
    const createMarkup = (html) => {
        return { __html: html };
    }

    if (!entry) {
        return <div>Loading...</div>;
    }
    const title = entry.title

    // Query the database using the entry's ID to retrieve the entry's details

    return (
        <div>
            <center>
                <h1>{title}</h1>
                {moment.utc(entry.date).format("dddd Do MMMM YYYY")}
            </center>
            <div dangerouslySetInnerHTML={createMarkup(entry.content)} />
            {/* {entries.data.title} */}
            {/* {entries.map(entry => (
                <div key={entry._id}>
                    <Link to={`/entries/${entry._id}`}>
                        <h2>{entry.title}</h2>
                    </Link>
                </div>
            ))} */}
        </div>
    );
}

export default Entry;
