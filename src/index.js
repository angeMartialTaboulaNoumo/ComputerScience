import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameHome from './pages/GameHome';
import CreditsPage from './pages/CreditsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/gamehome' element={<GameHome />}/>
        <Route path='/creditpage' element={<CreditsPage />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

