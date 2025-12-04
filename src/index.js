import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nird from './pages/Nird';
import GameHome from './pages/GameHome';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './assets/styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/gamehome' element={<GameHome />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='nird' element={<Nird />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

