import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import login from "../api/loginApi";


const LoginForm = ({ setLoggedIn, setUser }) => {
    const [email, setEmail] = useState('molly.smith@example.com');
    const [password, setPassword] = useState('disco');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        login(email, password).then((resp) => {
            console.log(resp)
            if (resp.success === true) {
                setLoggedIn(true)
                setUser(resp.data.data)
                navigate("/");
            }
        }) 
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={6} sx={{ marginTop: 8, display: 'flex',  flexDirection: 'column', alignItems: 'center', padding: 3}}>
                    <Typography component="h1" variant="h5">
                    Demo User Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginForm;