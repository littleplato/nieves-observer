import React, { useState } from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import Button from "@material-ui/core/Button";
import LoadingRows from "../components/LoadingRows";
import DSORow from "../components/DSORow";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import useLanding from "../hooks/useLanding";
import useDSOFilter from "../hooks/useDSOFilter";
import dotenv from "dotenv";
dotenv.config();

const objectTypes = {
  galaxies: "Galaxy",
  "emission nebulae": "Emission nebula",
  "planetary nebulae": "Planetary nebula",
  "globular clusters": "Globular cluster",
  "open clusters": "Open cluster",
  asterisms: "Asterism",
};

const pageRender = (data, isLoading, isError, props) => {
  return (
    <div>
      {isLoading ? (
        <Fade in={true} timeout={1000}>
          <div>
            <LoadingRows />
            <LoadingRows />
            <LoadingRows />
          </div>
        </Fade>
      ) : (
        <Fade in={true} timeout={1000}>
          <div>
            {data.map((dso, i) => (
              <DSORow
                dso={dso}
                key={i}
                addToScheduler={(selected) => props.addToScheduler(selected)}
              />
            ))}
          </div>
        </Fade>
      )}
    </div>
  );
};

function QueryLanding(props) {
  const { data, isLoading, isError } = useLanding();

  return pageRender(data, isLoading, isError, props);
}

function QueryFilter(props) {
  const { data, isLoading } = useDSOFilter(props.selectedType);

  return (
    <div>
      {isLoading ? (
        <Fade in={true} timeout={1000}>
          <div>
            <LoadingRows />
            <LoadingRows />
            <LoadingRows />
          </div>
        </Fade>
      ) : (
        <Fade in={true} timeout={1000}>
          <div>
            {data.map((dso, i) => (
              <DSORow
                dso={dso}
                key={i}
                addToScheduler={(selected) => props.addToScheduler(selected)}
              />
            ))}
          </div>
        </Fade>
      )}
    </div>
  );
}

export default function DSO(props) {
  const [filterDSO, setFilterDSO] = useState(null);
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const handleFilter = (e) => {
    console.log("filtering for", objectTypes[e.target.lastChild.data]);
    setFilterDSO(objectTypes[e.target.lastChild.data]);
  };

  let dateToday = new Date(observatoryPosition.date).toDateString();
  if (Number.isNaN(dateToday)) {
    let arr = observatoryPosition.date.split(/[- :]/);
    dateToday = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  }

  return (
    <div>
      <Fade in={true} timeout={1000}>
        <Typography variant="h4" gutterBottom>
          Deep Sky Objects for{" "}
          {/* {new Date(observatoryPosition.date).toDateString()} */}
          {dateToday}
        </Typography>
      </Fade>
      <Fade in={true} timeout={1000}>
        <div>
          {Object.keys(objectTypes).map((object, i) => (
            <Button
              style={{ fontSize: "12px", fontWeight: 700 }}
              onClick={handleFilter}
              key={i}
            >
              {object}
            </Button>
          ))}
        </div>
      </Fade>
      <p />
      {filterDSO === null ? (
        <QueryLanding
          addToScheduler={(selected) => props.addToScheduler(selected)}
        />
      ) : (
        <QueryFilter
          selectedType={filterDSO}
          addToScheduler={(selected) => props.addToScheduler(selected)}
        />
      )}
    </div>
  );
}
