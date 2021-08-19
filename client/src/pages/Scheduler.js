import { Link as RouterLink } from "react-router-dom";
import SchedulerTable from "../components/SchedulerTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useScheduler from "../hooks/useScheduler";
import Fade from "@material-ui/core/Fade";
import dotenv from "dotenv";
dotenv.config();

export default function Scheduler(props) {
  const { data, isLoading } = useScheduler(props.schedulerData);

  return props.schedulerData.length < 1 ? (
    <div>
      <Typography variant="h6" gutterBottom>
        There's nothing on your schedule.
      </Typography>
      <RouterLink to="/" style={{ textDecoration: "none" }}>
        <Button variant="outlined">Browse for deep sky objects</Button>
      </RouterLink>
    </div>
  ) : isLoading ? (
    <Fade in={true} timeout={1000}>
      <div>
        <Typography variant="h6" gutterBottom>
          Loading your saved objects...
        </Typography>
        <CircularProgress color="primary" />
      </div>
    </Fade>
  ) : (
    <Fade in={true} timeout={1000}>
      <div>
        {/* {JSON.stringify(data)} */}
        <SchedulerTable
          showData={data}
          updateDelete={(data) => props.updateDelete(data)}
        />
      </div>
    </Fade>
  );
}
