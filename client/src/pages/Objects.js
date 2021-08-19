import React from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import { useParams } from "react-router-dom";
import ObjectDetails from "../components/ObjectDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import useObject from "../hooks/useObject";
import dotenv from "dotenv";
dotenv.config();

export default function Objects({ addToScheduler }) {
  const params = useParams();
  const objectParams = params.objectID;
  const [observatoryPosition] = useAtom(observatoryPositionAtom);
  const { data, isLoading } = useObject(objectParams);

  return isLoading ? (
    <>
      <Typography variant="h5" gutterBottom>
        Retrieving details of your object...{" "}
      </Typography>
      <CircularProgress />
    </>
  ) : (
    <ObjectDetails
      objectShow={data}
      observatoryPosition={observatoryPosition}
      addToScheduler={(data) => addToScheduler(data)}
    />
  );
}
