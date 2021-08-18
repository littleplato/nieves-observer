import React from "react";
import DSORow from "./DSORow";
import LoadingRows from "../components/LoadingRows";
import Fade from "@material-ui/core/Fade";

export default function DSOList(props) {
  const mapData = props.dsoData;

  return props.dsoData.state === "loading" ? (
    <Fade in={true} timeout={1000}>
      <div>
        <LoadingRows />
        <LoadingRows />
        <LoadingRows />
      </div>
    </Fade>
  ) : (
    <>
      {mapData.map((dso, i) => (
        <DSORow
          dso={dso}
          key={i}
          addToScheduler={(selected) => props.addToScheduler(selected)}
        />
      ))}
    </>
  );
}
