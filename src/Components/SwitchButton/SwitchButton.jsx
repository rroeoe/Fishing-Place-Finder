import React from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const SwitchButton = (props) => {
  const navigate = useNavigate();

  const fabStyle = {
    bottom: "10%",
    padding: "10px",
    position: "fixed",
    zIndex: 100,
  };

  return (
    <Grid item xs={12} md={12}>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          sx={{
            left: { xs: "20%", md: "43%" },
            right: { xs: "20%", md: "43%" },
          }}
          style={fabStyle}
          onClick={() => navigate(props.navigate)}
        >
          {props.icon}
          {props.text}
        </Fab>
      </Box>
    </Grid>
  );
};

export default SwitchButton;
