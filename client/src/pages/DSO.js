import React from "react";
import DSOList from "../components/DSOList";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const objectTypes = {
  galaxies: "Galaxy",
  "emission nebulae": "Emission nebula",
  "globular clusters": "Globular cluster",
  "open clusters": "Open cluster",
  "planetary nebulae": "Planetary nebula",
  "supernova remnants": "Supernova remnant",
};

export default function DSO(props) {
  const handleFilter = (e) => {
    const selectedType = objectTypes[e.target.lastChild.data];
    console.log(selectedType);
    props.handleFilter(selectedType);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Deep Sky Objects for {new Date(props.date).toDateString()}
      </Typography>
      {Object.keys(objectTypes).map((object, i) => (
        <Button
          style={{ fontSize: "12px", fontWeight: 700 }}
          onClick={handleFilter}
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
