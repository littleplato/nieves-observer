import { useState } from "react";

export default function Scheduler(props) {
  const [schedulerShow, setSchedulerShow] = useState(props.schedulerData);

  return schedulerShow.length > 0
    ? schedulerShow.map((item, i) => item.name)
    : "There's nothing on your schedule.";
}
