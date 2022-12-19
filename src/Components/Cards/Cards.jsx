import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";
import { db } from "../../Services/Firebase";
import { addFavorite, getFavorites, getFishingplaces } from "../../Services/Firestore";
import { deleteFavorite } from "../../Services/Firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { successAlert, errorAlert } from "../Alerts/Alerts";


const Cards = (props) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([])


  useEffect(() => {
    getFavorites(currentUser, setFavorites)
  }, [])

  async function handleFavoriteClick() {
    if(currentUser){
      if (
        favorites.some((e) => e.fishingplace === props.name)
      ) {
        const res = favorites.filter(item => item.fishingplace == props.name)
        deleteFavorite(res[0].documentId)
        successAlert("Favorit erfolgreich entfernt")

       } else {
        addFavorite(currentUser.uid, props.name, new Date())
        successAlert("Favorit erfolgreich hinzugefügt")
      }
    } else {
      navigate("/login")
    }
  } 

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{
          maxWidth: props.maxWidth,
          border: "0",
          boxShadow: "0",
          borderRadius: "10px",
        }}
      >
        <CardActionArea to={`/${props.name}`} component={Link}>
        <div style={{ position: "relative" }}>
          <CardMedia
            component="img"
            height={props.height}
            image={props.image}
            alt="green iguana"
            sx={{
              borderRadius: "10px",
              opacity: "0.9",
            }}
          />
           <IconButton
              style={{
                position: "absolute",
                top: 0,
                right: "3%",
                top: "3%",
              }}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                handleFavoriteClick();
              }}
            >
              <FavoriteIcon
                fontSize="medium"
                color={props.favorite ? "primary" : ""}
                stroke="white"
              />
            </IconButton>
            {props.popular ? (
              <Chip icon={<StarIcon fontSize="small" />} color="primary" label="beliebt" style={{position: "absolute", top: "5%", left: "5%"}} />
            ) : (
              <div></div>
            )}
            </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: "0px"}}>
              {props.name}
            </Typography>
            <Typography variant="body2" color="third.main" style={{ marginBottom: "5px" }}>
              {props.place + ", Kt. " + props.canton}
            </Typography>
            <Typography variant="body2" color="third.main" component="div">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={props.averageRating}
                      precision={0.5}
                      size="small"
                      readOnly
                      style={{ color: "#ffaa01", paddingRight: "5px" }}
                    />
                    {isNaN(props.averageRating) ? "-" : props.averageRating}
                  </div>
                </Typography>
            <Typography variant="body2" color="third.main" style={{ paddingTop: "4px"}} component="div">
              {props.sana ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <ErrorOutlineIcon
                    style={{
                      fontSize: "large",
                      paddingRight: "5px",
                    }}
                  />
                  SaNa-Pflicht
                </div>
              ) : (
                <></>
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Cards;
