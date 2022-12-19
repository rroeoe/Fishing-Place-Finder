import React from "react";
import Cards from "../../Components/Cards/Cards";
import { useData } from "../../Services/DataContext";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const Favorites = () => {
  const { data } = useData();

  const favorites = data.filter((item) => item.favorite == true);

  return (
    <div>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" component="h1">
              Meine Favoriten
            </Typography>
          </Grid>
          {favorites.length == 0 ? (
            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h1">
                Keine Favoriten
              </Typography>
            </Grid>
          ) : (
            favorites.map((item) => (
              <Cards
                key={item.documentId}
                name={item.name}
                place={item.place}
                image={item.picture}
                canton={item.canton}
                sana={item.sana}
                popular={item.popular}
                favorite={item.favorite}
                averageRating={item.averageRating}
                maxWidth={372}
                height={272}
              />
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Favorites;
