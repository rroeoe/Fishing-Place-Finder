import React, { useRef, useState } from "react";
import { useAuth } from "../../Services/AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { successAlert, errorAlert } from "../../Components/Alerts/Alerts";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      successAlert("Prüfe deine Mailbox für weitere Schritte");
      navigate("/login")
    } catch {
      errorAlert("Das Passwort konnte nicht zurückgesetzt werden");
    }
    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography component="h1" variant="h5">
            Passwort zurücksetzen
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            zurücksetzen
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
