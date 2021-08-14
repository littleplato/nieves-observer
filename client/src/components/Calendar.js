import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const today = new Date().toISOString().slice(0, 10);

export default function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (date) => {
    setSelectedDate(`${date.toISOString().slice(0, 10)} 07:00:00`);
    props.dateSelection(`${date.toISOString().slice(0, 10)} 07:00:00`);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          autoOk={true}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
