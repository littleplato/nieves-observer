import React from "react";
import DSOList from "../components/DSOList";

export default function DSO(props) {
  return (
    <div>
      <DSOList
        objList={props.objList}
        addToScheduler={(selected) => props.addToScheduler(selected)}
      />
    </div>
  );
}
