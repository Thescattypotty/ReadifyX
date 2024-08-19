import React, { useState, useEffect } from 'react';
import { AuthActionResponse, useRegister } from "@refinedev/core";
import { TextField, Button, Container, Typography, Stack, FormControl } from '@mui/material';
import { RegisterRequest } from '../../../types/Request/RegisterRequest';
import { authProvider } from '../../../authProvider';

export const RegisterPage = () => {
    const { mutate: register, isLoading } = useRegister<RegisterRequest>();
    
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const validateForm = (): boolean => {
        if(!username || !email || !password || !confirmPassword)
        {
            setError('All fields are required');
            return false;
        }
        if (!passwordsMatch) {
            setError('Passwords do not match');
            return false;
        }
        if(password.length < 6)
        {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    }
    
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        if(!validateForm()) return;

        if (!passwordsMatch) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register({username, email, password});
        } catch (error: unknown) {
            setError('Registration failed. Please retry');
            console.log(error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Register
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
                        variant='outlined'
                        required
                        fullWidth
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <TextField 
                        type="password"
                        variant='outlined'
                        required
                        fullWidth
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!passwordsMatch}
                        helperText={!passwordsMatch ? "Passwords do not match" : ""}
                    />
                    <Button 
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        disabled={isLoading || !passwordsMatch}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}