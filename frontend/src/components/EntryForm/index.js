import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from 'axios'

function EntryForm() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [unix, setUnix] = useState(getCurrentUnixTimestamp())
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedContent = localStorage.getItem("content");
        if (storedContent) {
            setContent(storedContent);
        }
        const storedTitle = localStorage.getItem("title");
        if (storedTitle) {
            setTitle(storedTitle);
        }
    }, []);

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

    function getCurrentUnixTimestamp() {
        const dateString = getCurrentDate();
        const dateObject = new Date(dateString);
        const unixTimestamp = dateObject.getTime(); // divide by 1000 to get the timestamp in seconds instead of milliseconds
        return unixTimestamp;
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
    );
}

export default EntryForm;
