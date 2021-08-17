import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import SchedulerTable from "../components/SchedulerTable";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Scheduler(props) {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);
  const [showData, setShowData] = useState({ state: "loading" });

  useEffect(() => {
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
    "There's nothing on your schedule."
  ) : showData.state === "loading" ? (
    <CircularProgress color="primary" />
  ) : (
    <SchedulerTable
      showData={showData}
      updateDelete={(data) => props.updateDelete(data)}
    />
  );
}
