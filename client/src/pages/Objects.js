import React from "react";
import ObjectDetails from "../components/ObjectDetails";

export default function Objects({ observatoryPosition }) {
  return (
    <div>
      <ObjectDetails observatoryPosition={observatoryPosition} />
    </div>
  );
}
