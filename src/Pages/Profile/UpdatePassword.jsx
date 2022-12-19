import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { successAlert, errorAlert } from "../../Components/Alerts/Alerts";

const UpdatePassword = () => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      errorAlert("Die Passwörter stimmen nicht überein")
    }

    const promises = [];
    setLoading(true);

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        successAlert("Das Passwort wurde erfolgreich angepasst")
        navigate("/profile");
      })
      .catch(() => {
        errorAlert("Das Passwort konnte nicht angepasst werden. Bitte logge dich erneut ein.")
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography component="h1" variant="h5">
            Passwort ändern
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            name="password"
            label="Neues Passwort (mind. 6 Zeichen)"
            type="password"
            id="password"
            autoComplete="new-password"
            inputRef={passwordRef}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            name="passwordConfirm"
            label="Neues Passwort bestätigen"
            type="password"
            id="passwordConfirm"
            autoComplete="new-password"
            inputRef={passwordConfirmRef}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            Ändern
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            disabled={loading}
            href="/profile"
          >
            Abbrechen
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdatePassword;
