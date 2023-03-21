import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';

function EditForm({ entries }) {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [unix, setUnix] = useState(getCurrentUnixTimestamp())
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // const entryId = // get the entry ID from the URL
    console.log(id)

    useEffect(() => {
        try {
            axios.get(`http://57.128.146.14:5001/api/entry/${id}`).then(response => {
                setEntry(response.data)
                // setTitle(response.data.title)
                // setContent(response.data.content)
            })
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
    }, [id]);

    if (!entry) {
        return <div>Loading...</div>;
    }

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;

        setTitle(newTitle)
        localStorage.setItem("title", newTitle)

    };

    const handleContentChange = (value) => {
        const newContent = value;
        setContent(newContent);
        localStorage.setItem("content", newContent);
    };

    const handleDateChange = (value) => {
        const newUnix = value;
        setUnix(newUnix);
        localStorage.setItem("unix", newUnix);
    };

    function getCurrentUnixTimestamp() {
        const dateString = getCurrentDate();
        const dateObject = new Date(dateString);
        const unixTimestamp = dateObject.getTime(); // divide by 1000 to get the timestamp in seconds instead of milliseconds
        return unixTimestamp;
    }
    async function handleSubmit(event) {
        event.preventDefault();

        // console.log(title)
        // console.log(content)
        // console.log(date)
        const newEntry = {
            title,
            content,
            date: unix,
        };
        try {
            await axios.post('http://57.128.146.14:5001/api/add-entry', newEntry);
            localStorage.removeItem("content");
            localStorage.removeItem("title")
            setTitle("")
            setContent("");
            navigate('/entries');
        } catch (error) {
            console.error(error);
        }
    }


    // console.log(title)
    console.log(title)
    // const [date, setDate] = useState('');

    // console.log(content)
    // const navigate = useNavigate();
    // const { index } = useParams();

    // const currentEntry = entries[index];

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     const newEntry = {
    //         title,
    //         date,
    //         content,
    //     };
    //     const newEntries = [...entries];
    //     newEntries[index] = newEntry;
    //     localStorage.setItem('entries', JSON.stringify(newEntries));
    //     navigate('/entries');
    // }
    function getCurrentDate() {
        const today = entry.date / 1000;
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
            <center>
                <label>
                    Title:
                    <br />
                    <input type="text" value={title} placeholder='Session #' onChange={handleTitleChange} />
                </label>
                <br />
                <br />
                <label>
                    Date:
                    <br />
                    <br />
                    <input type="date" value={date} onChange={handleDateChange} />
                </label>
                <br />
                <br />
                <label>
                    Content:
                    <br />
                    <br />
                    <ReactQuill style={{ height: '500px', width: '650px' }} value={content} placeholder='Session records here' onChange={handleContentChange} />
                </label>
                <br /><br /><br /><br />
                <button type="submit" onClick={handleSubmit}>
                    Save
                </button>
            </center>
        </form>
        // <form>
        //     <label>
        //         Title:
        //         <input type="text" value={currentEntry.title} onChange={(event) => setTitle(event.target.value)} />
        //     </label>
        //     <label>
        //         Date:
        //         <input type="date" value={currentEntry.date} onChange={(event) => setDate(event.target.value)} />
        //     </label>
        //     <label>
        //         Content:
        //         <textarea
        //             style={{ width: '650px', height: '200px' }}
        //             value={currentEntry.content}
        //             onChange={(event) => setContent(event.target.value)}
        //         />
        //     </label>
        //     <button type="submit" onClick={handleSubmit}>
        //         Save
        //     </button>
        // </form>
    );
}

export default EditForm
