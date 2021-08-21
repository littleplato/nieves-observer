import React from "react";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import ExoplanetRow from "./ExoplanetRow";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import dotenv from "dotenv";
dotenv.config();

export default function ExoplanetList() {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const getExoplanets = async () => {
    console.log("fetching exoplanets");
    const res = await fetch(`${process.env.REACT_APP_EXOPLANET}/exoplanets`, {
      method: "POST",
      body: JSON.stringify(observatoryPosition),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  const { data, isLoading } = useQuery(
    ["exoplanets", observatoryPosition],
    getExoplanets
  );

  return isLoading ? (
    <div>
      <Typography gutterBottom>
        As it is computationally intensive to calculate the viewability of
        transits, it may take up to a minute for the server to return the
        results.
        <br />
      </Typography>
      <CircularProgress />
    </div>
  ) : (
    data.map((exoplanet) => (
      <ExoplanetRow exoplanet={exoplanet} key={exoplanet.id} />
    ))
  );
}
