import React from "react";
import ObjectDetails from "../components/ObjectDetails";

export default function Objects({ observatoryPosition, addToScheduler }) {
  return (
    <div>
      <ObjectDetails
        observatoryPosition={observatoryPosition}
        addToScheduler={(data) => addToScheduler(data)}
      />
    </div>
  );
}
