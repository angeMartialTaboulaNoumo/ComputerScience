import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nird from './pages/Nird';
import GameHome from './pages/GameHome';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './assets/styles/index.css'
import Accueil from './pages/Accueil';
import CreditsPage from './pages/CreditsPage';
import AnalyseDashboard from './pages/AnalyseDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path='/gamehome' element={<GameHome />}/>
        <Route path='/nird' element={<Nird />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='*' element={<NotFound />}/>
        <Route path='/creditpage' element={<CreditsPage />}/>
        <Route path='/analyse' element={<AnalyseDashboard />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);



