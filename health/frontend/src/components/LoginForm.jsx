import React from 'react';
import { TextField, Button } from '@mui/material';
import '../App.css'

function LoginForm() {
  return (

    <div className="login">
      <h1>Login</h1>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </div>
  );
}

export default LoginForm;
