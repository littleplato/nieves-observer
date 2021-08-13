import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  delete: {
    marginBottom: 15,
  },
}));

const columns = [
  { field: "id", headerName: "Object", width: 100, sortable: false },
  {
    field: "type",
    headerName: "Type",
    width: 130,
  },
  {
    field: "ra",
    headerName: "RA",
    width: 120,
    sortable: false,
  },
  {
    field: "dec",
    headerName: "Dec",
    width: 120,
    sortable: false,
  },
  {
    field: "mag",
    headerName: "Mag",
    // type: "number",
    width: 120,
  },
  {
    field: "comments",
    headerName: "Notes",
    // type: "number",
    width: 200,
    editable: true,
  },
];

export default function SchedulerTable(props) {
  const classes = useStyles();
  const rows = props.schedulerData.map((dso, i) => ({
    id: dso.name,
    type: dso.type,
    ra: dso.ra,
    dec: dso.dec,
    mag: dso.mag,
    comments: "Your notes here",
  }));

  return (
    <>
      <Button variant="outlined" className={classes.delete}>
        Delete
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
