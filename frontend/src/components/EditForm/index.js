import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditForm({ entries }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { index } = useParams();

    const currentEntry = entries[index];

    function handleSubmit(event) {
        event.preventDefault();
        const newEntry = {
            title,
            date,
            content,
        };
        const newEntries = [...entries];
        newEntries[index] = newEntry;
        localStorage.setItem('entries', JSON.stringify(newEntries));
        navigate('/entries');
    }

    return (
        <form>
            <label>
                Title:
                <input type="text" value={currentEntry.title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label>
                Date:
                <input type="date" value={currentEntry.date} onChange={(event) => setDate(event.target.value)} />
            </label>
            <label>
                Content:
                <textarea
                    style={{ width: '650px', height: '200px' }}
                    value={currentEntry.content}
                    onChange={(event) => setContent(event.target.value)}
                />
            </label>
            <button type="submit" onClick={handleSubmit}>
                Save
            </button>
        </form>
    );
}

export default EditForm
