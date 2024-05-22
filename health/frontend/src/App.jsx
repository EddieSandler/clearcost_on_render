import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './NavBar.css';
import HomePage from './HomePage';
import PriceComparisonForm from './components/PriceComparisonForm';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isRegister, setIsRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavBar isRegister={isRegister} toggleForm={toggleForm} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth isRegister={isRegister} toggleForm={toggleForm} handleLogin={handleLogin} />} />
          <Route path="/compare" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PriceComparisonForm />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
