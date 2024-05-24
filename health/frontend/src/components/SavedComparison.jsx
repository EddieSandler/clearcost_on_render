import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent } from '@mui/material';

function SavedComparisons() {
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    const fetchComparisons = async () => {
      const token = localStorage.getItem('token'); // Assuming you save your token in localStorage

      try {
        const response = await axios.get('http://localhost:3000/get-comparisons', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setComparisons(response.data.comparisons);
      } catch (error) {
        console.error('Error fetching comparisons:', error);
      }
    };

    fetchComparisons();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Saved Comparisons</Typography>
      {comparisons.length > 0 ? (
        comparisons.map((comparison, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Comparison {index + 1}
              </Typography>
              {comparison.map((item, idx) => (
                <div key={idx}>
                  <Typography variant="body2">
                    Procedure: {item.procedure_name}
                  </Typography>
                  <Typography variant="body2">
                    Facility: {item.facility_name}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${item.price}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No saved comparisons found.</Typography>
      )}
    </Container>
  );
}

export default SavedComparisons;
