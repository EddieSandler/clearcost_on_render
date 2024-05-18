import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function MyForm() {
  // Define the options for the autocomplete
  const options = ['Office visit - 45 minutes', 'Office visit - 60 minutes', 'Office visit - 15 minutes','Hysterectomy'];

  return (
    <>
    <div>
    <h1>Price Comparison</h1>
    </div>

    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}  // Using the defined options
      renderInput={(params) => <TextField {...params} label="Choose an option" />}
      style={{ width: 300 }} // Adjust the width as needed
      onInputChange={(event, newInputValue) => {
        console.log(newInputValue); // This logs the value currently being typed
      }}
    />
    </>
  );
}

export default MyForm;
