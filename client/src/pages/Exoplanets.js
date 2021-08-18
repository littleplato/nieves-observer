import React from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import Typography from "@material-ui/core/Typography";
import ExoplanetList from "../components/ExoplanetList";

export default function Exoplanets() {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);
  const observatory =
    observatoryPosition.longitude === "33.5573234"
      ? "the Nieves Observatory"
      : "LCRO";

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Upcoming Exoplanet Transits
      </Typography>
      <Typography>Transits observable from {observatory}</Typography>
      <ExoplanetList />
    </div>
  );
}
