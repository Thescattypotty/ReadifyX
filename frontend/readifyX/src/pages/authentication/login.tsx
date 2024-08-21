import React, { useState } from 'react';
import { useLogin , useLink , useRouterType , useRouterContext} from "@refinedev/core";
import { LoginRequest } from '../../interfaces';
import { TextField, Button, Container, Typography, Stack, FormControl, CardContent, Card, Box, FormControlLabel, Checkbox } from '@mui/material';
import {layoutStyles , titleStyles} from "../styles";

import MuiLink from "@mui/material/Link";
import { ThemedTitleS } from '../../components/title';

export const LoginPage = () => {
    const { mutate: login, isLoading } = useLogin<LoginRequest>();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();


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
    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const PageTitle = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "32px",
                fontSize: "20px",
            }}
        >
            <ThemedTitleS 
                collapsed={false}
                wrapperStyles={{
                    gap: "8px",
                }}
                text='readifyX'
            />
        </div>
    );

    return(
        <Box component="div" style={layoutStyles}>
            <Container
                component="main"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100dvh",
                    padding: "16px",
                    width: "100%",
                    maxWidth: "400px",
                }}
                >
                <Box
                    sx={{
                    width: "100%",
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "15dvh",
                    }}
                >
                    {PageTitle}
                    <Card>
                        <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
                            <Typography
                                component="h1"
                                variant="h5"
                                align="center"
                                style={titleStyles}
                                color="primary"
                                fontWeight={700}
                            >
                                Sign in to your account
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={onSubmit}    
                            >
                                <TextField
                                    required
                                    id='username'
                                    margin='normal'
                                    fullWidth
                                    label="Username"
                                    name='username'
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{
                                        mt: 0,
                                    }}
                                />

                                <TextField
                                    required
                                    id='password'
                                    margin='normal'
                                    fullWidth
                                    label="Password"
                                    name='password'
                                    type='password'
                                    value={password}
                                    placeholder='●●●●●●●●'
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{
                                        mt: 0,
                                    }}
                                />
                                <Box
                                    component="div"
                                    sx={{
                                        mt: "24px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <FormControlLabel 
                                        sx={{
                                            span: {
                                            fontSize: "14px",
                                            color: "text.secondary",
                                            },
                                        }}
                                        color="secondary"
                                        control={
                                            <Checkbox
                                            size="small"
                                            id="remember"
                                            />
                                        }
                                        label="Remember me"
                                    />
                                    <MuiLink
                                        variant="body2"
                                        color="primary"
                                        fontSize="12px"
                                        component={ActiveLink}
                                        underline="none"
                                        to="/forgot-password"
                                        >
                                        Forgot Password ?
                                    </MuiLink>


                                </Box>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    disabled={isLoading}
                                    sx={{mt: "24px"}}    
                                >
                                    Sign In
                                </Button>
                                
                            </Box>
                            <Box
                            sx={{
                                mt: "24px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                }}
                            >
                                <Typography
                                    textAlign="center"
                                    variant="body2"
                                    component="span"
                                    fontSize="12px"
                                >
                                    Don’t have an account?
                                </Typography>
                                <MuiLink
                                    ml="4px"
                                    fontSize="12px"
                                    variant="body2"
                                    color="primary"
                                    component={ActiveLink}
                                    underline="none"
                                    to="/register"
                                    fontWeight="bold"
                                >
                                    Sign up
                                </MuiLink>

                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
    /*
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
    );*/
};