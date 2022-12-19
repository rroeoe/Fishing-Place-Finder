import { ThemeProvider, createTheme } from "@mui/material/styles";

export const font = "'Inter', sans-serif;";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#007482",
    },
    secondary: {
      main: "#FE824D",
    },
    third: {
      main: "#00000099",
    },
    fourth: {
      main: "#666666",
    },
  },
  typography: {
    fontFamily: font,
    iconList: {
      fontSize: 16,
      fontFamily: font,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontSize: 24,
    },
    h6: {
      fontSize: 18,
    },
  },
});
