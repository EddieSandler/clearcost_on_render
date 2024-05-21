import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Checkbox, FormControlLabel } from '@mui/material';

function MyForm() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);

  const options = [
    { label: 'Colonoscopy', id: 1 },
    { label: 'Routine obstetric care', id: 2 },
    { label: 'Brain MRI', id: 3 },
    { label: 'Chest x-ray', id: 4 },
    { label: 'Spine MRI', id: 5 },
    { label: 'CT Scan', id: 6 },
    { label: 'Ultrasound', id: 7 },
    { label: 'Mammography', id: 8 },
    { label: 'Urinalysis', id: 9 },
    { label: 'Urine pregnancy test', id: 10 },
    { label: 'Lab Test-Cholesterol', id: 11 },
    { label: 'Vaccine admin', id: 12 },
    { label: 'Psychiatric diagnostic evaluation', id: 13 },
    { label: 'Comprehensive eye exam for new patients', id: 14 },
    { label: 'Allergy Testing', id: 15 },
    { label: 'Medical Genetics counseling', id: 16 },
    { label: 'Office visit-New patient', id: 17 },
    { label: 'Office Visit- 10 Minutes', id: 18 },
    { label: 'Office visit - 20 minutes', id: 19 },
    { label: 'Office visit - 30 minutes', id: 20 },
    { label: 'Preventive Exam ages 12-17', id: 21 },
    { label: 'Preventive Exam age 18-39', id: 22 },
    { label: 'Preventive Exam age 40-64', id: 23 },
    { label: 'Preventive Exam age 65+', id: 24 }
  ];

  const handleOptionChange = async (event, newValue) => {
    if (newValue) {
      console.log('Selected option:', newValue);
      setSelectedOption(newValue);

      try {
        const response = await axios.get('http://localhost:3000/compare', {
          params: { procedureId: newValue.id }
        });
        console.log('Response from backend:', response.data);
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleSelectCard = (id) => {
    setSelectedCards(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(cardId => cardId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <div>
      <h1>Price Comparison</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Choose an option" />}
        style={{ width: 300 }}
        onChange={handleOptionChange}
      />

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {result && result.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.facility_name}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.procedure_name}
                </Typography>
                <Typography variant="body2">
                  Facility: {item.facility_name}
                </Typography>
                <Typography variant="body2">
                  Price: ${item.price}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCards.includes(item.facility_name)}
                      onChange={() => handleSelectCard(item.facility_name)}
                    />
                  }
                  label="Select for Comparison"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedCards.length > 1 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Comparison</Typography>
          {selectedCards.map((facilityName) => {
            const selectedFacility = result.find(item => item.facility_name === facilityName);
            return (
              <Card variant="outlined" key={facilityName} style={{ marginTop: '10px' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {selectedFacility.procedure_name}
                  </Typography>
                  <Typography variant="body2">
                    Facility: {selectedFacility.facility_name}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${selectedFacility.price}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyForm;
