import React, { useState } from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import { useQuery } from "react-query";
import Button from "@material-ui/core/Button";
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

export default function QueryTest() {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);
  const [filterDSO, setFilterDSO] = useState("all");

  const fetchDSO = async () => {
    console.log(observatoryPosition);
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/query/${filterDSO}`,
      {
        method: "POST",
        body: JSON.stringify(observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  const { data, isLoading } = useQuery("dso", fetchDSO, {
    staleTime: 2000,
    cacheTime: 10,
    onSuccess: () => console.log("data fetched for DSO"),
  });

  const handleFilter = (e) => {
    const selectedType = objectTypes[e.target.lastChild.data];
    setFilterDSO(selectedType);
    console.log(selectedType);
    // fetchFilterDSO(selectedType);
    fetchDSO();
  };

  return (
    <div>
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
      Loading? {JSON.stringify(isLoading)}
      <br />
      {JSON.stringify(data)}
    </div>
  );
}
