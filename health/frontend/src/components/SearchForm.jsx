import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { teal, blueGrey } from '@mui/material/colors';
import axios from 'axios';


function SearchForm() {
  const [formValues, setFormValues] = useState({
    procedure: '',
    facility: '',
    provider: '',
    copayment: '',
    deductible: '',
    coinsurance: ''
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    res.header("Access-Control-Allow-Origin", "*");
    event.preventDefault();
    console.log('Form Values:', formValues);
    // Submit logic here
    try {
      // Assuming your API endpoint is '/api/search' and accepts POST requests
      const response = await axios.get('http://localhost:3000/search', {
        params: formValues
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClear = () => {
    setFormValues({
      procedure: '',
      facility: '',
      provider: '',
      copayment: '',
      deductible: '',
      coinsurance: ''
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        bgcolor: blueGrey[50],
        p: 4,
        borderRadius: 2
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" color={teal[700]} gutterBottom>
        Medical Pricing Search Form
      </Typography>
      <TextField
        required
        name="procedure"
        label="Procedure"
        value={formValues.procedure}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        required
        name="facility"
        label="Facility"
        value={formValues.facility}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        required
        name="provider"
        label="Health Insurance Provider"
        value={formValues.provider}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        required
        name="copayment"
        label="Copayment"
        value={formValues.copayment}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        required
        name="deductible"
        label="Deductible"
        value={formValues.deductible}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        required
        name="coinsurance"
        label="Coinsurance"
        value={formValues.coinsurance}
        onChange={handleChange}
        variant="outlined"
      />
      <Button type="submit" variant="contained" sx={{ bgcolor: teal[700], '&:hover': { bgcolor: teal[900] } }}>Submit</Button>
      <Button onClick={handleClear} variant="outlined" sx={{ color: teal[700], borderColor: teal[700] }}>Clear</Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <Link href="/" color={teal[700]}>Back to Home</Link>
      </Typography>
    </Box>
  );
}

export default SearchForm;
