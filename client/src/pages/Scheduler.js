import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import SchedulerTable from "../components/SchedulerTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
      const res = await fetch("http://127.0.0.1:5000/scheduler", {
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
      <Button variant="outlined">Browse for deep sky objects</Button>
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
