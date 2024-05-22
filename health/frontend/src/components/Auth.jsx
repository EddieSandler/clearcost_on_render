import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './Auth.css'; // Import the CSS file

const Auth = ({ isRegister, handleLogin, showRegisterForm, showLoginForm }) => {
  return (
    <div className="authBackground">
      <Container className="authContainer">
        {isRegister ? (
          <RegistrationForm />
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )}
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link component="button" onClick={isRegister ? showLoginForm : showRegisterForm} style={{ cursor: 'pointer' }}>
            {isRegister ? 'Login' : 'Register'}
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default Auth;
