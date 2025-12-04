import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameHome from './pages/GameHome';
import Accueil from './pages/Accueil';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path='/gamehome' element={<GameHome />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);



