import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ObjectDetails from "../components/ObjectDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export default function Objects({ observatoryPosition, addToScheduler }) {
  const params = useParams();
  const [objectShow, setObjectShow] = useState(null);

  useEffect(() => {
    const objectParams = params.objectID;
    const fetchObjectDetails = async () => {
      const res = await fetch(`http://127.0.0.1:5000/dso/${objectParams}`, {
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
    // eslint-disable-next-line
  }, []);

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
