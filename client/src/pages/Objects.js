import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import { useParams } from "react-router-dom";
import ObjectDetails from "../components/ObjectDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import dotenv from "dotenv";
dotenv.config();

export default function Objects({ addToScheduler }) {
  const params = useParams();
  const [objectShow, setObjectShow] = useState(null);
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  useEffect(() => {
    // setObjectShow(null);
    const objectParams = params.objectID;
    const fetchObjectDetails = async () => {
      const res = await fetch(`${process.env.SERVER_URL}/dso/${objectParams}`, {
        method: "POST",
        body: JSON.stringify(observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const objectData = await res.json();
      console.log("fetched individual object data", objectData);
      setObjectShow(objectData);
    };
    fetchObjectDetails();
  }, [observatoryPosition, params.objectID]);

  return objectShow === null ? (
    <>
      <Typography variant="h5" gutterBottom>
        Retrieving details of your object...{" "}
      </Typography>
      <CircularProgress />
    </>
  ) : (
    <ObjectDetails
      objectShow={objectShow}
      observatoryPosition={observatoryPosition}
      addToScheduler={(data) => addToScheduler(data)}
    />
  );
}
