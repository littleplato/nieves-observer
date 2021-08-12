import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 225,
  },
}));

const observatoryLocations = {
  NO: {
    longitude: "33.5573234",
    latitude: "-117.7362203",
  },
  LCRO: {
    longitude: "-70.6930943",
    latitude: "-29.0180789",
  },
};

export default function Location(props) {
  const classes = useStyles();
  const [location, setLocation] = useState("NO");

  const handleChange = (event) => {
    setLocation(event.target.value);
    props.locationSelection(
      event.target.value === "LCRO"
        ? observatoryLocations.LCRO
        : observatoryLocations.NO
    );
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Select Observatory</InputLabel>
        <Select value={location} onChange={handleChange}>
          <MenuItem value={"NO"}>Nieves Observatory</MenuItem>
          <MenuItem value={"LCRO"}>LCRO</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
