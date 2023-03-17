import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function EntryForm() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const newEntry = {
            title,
            content,
            date,
        };
        try {
            await axios.post('/api/entries', newEntry);
            navigate('/entries');
        } catch (error) {
            console.error(error);
        }
    }


    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

    return (
        <form>
            <br />
            <br />
            <label>
                Title:
                <br />
                <input type="text" value={title} placeholder='Session #' onChange={(event) => setTitle(event.target.value)} />
            </label>
            <br />
            <br />
            <label>
                Date:
                <br />
                <br />
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
            <br />
            <br />
            <label>
                Content:
                <br />
                <br />
                <textarea style={{ height: '200px', width: '650px' }} value={content} placeholder='Session records here' onChange={(event) => setContent(event.target.value)} />
            </label>
            <br />

            <button type="submit" onClick={handleSubmit}>
                Save
            </button>
        </form>
    );
}

export default EntryForm;
