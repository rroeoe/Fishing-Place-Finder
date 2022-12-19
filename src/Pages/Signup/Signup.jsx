import React, { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../Services/Firebase";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";

const Signup = () => {
  const emailRef = useRef();
  const firstnameRef = useRef();
  const secondnameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { signup, currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      firstnameRef.current.value === "" ||
      secondnameRef.current.value === ""
    ) {
      return setError("Vor- und/oder Nachname fehlt");
    }

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwörter stimmen nicht überein");
    }

    signup(emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = setDoc(doc(db, "users", user.uid), {
          userId: user.uid,
          email: user.email,
          firstname:
            firstnameRef.current.value.charAt(0).toUpperCase() +
            firstnameRef.current.value.slice(1),
          secondname:
            secondnameRef.current.value.charAt(0).toUpperCase() +
            secondnameRef.current.value.slice(1),
        });
        navigate("/");
        successAlert("Account konnte erfolgreich erstellt werden")
      })
      .catch((error) => {
        errorAlert("Der Account konnte nicht erstellt werden")
      });
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography component="h1" variant="h5">
              Profil erstellen
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
        </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              fullWidth
              id="firstname"
              label="Vorname"
              name="firstname"
              autoComplete="firstname"
              inputRef={firstnameRef}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              fullWidth
              id="secondname"
              label="Nachname"
              name="secondname"
              autoComplete="secondname"
              inputRef={secondnameRef}
            />
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
              label="Passwort (mind. 6 Zeichen)"
              name="password"
              type="password"
              autoComplete="new-password"
              inputRef={passwordRef}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              fullWidth
              id="passwordConfirmation"
              label="Passwort bestätigen"
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              inputRef={passwordConfirmationRef}
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
              Registrieren
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Link href="/login" variant="body2">
              Du hast bereits einen Account?
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Signup;
