import React, { useEffect } from "react";
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
  useEffect(() => {
    const fetchDSO = async () => {
      const res = await fetch("http://127.0.0.1:5000/dso", {
        method: "POST",
        body: JSON.stringify(props.observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      props.sendObjList(data);
    };
    fetchDSO();
    // eslint-disable-next-line
  }, []);

  const handleFilter = (e) => {
    const selectedType = objectTypes[e.target.lastChild.data];
    console.log(selectedType);
    props.handleFilter(selectedType);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Deep Sky Objects for{" "}
        {new Date(props.observatoryPosition?.date).toDateString()}
      </Typography>
      {Object.keys(objectTypes).map((object, i) => (
        <Button
          style={{ fontSize: "12px", fontWeight: 700 }}
          onClick={handleFilter}
          key={i}
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
