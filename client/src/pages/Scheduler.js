import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import { Link as RouterLink } from "react-router-dom";
import SchedulerTable from "../components/SchedulerTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import dotenv from "dotenv";
dotenv.config();

export default function Scheduler(props) {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);
  const [showData, setShowData] = useState({ state: "loading" });

  useEffect(() => {
    setShowData({ state: "loading" });
    const fetchDataInScheduler = async () => {
      const infoToServer = {
        savedData: props.schedulerData,
        ...observatoryPosition,
      };
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/scheduler", {
        method: "POST",
        body: JSON.stringify(infoToServer),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("Scheduler has fetched", data);
      setShowData(data);
    };
    fetchDataInScheduler();
  }, [observatoryPosition, props.schedulerData]);

  return props.schedulerData.length < 1 ? (
    <div>
      <Typography variant="h6" gutterBottom>
        There's nothing on your schedule.
      </Typography>
      <RouterLink to="/" style={{ textDecoration: "none" }}>
        <Button variant="outlined">Browse for deep sky objects</Button>
      </RouterLink>
    </div>
  ) : showData.state === "loading" ? (
    <div>
      <Typography variant="h6" gutterBottom>
        Loading your saved objects...
      </Typography>
      <CircularProgress color="primary" />
    </div>
  ) : (
    <SchedulerTable
      showData={showData}
      updateDelete={(data) => props.updateDelete(data)}
    />
  );
}
