import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress, Grid,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SavedComparisons = () => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComparisons = async () => {
      const token = sessionStorage.getItem('token');
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
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!Array.isArray(comparisons) || comparisons.length === 0) {
    return <Typography variant="h6">No saved comparisons available.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Saved Comparisons</Typography>
      <Grid container spacing={3}>
        {comparisons.map((comparison, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined">
              <CardContent>
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
          </Grid>
        ))}
      </Grid>
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
