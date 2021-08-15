import SchedulerTable from "../components/SchedulerTable";

export default function Scheduler(props) {
  return props.schedulerData.length > 0 ? (
    <SchedulerTable
      schedulerData={props.schedulerData}
      updateDelete={(data) => props.updateDelete(data)}
    />
  ) : (
    "There's nothing on your schedule."
  );
}
