import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import './PriceComparisonForm.css'; // Ensure this CSS file is imported

const RegistrationForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [copayment, setCopayment] = useState('');
  const [coinsurance, setCoinsurance] = useState('');
  const [deductible, setDeductible] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        userName,
        password,
        insuranceCompany,
        copayment,
        coinsurance,
        deductible
      });
      if (response.status === 200) {
        navigate('/compare');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label={<span className="dark-label">User Name</span>}
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label={<span className="dark-label">Password</span>}
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label={<span className="dark-label">Confirm Password</span>}
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField
          label={<span className="dark-label">Insurance Company</span>}
          variant="outlined"
          fullWidth
          margin="normal"
          value={insuranceCompany}
          onChange={(e) => setInsuranceCompany(e.target.value)}
        />
        <TextField
          label={<span className="dark-label">Copayment %</span>}
          variant="outlined"
          fullWidth
          margin="normal"
          value={copayment}
          onChange={(e) => setCopayment(e.target.value)}
        />
        <TextField
          label={<span className="dark-label">Co-insurance ($ or %)</span>}
          variant="outlined"
          fullWidth
          margin="normal"
          value={coinsurance}
          onChange={(e) => setCoinsurance(e.target.value)}
        />
        <TextField
          label={<span className="dark-label">Deductible ($)</span>}
          variant="outlined"
          fullWidth
          margin="normal"
          value={deductible}
          onChange={(e) => setDeductible(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </>
  );
};

export default RegistrationForm;
