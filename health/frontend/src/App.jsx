import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './NavBar.css';
import HomePage from './HomePage';
import PriceComparisonForm from './components/PriceComparisonForm';
import Auth from './components/Auth';
import NavBar from './components/NavBar';

function App() {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Router>
      <NavBar isRegister={isRegister} toggleForm={toggleForm} />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth isRegister={isRegister} toggleForm={toggleForm} />} />
          <Route path="/compare" element={<PriceComparisonForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
