import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ObjectChart from "./ObjectChart";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
  },
  card: {
    display: "flex",
  },
  cover: {
    width: 400,
    height: 330,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    marginBottom: -13,
  },
  coord: {
    marginBottom: 15,
  },
  header: {
    width: 400,
  },
  paper: {
    marginTop: 15,
    paddingTop: 15,
    height: 320,
  },
}));

export default function ObjectDetails({
  observatoryPosition,
  addToScheduler,
  objectShow,
}) {
  const classes = useStyles();

  const handleAdd = () => {
    addToScheduler(objectShow.params);
    console.log("adding", objectShow.params);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={objectShow.image}
          title={objectShow.name}
        />
        <div className={classes.details}>
          <CardHeader
            action={
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            }
            title={`${objectShow.name} (${objectShow.params.toUpperCase()})`}
            subheader={objectShow.type}
            className={classes.header}
          />
          <CardContent className={classes.content}>
            <Typography
              className={classes.coord}
              variant="subtitle2"
              color="textSecondary"
            >
              Common Name: {objectShow.common}
              <br />
              Other Identifiers: {objectShow.ngcic}
            </Typography>
            <Typography
              className={classes.coord}
              variant="subtitle2"
              color="textSecondary"
            >
              RA: {objectShow.ra} <br />
              Dec: {objectShow.dec}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Apparent Magnitude: {objectShow.mag} mag <br />
              Max Altitude (for {observatoryPosition.date.slice(0, 10)}): +
              {objectShow.max_alt.toFixed(2)}° <br />
              Distance: {objectShow.dist} kly <br />
              Constellation: {objectShow.con}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Paper className={classes.paper}>
        <Container>
          <Typography variant="h6" gutterBottom>
            Elevation for the night of {observatoryPosition.date.slice(0, 10)}
          </Typography>
        </Container>
        {objectShow !== null && (
          <ObjectChart
            plot={JSON.parse(
              objectShow.plot.replaceAll("'", '"').replaceAll("-1.00", "—")
            )}
          />
        )}
      </Paper>
    </div>
  );
}
