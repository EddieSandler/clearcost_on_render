import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.status === 200) {
        handleLogin();
        navigate('/compare');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </>
  );
};

export default LoginForm;
