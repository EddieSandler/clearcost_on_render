import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

function ProcedureSelector({ specialty, onProcedureSelect }) {
  const [selectedProcedure, setSelectedProcedure] = useState('');

  const procedures = {
    "Office Visit": [
      { code: "99203", description: "Office visit-new patient, 30 minutes" },
      { code: "99204", description: "Office visit-new patient, 45 minutes" },
      { code: "99205", description: "Office visit-new patient, 60 minutes" },
      { code: "99243", description: "Office consultation 40 minutes" },
      { code: "99244", description: "Office consultation 60 minutes" },
      { code: "99385", description: "Preventive medicine evaluation, initial new patient (18 - 39 years)" },
      { code: "99386", description: "Preventive medicine evaluation, initial new patient (40 - 64 years)" }
    ]
    // Add other specialties and their procedures here
  };

  const handleSelectProcedure = (event) => {
    setSelectedProcedure(event.target.value);
  };

  const handleSubmit = () => {
    onProcedureSelect(selectedProcedure);
  };

  return (
    <Paper style={{ padding: 20, margin: '20px auto', maxWidth: 600 }}>
      <Typography variant="h6">Step 3: Select a Procedure for {specialty}</Typography>
      <FormControl fullWidth>
        <InputLabel id="procedure-select-label">Procedure</InputLabel>
        <Select
          labelId="procedure-select-label"
          id="procedure-select"
          value={selectedProcedure}
          onChange={handleSelectProcedure}
        >
          {procedures[specialty]?.map((procedure) => (
            <MenuItem key={procedure.code} value={procedure.code}>
              {procedure.code} - {procedure.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
}

export default ProcedureSelector;
