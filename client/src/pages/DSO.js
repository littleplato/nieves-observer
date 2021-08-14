import React from "react";
import DSOList from "../components/DSOList";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const objectTypes = [
  "Galaxies",
  "Emission Nebulae",
  "Globular Clusters",
  "Open Clusters",
  "Planetary Nebulae",
  "Supernova Remnants",
];

export default function DSO(props) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Deep Sky Objects for {new Date(props.date).toDateString()}
      </Typography>
      {objectTypes.map((object) => (
        <Button
          style={{ fontSize: "12px", fontWeight: 700 }}
          onClick={() => console.log("select object")}
        >
          {object}
        </Button>
      ))}
      <p />
      <DSOList
        objList={props.objList}
        addToScheduler={(selected) => props.addToScheduler(selected)}
      />
    </div>
  );
}
