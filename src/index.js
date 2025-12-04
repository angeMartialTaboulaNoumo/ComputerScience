import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nird from './pages/Nird';
import GameHome from './pages/GameHome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='gamehome' element={<GameHome />}/>
        <Route path='nird' element={<Nird />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

