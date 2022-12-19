import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import { db } from "../../Services/Firebase";
import { setDoc, doc } from "firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { successAlert, errorAlert } from "../../Components/Alerts/Alerts";

const UpdateEmail = () => {
  const emailRef = useRef();
  const { currentUser, updateEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (emailRef.current.value === currentUser.email) {
      errorAlert("Es wurde keine neue E-Mail erfasst")
    }

    const promises = [];
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));

      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, { email: emailRef.current.value }, { merge: true });
      successAlert("Die E-Mail wurde erfolgreich angepasst")
    }

    Promise.all(promises)
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        errorAlert("Die E-Mail konnte nicht angepasst werden. Bitte logge dich neu ein und versuche es noch einmal.")
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
            E-Mail ändern
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="body1">
            aktuelle E-Mail: {currentUser.email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Neue E-Mail Adresse"
            name="email"
            autoComplete="email"
            inputRef={emailRef}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            type="submit"
            fullWidth
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

export default UpdateEmail;
