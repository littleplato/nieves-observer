import React from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import { useParams } from "react-router-dom";
import ObjectDetails from "../components/ObjectDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import useObject from "../hooks/useObject";
import Fade from "@material-ui/core/Fade";
import dotenv from "dotenv";
dotenv.config();

export default function Objects({ addToScheduler }) {
  const params = useParams();
  const objectParams = params.objectID;
  const [observatoryPosition] = useAtom(observatoryPositionAtom);
  const { data, isLoading } = useObject(objectParams);

  return isLoading ? (
    <Fade in={true} timeout={1000}>
      <div>
        <Typography variant="h5" gutterBottom>
          Retrieving details of your object...{" "}
        </Typography>
        <CircularProgress />
      </div>
    </Fade>
  ) : (
    <Fade in={true} timeout={1000}>
      <div>
        <ObjectDetails
          objectShow={data}
          observatoryPosition={observatoryPosition}
          addToScheduler={(data) => addToScheduler(data)}
        />
      </div>
    </Fade>
  );
}
