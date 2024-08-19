import React, { useState } from 'react';
import { useLogin } from "@refinedev/core";
import { LoginRequest } from "../../../types/Request/LoginRequest";
import { TextField, Button, Container, Typography, Stack, FormControl } from '@mui/material';

export const LoginPage = () => {
    const { mutate: login, isLoading } = useLogin<LoginRequest>();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        try {
            await login({ username, password });
        } catch (error: unknown) {
            setError('Login failed. Please check your credentials and try again.');
            console.log(error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            {error && (
                <Typography color="error" align="center" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={onSubmit}>
                <Stack spacing={2}>
                    <TextField 
                        variant='outlined'
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField 
                        type="password"
                        variant='outlined'
                        required
                        fullWidth
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </Stack>
            </form>
        </Container>    
    );
};