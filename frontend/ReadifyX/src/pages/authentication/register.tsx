import { useEffect, useState } from "react";
import {
  useLink,
  useRegister,
  useRouterContext,
  useRouterType,
} from "@refinedev/core";
import { RegisterRequest } from "../../interfaces";
import { layoutStyles, titleStyles } from "../styles";
import {
  TextField,
  Button,
  Container,
  Typography,
  CardContent,
  Card,
  Box
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { ThemedTitleS } from "../../components/title";

export const RegisterPage = () => {
  const { mutate: register, isLoading } = useRegister<RegisterRequest>();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const validateForm = (): boolean => {
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 2) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!validateForm()) return;

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }
    try {
      const values = {
        username: event.currentTarget.username.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      }
      console.log(values);
      register(values);
    } catch (error: unknown) {
      setError("Registration failed. Please retry");
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
        text="readifyX"
      />
    </div>
  );
  return (
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
                Sign up to your account
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  required
                  id="email"
                  margin="normal"
                  fullWidth
                  label="Email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    mt: 1,
                  }}
                />
                <TextField
                  required
                  id="username"
                  margin="normal"
                  fullWidth
                  label="Username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    mt: 1,
                  }}
                />

                <TextField
                  required
                  id="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  placeholder="●●●●●●●●"
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    mt: 1,
                  }}
                />
                <TextField
                  required
                  id="confirmPassword"
                  margin="normal"
                  fullWidth
                  label="Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  placeholder="●●●●●●●●"
                  autoComplete="confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!passwordsMatch}
                  helperText={!passwordsMatch ? "Passwords do not match" : ""}
                  sx={{
                    mt: 1,
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading || !passwordsMatch}
                  sx={{ mt: "24px" }}
                >
                  {isLoading ? "Registering..." : "Register"}
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
                  Already have an account?
                </Typography>
                <MuiLink
                  ml="4px"
                  fontSize="12px"
                  variant="body2"
                  color="primary"
                  component={ActiveLink}
                  underline="none"
                  to="/login"
                  fontWeight="bold"
                >
                  Sign In
                </MuiLink>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};
