import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './PriceComparisonForm.css'; // Ensure this CSS file is imported

const SavedComparisons = () => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchComparisons = async () => {
      const token = sessionStorage.getItem('token');
      console.log('Retrieved token:', token); // Log the token
      if (!token) {
        alert('Please log in to view saved comparisons');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/get-comparisons', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API Response:', response.data);
        if (response.status === 200) {
          setComparisons(response.data.comparisons);
        } else {
          alert('Failed to retrieve comparisons');
        }
      } catch (error) {
        console.error('Error retrieving comparisons:', error);
        alert('Failed to retrieve comparisons');
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, []); // Empty dependency array to ensure it runs only once on mount

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>

      <Typography variant="h4" gutterBottom>Saved Procedures</Typography>
      {(!Array.isArray(comparisons) || comparisons.length === 0) ? (
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">No saved procedures available.</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/compare')} // Navigate back to /compare
            style={{ marginTop: '20px' }}
          >
            Back
          </Button>
        </div>
      ) : (
        <Grid container spacing={3} justifyContent="center"> {/* Center align the grid container */}
          {comparisons.map((comparison, index) => (
            // <Grid item xs={12} sm={6} md={3} key={index}> {/* Adjust grid item size for 4x4 layout */}
              <Card variant="outlined" className="card">
                <CardContent className="card-content">
                  <Typography variant="h6" component="div">
                    {comparison.procedure_name}
                  </Typography>
                  <Typography variant="body2">
                    Facility: {comparison.facility_name}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${comparison.price}
                  </Typography>
                </CardContent>
              </Card>
            // </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/compare')} // Navigate back to /compare
        style={{ marginTop: '20px' }}
      >
        Back
      </Button>
    </Container>
  );
};

export default SavedComparisons;
