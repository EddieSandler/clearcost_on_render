import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const ProfileUpdateForm = () => {
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [copayment, setCopayment] = useState('');
  const [coinsurance, setCoinsurance] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    try {
      const response = await axios.put('http://localhost:3000/update-profile', {
        insuranceCompany,
        copayment,
        coinsurance
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setMessage('Profile updated successfully');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Update Profile</Typography>
      {message && <Typography color="secondary">{message}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Insurance Company"
          variant="outlined"
          fullWidth
          margin="normal"
          value={insuranceCompany}
          onChange={(e) => setInsuranceCompany(e.target.value)}
        />
        <TextField
          label="Copayment"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={copayment}
          onChange={(e) => setCopayment(e.target.value)}
        />
        <TextField
          label="Coinsurance"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={coinsurance}
          onChange={(e) => setCoinsurance(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Update Profile</Button>
      </form>
    </Container>
  );
};

export default ProfileUpdateForm;
