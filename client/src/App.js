import { useState } from "react";
import { atom, useAtom } from "jotai";
import { Route, Switch, useHistory } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import SideNav from "./components/SideNav";
import Scheduler from "./pages/Scheduler";
import Exoplanets from "./pages/Exoplanets";
import EclipsingBinaries from "./pages/EclipsingBinaries";
import DSO from "./pages/DSO";
import Objects from "./pages/Objects";
import SearchResults from "./pages/SearchResults";
import dotenv from "dotenv";
dotenv.config();

const defaultPosition = {
  date: new Date().toISOString().slice(0, 10) + " 07:00:00",
  longitude: "33.5573234",
  latitude: "-117.7362203",
};

export const darkModeAtom = atom(true);
export const observatoryPositionAtom = atom(defaultPosition);

function App() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const history = useHistory();
  const [observatoryPosition, setObservatoryPosition] = useAtom(
    observatoryPositionAtom
  );
  const existingSchedulerData =
    JSON.parse(localStorage.getItem("savedSchedule")) ?? [];
  const [schedulerData, setSchedulerData] = useState(existingSchedulerData);
  const [searchResults, setSearchResults] = useState({ state: "loading" });
  const [searchTerm, setSearchTerm] = useState();

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

  const locationSelection = (locationData) => {
    setObservatoryPosition({ ...observatoryPosition, ...locationData });
  };

  const dateSelection = (dateData) => {
    setObservatoryPosition({ ...observatoryPosition, date: dateData });
  };

  const addToScheduler = (data) => {
    console.log("Scheduler now consists of", [...schedulerData, data]);
    setSchedulerData([...schedulerData, data]);
    localStorage.setItem(
      "savedSchedule",
      JSON.stringify([...schedulerData, data])
    );
  };

  const updateDelete = (data) => {
    setSchedulerData(data);
    localStorage.clear();
    localStorage.setItem("savedSchedule", JSON.stringify(data));
  };

  const handleSearch = (searchInput) => {
    setSearchResults({ state: "loading" });
    const fetchSearchResults = async () => {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/search", {
        method: "POST",
        body: JSON.stringify({ search: searchInput }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const searchData = await res.json();
      console.log("Sever has yielded for", searchInput, searchData);
      setSearchResults(searchData);
      setSearchTerm(searchInput);
    };
    fetchSearchResults();
    history.push("/search");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SideNav
        darkMode={darkMode}
        selectMode={(mode) => setDarkMode(mode)}
        locationSelection={locationSelection}
        dateSelection={dateSelection}
        handleSearch={handleSearch}
      >
        <Switch>
          <Route exact path="/">
            <DSO
              addToScheduler={addToScheduler}
              observatoryPosition={observatoryPosition}
            />
          </Route>
          <Route path="/scheduler">
            <Scheduler
              schedulerData={schedulerData}
              updateDelete={updateDelete}
            />
          </Route>
          <Route path="/exoplanets">
            <Exoplanets />
          </Route>
          <Route path="/eclipsingbinaries">
            <EclipsingBinaries />
          </Route>
          <Route path="/search">
            <SearchResults
              searchResults={searchResults}
              searchTerm={searchTerm}
              addToScheduler={addToScheduler}
            />
          </Route>
          <Route path="/object/:objectID">
            <Objects
              observatoryPosition={observatoryPosition}
              addToScheduler={addToScheduler}
            />
          </Route>
        </Switch>
      </SideNav>
    </ThemeProvider>
  );
}

export default App;
