import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import './PriceComparisonForm.css'; // Ensure this CSS file is imported

const RegistrationForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [copayment, setCopayment] = useState('');
  const [coinsurance, setCoinsurance] = useState('');
  const [deductible, setDeductible] = useState('');
  const [error, setError] = useState('');

  // Clear the form fields on component mount
  useEffect(() => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setInsuranceCompany('');
    setCopayment('');
    setCoinsurance('');
    setDeductible('');
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
        insuranceCompany,
        copayment:copayment ||null,
        coinsurance:coinsurance||null,
        deductible:deductible||null
      });
      if (response.status === 200) {
        handleLogin(); // Call handleLogin to navigate to the comparison page

        // Clear all form fields after successful registration
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setInsuranceCompany('');
        setCopayment('');
        setCoinsurance('');
        setDeductible('');
        setError('');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField
          label="Insurance Company"
          variant="outlined"
          fullWidth
          margin="normal"
          value={insuranceCompany}
          onChange={(e) => setInsuranceCompany(e.target.value)}
        />
        <TextField
          label="Copayment %"
          variant="outlined"
          fullWidth
          margin="normal"
          value={copayment}
          onChange={(e) => setCopayment(e.target.value)}
        />
        <TextField
          label="Co-insurance ($ or %)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={coinsurance}
          onChange={(e) => setCoinsurance(e.target.value)}
        />
        <TextField
          label="Deductible ($)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={deductible}
          onChange={(e) => setDeductible(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
