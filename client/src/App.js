import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Calendar from "./components/Calendar";
import Location from "./components/Location";
import DSOList from "./components/DSOList";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [observatoryPosition, setObservatoryPosition] = useState({
    date: new Date().toISOString().slice(0, 10),
    longitude: "33.5573234",
    latitude: "-117.7362203",
  });
  const [objList, setObjList] = useState({ state: "loading" });
  const [plotData, setPlotData] = useState({ state: "loading" });

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

  useEffect(() => {
    const fetchDSO = async () => {
      const res = await fetch("https://obsplanner.herokuapp.com/dso", {
        method: "POST",
        body: JSON.stringify(observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setPlotData(JSON.parse(data[0].plot.replaceAll("'", '"')));
      setObjList(data);
    };
    fetchDSO();
    // eslint-disable-next-line
  }, []);

  const positionUpdate = (newObservatoryPosition) => {
    const refetchDSO = async () => {
      const res = await fetch("https://obsplanner.herokuapp.com/dso", {
        method: "POST",
        body: JSON.stringify(newObservatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setPlotData(JSON.parse(data[0].plot.replaceAll("'", '"')));
      setObjList(data);
    };
    refetchDSO();
  };

  const locationSelection = (locationData) => {
    const newObservatoryPosition = {
      ...observatoryPosition,
      ...locationData,
    };
    setObservatoryPosition({ ...observatoryPosition, ...locationData });
    console.log("new position settings", {
      ...observatoryPosition,
      ...locationData,
    });
    positionUpdate(newObservatoryPosition);
  };

  const dateSelection = (dateData) => {
    const newObservatoryPosition = {
      ...observatoryPosition,
      ...dateData,
    };
    setObservatoryPosition({ ...observatoryPosition, date: dateData });
    console.log("new position settings", {
      ...observatoryPosition,
      date: dateData,
    });
    positionUpdate(newObservatoryPosition);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h1">Nieves Observation Planner</Typography>
        <Tooltip title="Toggle light/dark mode">
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode === true ? <WbSunnyIcon /> : <NightsStayIcon />}
          </IconButton>
        </Tooltip>
        <Location locationSelection={locationSelection} />
        <Calendar dateSelection={dateSelection} />
        <DSOList objList={objList} plotData={plotData} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
