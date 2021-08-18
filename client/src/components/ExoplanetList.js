import React from "react";
import ExoplanetRow from "./ExoplanetRow";
import LoadingRows from "./LoadingRows";

export default function ExoplanetList() {
  return 1 + 1 === 2 ? (
    <div>
      <p />
      <LoadingRows />
      <LoadingRows />
      <LoadingRows />
    </div>
  ) : (
    <ExoplanetRow />
  );
}
