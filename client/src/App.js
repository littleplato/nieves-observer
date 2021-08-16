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
  const [objList, setObjList] = useState({ state: "loading" });
  const existingSchedulerData =
    JSON.parse(localStorage.getItem("savedSchedule")) ?? [];
  const [schedulerData, setSchedulerData] = useState(existingSchedulerData);
  const [searchResults, setSearchResults] = useState([]);

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
    localStorage.setItem(
      "savedSchedule",
      JSON.stringify([...schedulerData, data])
    );
  };

  const handleFilter = (selectedType) => {
    setObjList({ state: "loading" });
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

  const updateDelete = (data) => {
    setSchedulerData(data);
    localStorage.clear();
    localStorage.setItem("savedSchedule", JSON.stringify(data));
  };

  const handleSearch = (searchTerm) => {
    const fetchSearchResults = async () => {
      const res = await fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        body: JSON.stringify({ search: searchTerm }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const searchData = await res.json();
      console.log(searchData);
      setSearchResults(searchData);
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
              objList={objList}
              sendObjList={(data) => setObjList(data)}
              addToScheduler={addToScheduler}
              observatoryPosition={observatoryPosition}
              handleFilter={handleFilter}
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
            <SearchResults searchResults={searchResults} />
          </Route>
          <Route path="/object/:objectID">
            <Objects observatoryPosition={observatoryPosition} />
          </Route>
        </Switch>
      </SideNav>
    </ThemeProvider>
  );
}

export default App;
