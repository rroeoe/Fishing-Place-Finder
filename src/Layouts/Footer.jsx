import React from "react"
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <Box
    sx={{ height: "6vh", width: "100%", display: "flex", alignItems: "center", position: "fixed", bottom: "0px" }}
    bgcolor="white"
  >
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Typography
            color="#00000099"
            variant="iconList"
            fontSize="small"
          >
            © {new Date().getFullYear()} Schweizer Angelplätze (Verein) · Wir{" "}
            <FavoriteIcon
              fontSize="small"
              style={{ verticalAlign: "middle", display: "inline-flex" }}
            />{" "}
            Fische 
          </Typography>
        </Grid>
        <Grid item xs={0} md={0} lg={6} display={{ xs: 'none', md: 'block' }}>
          <Typography
            color="third.main"
            variant="iconList"
            fontSize="small"
          >
            Alle Angaben ohne Gewähr. Wir empfehlen die jeweilige verlinkte
            Seite zu besuchen.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
  )
}

export default Footer
