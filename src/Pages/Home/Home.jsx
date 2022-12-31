import { Typography } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import Cards from "../../Components/Cards/Cards";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useData } from "../../Services/DataContext";
import SwitchButton from "../../Components/SwitchButton/SwitchButton";
import MapIcon from "@mui/icons-material/Map";
import Filters from "../../Components/Filters/Filters";
import {
  searchFilterFunction,
  popularFilterFunction,
  sanaFilterFunction,
  boatFilterFunction,
  cantonFilterFunction,
} from "../../Components/Filters/Filters";

const Home = () => {
  const { data } = useData();
  const [dataToRender, setDataToRender] = useState([]);
  const [filter, setFilter] = useState({
    searchFilter: "",
    popularFilter: false,
    sanaFilter: false,
    boatFilter: false,
    cantonFilter: [],
  });

  const filteredResult = useMemo(() => {
    let result = data;
    result = searchFilterFunction(result, filter);
    result = popularFilterFunction(result, filter);
    result = sanaFilterFunction(result, filter);
    result = boatFilterFunction(result, filter);
    result = cantonFilterFunction(result, filter);
    return result;
  }, [filter, data]);

  useEffect(() => {
    setDataToRender(filteredResult);
  }, [filteredResult]);

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2} style={{ marginTop: "5%", marginBottom: "10%" }}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" component="h1">
            Übersicht
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Filters filterState={[filter, setFilter]} />
        </Grid>
        {dataToRender.map((item) => (
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
        ))}
      </Grid>
      <Grid item xs={12} md={12} style={{marginTop:"3vh"}}>
        {dataToRender.length == 0 ? (
          <Typography variant="body1">keine Ergebnisse</Typography>
        ) : (
          <></>
        )}
      </Grid>
      <SwitchButton
        icon={<MapIcon sx={{ mr: 1 }} />}
        navigate="/map"
        text="Karte anzeigen"
      />
    </Container>
  );
};

export default Home;
