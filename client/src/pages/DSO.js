import React from "react";
import DSOList from "../components/DSOList";

export default function DSO(props) {
  return (
    <div>
      <DSOList objList={props.objList} />
    </div>
  );
}
