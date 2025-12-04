import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nird from './pages/Nird';
import GameHome from './pages/GameHome';
import NotFound from './pages/NotFound';
import Accueil from './pages/Accueil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path='/gamehome' element={<GameHome />}/>
        <Route path='/nird' element={<Nird />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);



