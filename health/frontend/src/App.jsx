import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from '/logo.webp'
import './App.css'
import './Nav.css'
import  LoginForm from './components/LoginForm'
import HomePage from './HomePage'
import SearchForm from './components/SearchForm';
import NavBar from './components/Navbar';
import TestForm from './components/TestForm';


function App() {
  return (

    <Router>
      <nav className="navBar">
        <Link to="/" className="navLink">Home</Link>
        <Link to="/login" className="navLink"><button className="navButton">Login/Register</button></Link>
        <Link to="/search" className="navLink"><button className="navButton">Search</button></Link>
        <Link to="/test" className="navLink"><button className="navButton">Test</button></Link>
      </nav>

    <div className="App">
      {/* Place navigation within the context of the Router for proper linking */}

      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/search" element={<SearchForm />} />
      <Route path="/test" element={<TestForm />} />
      <Route path="/nav" element={<NavBar />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
