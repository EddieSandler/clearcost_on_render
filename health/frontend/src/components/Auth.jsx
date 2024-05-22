import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const Auth = ({ isRegister, toggleForm }) => {
  return (
    <Container>
      {isRegister ? <RegistrationForm /> : <LoginForm />}
      <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link component="button" onClick={toggleForm} style={{ cursor: 'pointer' }}>
          {isRegister ? 'Login' : 'Register'}
        </Link>
      </Typography>
    </Container>
  );
};

export default Auth;
