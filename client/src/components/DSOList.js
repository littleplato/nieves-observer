import React from "react";
import DSORow from "./DSORow";
import LoadingRows from "../components/LoadingRows";

export default function DSOList(props) {
  const mapData = props.dsoData;

  return props.dsoData.state === "loading" ? (
    <div>
      <LoadingRows />
      <LoadingRows />
      <LoadingRows />
    </div>
  ) : (
    mapData?.map((dso, i) => (
      <DSORow
        dso={dso}
        key={i}
        addToScheduler={(selected) => props.addToScheduler(selected)}
      />
    ))
  );
}
