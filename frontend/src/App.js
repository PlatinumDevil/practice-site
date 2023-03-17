import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/index.js'
import HomePage from './components/HomePage/index.js';
import Journal from './components/Journal/index.js';
import EntryForm from './components/EntryForm/index.js';
import EditForm from './components/EditForm/index.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>

          <Route exact path="/" element={<HomePage />} />
          <Route path="/entries" element={<Journal />} />
          <Route path="/add-entry" element={<EntryForm />} />
          <Route path="/edit" element={<EditForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
