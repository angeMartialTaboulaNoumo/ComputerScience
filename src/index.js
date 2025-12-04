import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameHome from './pages/GameHome';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/gamehome' element={<GameHome />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

