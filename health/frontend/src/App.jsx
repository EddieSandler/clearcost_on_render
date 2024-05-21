import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import logo from '/logo.webp'
import './App.css'
import './Nav.css'
import RegistrationForm from './components/RegistrationForm'
import  LoginForm from './components/LoginForm'
import HomePage from './HomePage'
import SearchForm from './components/SearchForm';
import NavBar from './components/Navbar';
import PriceComparisonForm from './components/PriceComparisonForm';
import InsuranceForm from './components/RegisterForm';

function App() {
  return (

    <Router>
      <nav className="navBar">
        <Link to="/" className="navLink">Home</Link>
        <Link to="/register" className="navLink"><button className="registerButton">Register</button></Link>
        <Link to="/login" className="navlink"><button className="loginButton">Login</button></Link>
        <Link to="/compare" className="navlink"><button className="navButton">Compare</button></Link>
      </nav>

    <div className="App">


      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<InsuranceForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/compare" element={<PriceComparisonForm />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
