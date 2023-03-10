import React, { useEffect, useState } from "react";
import { useData } from "../../Services/DataContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../Services/Firestore";
import { successAlert } from "../../Components/Alerts/Alerts";
import { useAuth } from "../../Services/AuthContext";
import { getFavorites } from "../../Services/Firestore";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Rating from "@mui/material/Rating";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import DescriptionIcon from "@mui/icons-material/Description";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Details.css";
import { MapStyles, containerStyleDetails } from "../../Services/MapStyles";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Details = () => {
  const { data } = useData();
  let params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  let dataToRender = data.find((obj) => {
    return obj.name === params.name;
  });

  useEffect(() => {
    getFavorites(currentUser, setFavorites);
  }, [currentUser]);

  const fishTypes = [
    {
      De: "Barsch",
      En: "burlap",
    },
    {
      De: "Karpfen",
      En: "carp",
    },
    {
      De: "Saibling",
      En: "char",
    },
    {
      De: "Alet",
      En: "chub",
    },
    {
      De: "Egli",
      En: "egli",
    },
    {
      De: "Namaycush",
      En: "namaycush",
    },
    {
      De: "Barsch",
      En: "perch",
    },
    {
      De: "Hecht",
      En: "pike",
    },
    {
      De: "Rotauge",
      En: "roach",
    },
    {
      De: "Rotfedern",
      En: "rudd",
    },
    {
      De: "Schleie",
      En: "tench",
    },
    {
      De: "Forelle",
      En: "trout",
    },
    {
      De: "Felchen",
      En: "whitefish",
    },
    {
      De: "Weissfisch",
      En: "whitefish2",
    },
    {
      De: "Forelle",
      En: "zander",
    },
  ];

  async function handleFavoriteClick() {
    if (currentUser) {
      if (favorites.some((e) => e.fishingplace === params.name)) {
        const res = favorites.filter(
          (item) => item.fishingplace === params.name
        );
        deleteFavorite(res[0].documentId);
        successAlert("Favorit erfolgreich entfernt");
      } else {
        addFavorite(currentUser.uid, params.name, new Date());
        successAlert("Favorit erfolgreich hinzugef??gt");
      }
    } else {
      navigate("/login");
    }
  }

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: "greedy",
    styles: MapStyles,
  };

  const google = window.google;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "30px" }}>
            <Typography
              to={"/"}
              component={Link}
              style={{ textDecoration: "none" }}
              color="third.main"
            >
              ??bersicht
            </Typography>
            <Typography color="third.main">{dataToRender.name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={12}>
          <div style={{ position: "relative" }}>
            <img
              alt={dataToRender.picture}
              src={dataToRender.picture}
              className="img"
              style={{ marginTop: "20px" }}
            />
            <IconButton
              style={{
                position: "absolute",
                right: "5%",
                top: "10%",
              }}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                handleFavoriteClick();
              }}
            >
              <FavoriteIcon
                fontSize="large"
                color={dataToRender.favorite ? "primary" : ""}
                stroke="white"
              />
            </IconButton>
          </div>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="h4" style={{ marginTop: "20px" }}>
            {dataToRender.name}
          </Typography>
        </Grid>

        <Grid item xs={1} md={0.3}>
          <LocationOnIcon color="third" />
        </Grid>

        <Grid item xs={11} md={11.7}>
          <Typography color="third.main">
            {dataToRender.place + ", Kt. " + dataToRender.canton}
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="body2" color="third.main" component="div">
            <a
              href={dataToRender.name}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "#707070" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={dataToRender.averageRating}
                  precision={0.1}
                  size="medium"
                  readOnly
                  style={{ paddingRight: "10px" }}
                />
                <Typography>
                  {isNaN(dataToRender.averageRating)
                    ? "-"
                    : dataToRender.averageRating}
                </Typography>
              </div>
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider className="Divider" />
        </Grid>
        <Grid item xs={12} md={6} container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h5"
              style={{ marginTop: "10px" }}
              color="primary"
            >
              Details
            </Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Typography color="third.main">Saison:</Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <Typography color="third.main">{dataToRender.season}</Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Typography color="third.main">Tagespatent:</Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <Typography color="third.main">
              {"CHF " + dataToRender.price}
              {dataToRender.priceDetails
                ? ", " + dataToRender.priceDetails
                : ""}
            </Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Typography color="third.main">SaNa:</Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <Typography color="third.main">
              {dataToRender.sana ? "Pflicht" : "nicht notwendig"}
            </Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Typography color="third.main">Mietboot:</Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <Typography color="third.main">
              {dataToRender.boat ? "vorhanden" : "keine Mietoption"}
            </Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Typography color="third.main">Eisfischen:</Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <Typography color="third.main">
              {dataToRender.icefishing ? "m??glich" : "nicht m??glich"}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h5"
              style={{ marginTop: "10px" }}
              color="primary"
            >
              Kontakt
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="h6" color="third.main">
              {dataToRender.office.name}
            </Typography>
            <Typography variant="iconList" color="third.main">
              {dataToRender.office.address}
            </Typography>
          </Grid>

          <Grid item xs={2} md={1}>
            <LocalPhoneIcon color="third" />
          </Grid>

          <Grid item xs={10} md={11}>
            <Typography color="third.main">
              <a
                href={"tel:" + dataToRender.office.phone}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#707070" }}
              >
                {dataToRender.office.phone}
              </a>
            </Typography>
          </Grid>

          <Grid item xs={2} md={1}>
            <WebAssetIcon color="third" />
          </Grid>

          <Grid item xs={10} md={11}>
            <Typography color="third.main">
              <a
                href={dataToRender.office.website}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#707070" }}
              >
                Website
              </a>
            </Typography>
          </Grid>

          <Grid item xs={2} md={1}>
            <DescriptionIcon color="third" />
          </Grid>

          <Grid item xs={10} md={11}>
            <Typography color="third.main">
              <a
                href={dataToRender.office.rules}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#707070" }}
              >
                Reglement
              </a>
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <Divider className="Divider" />
          <Typography
            variant="h5"
            style={{ marginTop: "20px", marginBottom: "10px" }}
            color="primary"
          >
            Fische
          </Typography>
        </Grid>

        {fishTypes.map((item, index) => (
          <Grid item xs={12} md={4} align="center" key={index}>
            <img
              width="180px"
              src={require("../../Assets/" + item.En + ".png")}
              className="fish"
              alt={item.De}
            ></img>
            <Typography
              variant="iconList"
              color="secondary"
              display="block"
              sx={{ fontWeight: "medium" }}
            >
              {item.De}
            </Typography>
          </Grid>
        ))}

        {isLoaded ? (
          <Grid item xs={12} md={12} style={{ marginTop: "30px" }}>
            <GoogleMap
              mapContainerStyle={containerStyleDetails}
              center={{
                lat: dataToRender.googleLocation.latitude,
                lng: dataToRender.googleLocation.longitude,
              }}
              zoom={13}
              options={options}
            >
              <Marker
                position={{
                  lat: dataToRender.googleLocation.latitude,
                  lng: dataToRender.googleLocation.longitude,
                }}
                icon={{
                  url: require("../../Assets/Marker.png"),
                  scaledSize: new google.maps.Size(50, 50),
                }}
                label={dataToRender.name}
              ></Marker>
            </GoogleMap>
          </Grid>
        ) : null}
        <Grid item xs={12} md={12}>
          <Button
            variant="contained"
            to={"/"}
            component={Link}
            style={{ marginBottom: "80px", marginTop: "20px" }}
          >
            Zur??ck
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
