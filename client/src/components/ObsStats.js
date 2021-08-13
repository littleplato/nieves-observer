import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import fullMoon from "../assets/fullMoon.svg";
import crescent from "../assets/crescent.svg";
import gibbous from "../assets/gibbous.svg";
import halfMoon from "../assets/halfMoon.svg";
import newMoon from "../assets/newMoon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "220px",
    height: "110px",
    marginBottom: "50px",
    padding: "15px",
  },
  drawer: {
    // display: "flex",
  },
  glow: {
    boxShadow: "0px 0px 8px #fff",
    borderRadius: "100px",
  },
}));

const currentDateOptions = {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let currentDate = new Intl.DateTimeFormat([], currentDateOptions);

const currentTimeOptions = {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
let currentTime = new Intl.DateTimeFormat([], currentTimeOptions);

const moonLumination = 90;

export default function ObsStats() {
  const classes = useStyles();
  const [currentDateTime, setCurrentDateTime] = useState({
    date: currentDate,
    time: currentTime,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime({
        date: new Intl.DateTimeFormat([], currentDateOptions),
        time: new Intl.DateTimeFormat([], currentTimeOptions),
      });
    }, 1000);
    return () => clearInterval(timer);
  });

  const handleMoonPhase = () => {
    if (moonLumination <= 5) {
      return newMoon;
    } else if (moonLumination > 5 && moonLumination <= 40) {
      return crescent;
    } else if (moonLumination > 40 && moonLumination <= 60) {
      return halfMoon;
    } else if (moonLumination > 60 && moonLumination <= 90) {
      return gibbous;
    } else if (moonLumination > 90 && moonLumination <= 100) {
      return fullMoon;
    }
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            // className={classes.glow}
            src={handleMoonPhase()}
            alt="Full Moon"
            width="70px"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={700}>Full Moon</Typography>
          {/* <br /> */}
          <Typography variant="caption">
            Nieves Obs.
            <br />
            {currentDateTime.date.format(new Date())}
            <br />
            {currentDateTime.time.format(new Date())} AM
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
