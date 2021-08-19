import React from "react";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import ExoplanetRow from "./ExoplanetRow";
import LoadingRows from "./LoadingRows";
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
      <p />
      <LoadingRows />
      <LoadingRows />
    </div>
  ) : (
    data.map((exoplanet) => (
      <ExoplanetRow exoplanet={exoplanet} key={exoplanet.id} />
    ))
  );
}
