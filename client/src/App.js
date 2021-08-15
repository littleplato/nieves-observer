import { useState, useEffect, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import SideNav from "./components/SideNav";
import Scheduler from "./pages/Scheduler";
import Exoplanets from "./pages/Exoplanets";
import EclipsingBinaries from "./pages/EclipsingBinaries";
import DSO from "./pages/DSO";
import Objects from "./pages/Objects";

const defaultPosition = {
  date: new Date().toISOString().slice(0, 10) + " 07:00:00",
  longitude: "33.5573234",
  latitude: "-117.7362203",
};

export const DarkModeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [observatoryPosition, setObservatoryPosition] =
    useState(defaultPosition);
  const [objList, setObjList] = useState({ state: "loading" });
  const [schedulerData, setSchedulerData] = useState([]);

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90a4ae" : "#455a64" },
    },
    typography: {
      fontFamily: "Quicksand",
      h1: {
        fontSize: 30,
        fontWeight: 500,
      },
    },
  });

  useEffect(() => {
    const fetchDSO = async () => {
      const res = await fetch("http://127.0.0.1:5000/dso", {
        method: "POST",
        body: JSON.stringify(observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setObjList(data);
    };
    fetchDSO();
    // eslint-disable-next-line
  }, []);

  const positionUpdate = (newObservatoryPosition) => {
    const refetchDSO = async () => {
      const res = await fetch("http://127.0.0.1:5000/dso", {
        method: "POST",
        body: JSON.stringify(newObservatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
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
    positionUpdate(newObservatoryPosition);
    setObjList({ state: "loading" });
  };

  const dateSelection = (dateData) => {
    const newObservatoryPosition = {
      ...observatoryPosition,
      ...dateData,
    };
    setObservatoryPosition({ ...observatoryPosition, date: dateData });
    positionUpdate(newObservatoryPosition);
    setObjList({ state: "loading" });
  };

  const addToScheduler = (data) => {
    console.log("this goes down:", [...schedulerData, data]);
    setSchedulerData([...schedulerData, data]);
    // localStorage.setItem("savedSchedule", )
  };

  const handleFilter = (selectedType) => {
    const refetchFilteredDSO = async () => {
      const res = await fetch("http://127.0.0.1:5000/dso/filter", {
        method: "POST",
        body: JSON.stringify({
          ...observatoryPosition,
          dso_type: selectedType,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setObjList(data);
    };
    refetchFilteredDSO();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SideNav
        darkMode={darkMode}
        selectMode={(mode) => setDarkMode(mode)}
        locationSelection={locationSelection}
        dateSelection={dateSelection}
      >
        <DarkModeContext.Provider value={darkMode}>
          <Switch>
            <Route exact path="/">
              <DSO
                objList={objList}
                addToScheduler={addToScheduler}
                date={observatoryPosition.date}
                handleFilter={handleFilter}
              />
            </Route>
            <Route path="/scheduler">
              <Scheduler schedulerData={schedulerData} />
            </Route>
            <Route path="/exoplanets">
              <Exoplanets />
            </Route>
            <Route path="/eclipsingbinaries">
              <EclipsingBinaries />
            </Route>
            <Route path="/object/:objectID">
              <Objects observatoryPosition={observatoryPosition} />
            </Route>
          </Switch>
        </DarkModeContext.Provider>
      </SideNav>
    </ThemeProvider>
  );
}

export default App;
