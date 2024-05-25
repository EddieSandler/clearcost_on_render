import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Checkbox, FormControlLabel, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './PriceComparisonForm.css'; // Import the CSS file

function PriceComparisonForm() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook inside the component

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
    } else {
      setSelectedOption(null);
      setResult(null);
    }
  };

  const handleSelectCard = (facilityName) => {
    setSelectedCards(prevSelected => {
      if (prevSelected.includes(facilityName)) {
        return prevSelected.filter(name => name !== facilityName);
      } else {
        return [...prevSelected, facilityName];
      }
    });
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setResult(null);
    setSelectedCards([]);
  };

  const saveComparison = async () => {
    const token = sessionStorage.getItem('token'); // Assuming you save your token in sessionStorage
    if (!token) {
      alert('Please log in to save comparisons');
      return;
    }

    const comparison = selectedCards.map(facilityName => {
      const selectedFacility = result.find(item => item.facility_name === facilityName);
      return {
        procedure_name: selectedFacility.procedure_name,
        facility_name: selectedFacility.facility_name,
        price: selectedFacility.price
      };
    });

    try {
      const response = await axios.post('http://localhost:3000/save-comparison', {
        comparison
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Comparison saved successfully');
      } else {
        alert('Failed to save comparison');
      }
    } catch (error) {
      console.error('Error saving comparison:', error);
      alert('Failed to save comparison');
    }
  };

  return (
    <div className="fullscreen-background">
      <Container className="formContainer">
        <Typography variant="h4" gutterBottom>Price Comparison</Typography>
        <div className="autocomplete-container">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Choose an option" />}
            style={{ width: 300 }}
            onChange={handleOptionChange}
            value={selectedOption}
          />
        </div>

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

        {selectedCards.length > 0 && (
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
            <Button variant="contained" color="primary" onClick={saveComparison} style={{ marginTop: '20px' }}>
              Save Comparison
            </Button>
          </div>
        )}

        {(selectedOption || selectedCards.length > 0) && (
          <Button variant="contained" color="secondary" onClick={clearSelection} style={{ marginTop: '20px' }}>
            Clear Selection
          </Button>
        )}
         <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/saved-comparisons')} // Navigate to saved comparisons
          style={{ marginTop: '20px' }}
        >
          View Previous Searches
        </Button>


      </Container>
    </div>
  );
}

export default PriceComparisonForm;
