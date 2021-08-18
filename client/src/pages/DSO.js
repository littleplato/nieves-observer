import React, { useEffect, useState } from "react";
import DSOList from "../components/DSOList";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import Fade from "@material-ui/core/Fade";
import dotenv from "dotenv";
dotenv.config();

const objectTypes = {
  galaxies: "Galaxy",
  "emission nebulae": "Emission nebula",
  "planetary nebulae": "Planetary nebula",
  "globular clusters": "Globular cluster",
  "open clusters": "Open cluster",
  asterisms: "Asterism",
  // "supernova remnants": "Supernova remnant",
};

export default function DSO(props) {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);
  const [showDSO, setShowDSO] = useState({ state: "loading" });

  useEffect(() => {
    setShowDSO({ state: "loading" });
    const fetchDSO = async () => {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/dso", {
        method: "POST",
        body: JSON.stringify(observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("Fetching for DSO", data);
      setShowDSO(data);
    };
    fetchDSO();
  }, [observatoryPosition]);

  const handleFilter = (e) => {
    setShowDSO({ state: "loading" });
    const selectedType = objectTypes[e.target.lastChild.data];
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
      console.log(`Server has yielded for ${selectedType}`, data);
      setShowDSO(data);
    };
    refetchFilteredDSO();
  };

  return (
    <div>
      <Fade in={true} timeout={1000}>
        <Typography variant="h4" gutterBottom>
          Deep Sky Objects for{" "}
          {new Date(observatoryPosition.date).toDateString()}
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
      <DSOList
        dsoData={showDSO}
        addToScheduler={(selected) => props.addToScheduler(selected)}
      />
    </div>
  );
}
