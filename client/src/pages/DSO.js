import React from "react";
import DSOList from "../components/DSOList";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const objectTypes = [
  "Galaxies",
  "Emission Nebula",
  "Globular Cluster",
  "Open Cluster",
  "Planetary Nebula",
  "Supernova Remnant",
];

export default function DSO(props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Deep Sky Objects for Tonight
      </Typography>
      {objectTypes.map((object) => (
        <Button style={{ fontSize: "13px" }}>{object}</Button>
      ))}
      <p />
      <DSOList
        objList={props.objList}
        addToScheduler={(selected) => props.addToScheduler(selected)}
      />
    </div>
  );
}
