import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

//Search filter
export const searchFilterFunction = (array, filter) => {
  if (filter.searchFilter === "") return array;
  return array.filter((item) =>
    item.name.toLowerCase().includes(filter.searchFilter.toLowerCase())
  );
};

//Popular filter
export const popularFilterFunction = (array, filter) => {
  if (filter.popularFilter === false) return array;
  return array.filter((item) => item.popular == true);
};

//SANA filter
export const sanaFilterFunction = (array, filter) => {
  if (filter.sanaFilter === false) return array;
  return array.filter((item) => item.sana == false);
};

//Boat filter
export const boatFilterFunction = (array, filter) => {
  if (filter.boatFilter === false) return array;
  return array.filter((item) => item.boatRental == true);
};

//Canton filter
export const cantonFilterFunction = (array, filter) => {
  if (filter.cantonFilter.length === 0) {
    return array;
  } else {
    return array.filter((item) =>
      filter.cantonFilter.includes(item.cantonShort)
    );
  }
};

const Filters = (props) => {
  const [filter, setFilter] = props.filterState;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const cantons = ["OW", "BE", "SG", "SZ", "UR", "TG", "AI"];

  //Handling add and delete cantons in the cantonFilter
  const handleChipClick = (event) => {
    if (filter.cantonFilter.includes(event.target.innerText)) {
      setFilter((prevValues) => ({
        ...prevValues,
        cantonFilter: filter.cantonFilter.filter(
          (e) => e !== event.target.innerText
        ),
      }));
    } else {
      setFilter((prevValues) => ({
        ...prevValues,
        cantonFilter: [...filter.cantonFilter, event.target.innerText],
      }));
    }
  };

  //Handling activeness of canton filter (variant filled grey)
  const handleActiveness = () => {
    if (filter.cantonFilter.length === 0) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Suche..."
            variant="outlined"
            onChange={(event) =>
              setFilter((prevValues) => ({
                ...prevValues,
                searchFilter: event.target.value,
              }))
            }
            style={{ width: "100%" }}
            className="searchField"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant={"contained"} onClick={() => setOpen(!open)}>
            Filter
          </Button>
        </Grid>
        <Dialog open={open}>
          <DialogTitle>Filter</DialogTitle>
          <DialogContent>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.popularFilter}
                    onClick={() =>
                      setFilter((prevValues) => ({
                        ...prevValues,
                        popularFilter: !filter.popularFilter,
                      }))
                    }
                  />
                }
                label="beliebte Angelplätze"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.sanaFilter}
                    onClick={() =>
                      setFilter((prevValues) => ({
                        ...prevValues,
                        sanaFilter: !filter.sanaFilter,
                      }))
                    }
                  />
                }
                label="Angelplätze ohne SaNa-Pflicht"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.boatFilter}
                    onClick={() =>
                      setFilter((prevValues) => ({
                        ...prevValues,
                        boatFilter: !filter.boatFilter,
                      }))
                    }
                  />
                }
                label="Mietboot möglich"
              />
            </FormGroup>
            <Divider style={{ paddingTop: "2vh" }} />
            <Typography variant="h6" style={{ paddingTop: "2vh" }}>
              Kantone
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                pt: 2
              }}
            >
              {cantons.map((cantonExpression, index) => (
                <Chip
                  key={index}
                  label={cantonExpression}
                  variant={
                    filter.cantonFilter.includes(cantonExpression)
                      ? "filled"
                      : "outlined"
                  }
                  onClick={(event) => handleChipClick(event)}
                  style={{ margin: "5px" }}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                handleActiveness();
              }}
            >
              Schliessen
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Filters;
