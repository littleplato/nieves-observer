import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Calendar from "./components/Calendar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      type: darkMode === true ? "dark" : "light",
    },
    typography: {
      fontFamily: "Quicksand",
      h1: {
        fontSize: 40,
        fontWeight: 500,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h1">Nieves Observation Planner</Typography>
        <IconButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode === true ? <WbSunnyIcon /> : <NightsStayIcon />}
        </IconButton>
        <Calendar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
