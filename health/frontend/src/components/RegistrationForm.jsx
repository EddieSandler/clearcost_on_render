import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('Registering:', { username, password });
        // Here you would add the code to handle the registration logic
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        className="btn btn-primary"
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default RegistrationForm;
