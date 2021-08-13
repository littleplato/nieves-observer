import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70, sortable: false },
  {
    field: "dsoName",
    headerName: "Object",
    width: 100,
    sortable: false,
  },
  {
    field: "type",
    headerName: "Type",
    width: 130,
  },
  {
    field: "ra",
    headerName: "RA",
    width: 100,
    sortable: false,
  },
  {
    field: "dec",
    headerName: "Dec",
    width: 100,
    sortable: false,
  },
  {
    field: "mag",
    headerName: "Mag",
    // type: "number",
    width: 120,
  },
];

export default function SchedulerTable(props) {
  const rows = props.schedulerData.map((dso, i) => ({
    id: i + 1,
    dsoName: dso.name,
    type: dso.type,
    ra: dso.ra,
    dec: dso.dec,
    mag: dso.mag,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
