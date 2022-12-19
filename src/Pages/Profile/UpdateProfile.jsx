import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import { db } from "../../Services/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { getDataOfCurrentUser } from "../../Services/Firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from '@mui/icons-material/Key';
import { successAlert, errorAlert } from "../../Components/Alerts/Alerts";

const UpdateProfile = () => {
  const firstnameRef = useRef();
  const secondnameRef = useRef();
  const bioRef = useRef();

  const { currentUser, updateEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dataOfCurrentUser, setDataOfCurrentUser] = useState([]);

  useEffect(() => {
    getDataOfCurrentUser(currentUser.uid, setDataOfCurrentUser);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const promises = [];

    async function updateProfile(firstname, secondname) {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, { firstname: firstname }, { merge: true });
      await setDoc(userRef, { secondname: secondname }, { merge: true });
      successAlert("Das Profil wurde erfolgreich angepasst")
    }

    promises.push(
      updateProfile(firstnameRef.current.value, secondnameRef.current.value)
    );
    Promise.all(promises)
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        errorAlert("Das Profil konnte nicht angepasst werden")
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} style={{ marginTop: "15%" }}>
          <Typography component="h1" variant="h5">
            Profil anpassen
          </Typography>
        </Grid>
        {dataOfCurrentUser.map((item) => (
          <>
            <Grid item xs={12} md={12}>
              <TextField
                required
                fullWidth
                id="firstname"
                label="Vorname"
                name="firstname"
                autoComplete="firstname"
                inputRef={firstnameRef}
                defaultValue={item.firstname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="secondname"
                label="Nachname"
                name="secondname"
                autoComplete="secondname"
                inputRef={secondnameRef}
                defaultValue={item.secondname}
              />
            </Grid>
          </>
        ))}
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

        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          <IconButton color="third" href="/update-email">
            <EmailIcon style={{marginRight: "10px"}}/> 
            <Typography>E-Mail ändern</Typography>
          </IconButton>
        </Grid>
        <Grid item xs={12} md={6}>
        <IconButton color="third" href="/update-password">
            <KeyIcon style={{marginRight: "10px"}}/> 
            <Typography>Passwort ändern</Typography>
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UpdateProfile
