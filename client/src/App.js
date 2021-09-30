import { useState } from "react";
import { atom, useAtom } from "jotai";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import ResNav from "./components/ResNav";
import Scheduler from "./pages/Scheduler";
import Exoplanets from "./pages/Exoplanets";
import EclipsingBinaries from "./pages/EclipsingBinaries";
import DSO from "./pages/DSO";
import Objects from "./pages/Objects";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import useSearch from "./hooks/useSearch";
import Lost404 from "./components/Lost404";
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
  const [searchTerm, setSearchTerm] = useState();
  const { data, isLoading } = useSearch(searchTerm);

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#212121" : "#f5f5f5",
        paper: darkMode ? "#303030" : "#fafafa",
      },
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
    setSearchTerm(searchInput);
    history.push("/search");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResNav
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
          <Route exact path="/about">
            <About />
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
              searchState={isLoading}
              searchResults={data}
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
          <Route path="/404" component={Lost404} />
          <Redirect from="*" to="/404" />
        </Switch>
      </ResNav>
    </ThemeProvider>
  );
}

export default App;
