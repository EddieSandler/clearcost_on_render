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
import TestForm from './components/TestForm';
import MainComponent from './components/MainComponent'; // Adjust the path based on your file structure
import NewForm from './components/NewForm'
import ProcedureQueryForm from './components/ProcedureQueryForm';
import MyForm from './components/MyForm';

function App() {
  return (

    <Router>
      <nav className="navBar">
        <Link to="/" className="navLink">Home</Link>
        <Link to="/register" className="navLink"><button className="registerButton">Register</button></Link>
        <Link to="/login" className="navlink"><button className="loginButton">Login</button></Link>
        {/* <Link to="/search" className="navlink"><button className="searchButton">Search</button></Link> */}
        <Link to="/search" className="navlink"><button className="navButton">Search</button></Link>
        {/* <Link to="/estimate" className="navlink"><button className="navButton">Estimate</button></Link> */}
        <Link to="/new" className="navlink"><button className="navButton">Pricing</button></Link>
        <Link to="/test" className="navlink"><button className="navButton">Test</button></Link>
        <Link to="/compare" className="navlink"><button className="navButton">Compare</button></Link>
      </nav>

    <div className="App">
      {/* Place navigation within the context of the Router for proper linking */}

      <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/register" element={<RegistrationForm />} /> */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/search" element={<TestForm />} />
      <Route path="/test" element={<ProcedureQueryForm />} /> */
      <Route path="/nav" element={<NavBar />} />
      <Route path="/Register" element={<MainComponent />} />
      <Route path="/new" element={<NewForm />} />
      <Route path="/compare" element={<MyForm />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
