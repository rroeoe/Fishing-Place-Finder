import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import {
  getDataOfCurrentUser,
  } from "../../Services/Firestore";
import { upload } from "../../Services/Storage"
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from '@mui/icons-material/Settings';
import { errorAlert, successAlert } from "../../Components/Alerts/Alerts";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [dataOfCurrentUser, setDataOfCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("Hier klicken");
  const navigate = useNavigate();
  const MAX_FILESIZE = 5120

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
      successAlert("Erfolgreich ausgeloggt")
    } catch {
      errorAlert("Das Logout hat nicht funktioniert")
    }
  }


  async function handleImageUploadChange(event) {
    if (event.target.files[0].size / 1024 < MAX_FILESIZE) {
      await upload(event.target.files[0], currentUser, setLoading);
      window.location.reload(false);
      } else {
      errorAlert("Die Datei darf die maximale Grösse von 5 MB nicht überschreiten")
    }
  }

  useEffect(() => {
    getDataOfCurrentUser(currentUser.uid, setDataOfCurrentUser)
    setPhotoUrl(currentUser.photoURL)
  }, [])


  return (
    <div>
      <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "30px" }}>
            <Typography
              to={"/"}
              component={Link}
              style={{ textDecoration: "none" }}
              color="#707070"
            >
              Übersicht
            </Typography>
            <Typography color="#707070">Mein Profil</Typography>
          </Breadcrumbs>
        </Grid>
        {dataOfCurrentUser.map((item) => (
          <Grid item xs={12} md={12} key={1}>
            <Typography variant="h4">Hallo {item.firstname}</Typography>
          </Grid>
        ))}
        <Grid item xs={12} md={12} align="center">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            style={{ position: "relative" }}
          >
            <Avatar
              alt="firstname"
              src={photoUrl || "/static/images/avatar/1.jpg"}
              sx={{ width: 200, height: 200, position: "relative" }}
            > <Typography variant="body1">Profilbild ändern</Typography>
            </Avatar>
            <input
              hidden
              type="file"
              onChange={handleImageUploadChange}
              accept="image/png, image/jpeg"
            ></input>
          </IconButton>
        </Grid>
        <Grid item xs={12} md={12}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <IconButton href="/update-profile">
              <SettingsIcon />
            </IconButton>
            <Typography color="third.main">Profileinstellungen</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <Typography variant="h5" color="primary">
            Meine Bewertungen
          </Typography>
        </Grid>
        {reviewsOfCurrentUser.map((item) => (
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              {item.fishingplace}
              </Typography>
              <Typography variant="body2" color="third.main">
              {new Date(item.createdAt.toDate())
                .toLocaleString("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .slice(0, 10)}
            </Typography>
            <Rating
              name="half-rating"
              value={item.rating}
              precision={1}
              defaultValue={0}
              readOnly
              size="small"
              key={}
            />
            <Typography variant="body1" color="third.main">{item.comment}</Typography>
          </Grid>
        ))}
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid> */}
        <Grid item xs={12} md={12}>
        <Stack direction="row" justifyContent="end">
          <Button variant="contained" onClick={handleLogout} style={{marginBottom: "5%"}}>
            Log out
          </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

export default Profile
