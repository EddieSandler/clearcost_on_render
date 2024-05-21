import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, Button,InputLabel } from '@material-ui/core';

function InsuranceForm({ onNext }) {
    const [formData, setFormData] = useState({
        insured: 'yes',
        insuranceCompany: '',
        groupPlanNumber: '',
        policyID: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        zip: '',
        relationship: '',
        dateOfService: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Validation and handling the submission logic can be added here
        console.log('Form Data:', formData);
        onNext();  // Assuming onNext will handle the transition to the next section
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper style={{ padding: 20, marginTop: 10 }}>
                <Typography component="h1" variant="h6">Register</Typography>
                <FormControl component="fieldset" style={{ margin: '20px 0' }}>
                    <FormLabel component="legend">Do you have insurance?</FormLabel>
                    <RadioGroup row name="insured" value={formData.insured} onChange={handleInputChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                {formData.insured === 'yes' && (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Insurance Company"
                            name="insuranceCompany"
                            value={formData.insuranceCompany}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Group Plan Number"
                            name="groupPlanNumber"
                            value={formData.groupPlanNumber}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Insurance Policy ID"
                            name="policyID"
                            value={formData.policyID}
                            onChange={handleInputChange}
                        />
                    </>
                )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    name="dob"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dob}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="ZIP Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="relationship-label">Relationship to Subscriber</InputLabel>
                    <Select
                        labelId="relationship-label"
                        id="relationship"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="Subscriber">Subscriber</MenuItem>
                        <MenuItem value="Dependent">Dependent</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Next
                </Button>
            </Paper>
        </Container>
    );
}

export default InsuranceForm;