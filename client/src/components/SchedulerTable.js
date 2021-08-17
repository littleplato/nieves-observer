import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SchedulerChart from "./SchedulerChart";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  delete: {
    marginTop: 15,
    marginBottom: 15,
  },
  chart: {
    height: 440,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: -10,
  },
  chartTitle: {
    paddingLeft: 25,
  },
}));

const columns = [
  { field: "id", headerName: "Object", width: 100, sortable: false },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "ra",
    headerName: "RA",
    width: 130,
    sortable: false,
  },
  {
    field: "dec",
    headerName: "Dec",
    width: 130,
    sortable: false,
  },
  {
    field: "mag",
    headerName: "Mag",
    width: 120,
  },
  {
    field: "maxAlt",
    headerName: "Max Alt",
    width: 140,
    editable: true,
  },
];

export default function SchedulerTable(props) {
  const classes = useStyles();
  const [showData, setShowData] = useState(props.showData);
  const [checkedItem, setCheckedItem] = useState();
  const [pageSize, setPageSize] = useState(5);

  const rows = showData.map((dso, i) => ({
    id: dso.name,
    type: dso.type,
    ra: dso.ra,
    dec: dso.dec,
    mag: dso.mag,
    maxAlt: dso.max_alt.toFixed(2) + "°",
  }));

  const handleCheck = (e) => {
    console.log(e);
    setCheckedItem(e);
  };

  const handleDelete = () => {
    const newShowData = showData.filter((dso) =>
      checkedItem.every((item) => item !== dso.name)
    );
    setShowData(newShowData);
    const dsoNameOnly = newShowData.map((dso) => dso.params);
    props.updateDelete(dsoNameOnly);
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h1">
        Your saved objects
      </Typography>
      <Button
        variant="outlined"
        className={classes.delete}
        onClick={handleDelete}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <div style={{ height: 380, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[3, 4, 5]}
          checkboxSelection
          onSelectionModelChange={handleCheck}
        />
      </div>
      <Paper className={classes.chart}>
        <Typography variant="h6" className={classes.chartTitle} gutterBottom>
          Elevation of selected objects
        </Typography>
        <SchedulerChart schedulerData={showData} />
      </Paper>
    </div>
  );
}
