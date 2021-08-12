import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function Calendar(props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleDateChange = (date) => {
    setSelectedDate(`${date.toISOString().slice(0, 10)} 00:00:00`);
    props.dateSelection(selectedDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <Grid container justifyContent="space-around"> */}
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
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
