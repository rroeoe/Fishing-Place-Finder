import React, { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import Typography from "@mui/material/Typography";
import { errorAlert } from "../../Components/Alerts/Alerts";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      errorAlert("Die Kombination aus E-Mail und Passwort ist nicht korrekt")
    }
    setLoading(false);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="E-Mail Adresse"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Passwort"
              name="password"
              type="password"
              autoComplete="password"
              inputRef={passwordRef}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
            >
              Anmelden
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Link href="/signup" variant="body2">
              Du hast noch kein Benutzerkonto?
            </Link>
          </Grid>
          <Grid item xs={12} md={12}>
            <Link href="/forgot-password" variant="body2">
              Passwort vergessen?
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
