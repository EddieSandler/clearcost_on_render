import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';

function ProcedureQueryForm() {
    const [procedureId, setProcedureId] = useState('');
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);

    const handleChange = (e) => {
        setProcedureId(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!procedureId) {
            setError('Procedure ID is required');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const result = await axios.get('http://localhost:3000/test', {
                params: { procedureId }
            });
            setResponse(result.data);
        } catch (error) {
            setError('Failed to fetch data');
            setResponse([]);
        } finally {
            setIsLoading(false);
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
            <h1>Search Procedure Data</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Procedure ID:
                    <input
                        type="text"
                        name="procedureId"
                        value={procedureId}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {response.map((item) => (
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
                        const selectedFacility = response.find(item => item.facility_name === facilityName);
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

export default ProcedureQueryForm;
