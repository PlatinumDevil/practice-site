import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar/index.js'
import HomePage from './components/HomePage/index.js';
import Journal from './components/Journal/index.js';
import Entry from './components/Entry/index.js'
import EntryForm from './components/EntryForm/index.js';
import EditForm from './components/EditForm/index.js';
import Logout from './components/Logout/index.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>

          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/entries" element={<Journal />} />
          <Route path="/entry/:id" element={<Entry />} />
          <Route path="/add-entry" element={<EntryForm />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
