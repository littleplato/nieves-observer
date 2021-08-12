import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Calendar from "./components/Calendar";
import Location from "./components/Location";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [observatoryPosition, setObservatoryPosition] = useState({
    date: "2021-08-11 00:00:00",
    longitude: "33.5573234",
    latitude: "-117.7362203",
  });

  const theme = createTheme({
    palette: {
      type: darkMode === true ? "dark" : "light",
      primary: { main: darkMode === true ? "#90a4ae" : "#455a64" },
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
        <Location locationSelection={(data) => console.log(data)} />
        <Calendar
          dateSelection={(data) =>
            setObservatoryPosition({ ...observatoryPosition, time: data })
          }
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
