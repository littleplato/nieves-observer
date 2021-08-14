import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    // minWidth: 400,
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
    height: 300,
  },
}));

export default function ObjectDetails({ observatoryPosition }) {
  const [objectShow, setObjectShow] = useState(null);
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    const objectShow = params.objectID;
    const fetchObjectDetails = async () => {
      const res = await fetch(
        `https://obsplanner.herokuapp.com/dso/${objectShow}`,
        {
          method: "POST",
          body: JSON.stringify(observatoryPosition),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const objectData = await res.json();
      setObjectShow(objectData);
    };
    fetchObjectDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={objectShow?.image}
          title={objectShow?.name}
        />
        <div className={classes.details}>
          <CardHeader
            action={
              <IconButton onClick={() => console.log("add to list")}>
                <AddIcon />
              </IconButton>
            }
            title={`${objectShow?.name} (${objectShow?.params?.toUpperCase()})`}
            subheader={objectShow?.type}
            className={classes.header}
          />
          <CardContent className={classes.content}>
            <Typography
              className={classes.coord}
              variant="subtitle2"
              color="textSecondary"
            >
              Common Name: {objectShow?.common}
              <br />
              Other Identifiers: {objectShow?.ngcic}
            </Typography>
            <Typography
              className={classes.coord}
              variant="subtitle2"
              color="textSecondary"
            >
              RA: {objectShow?.ra} <br />
              Dec: {objectShow?.dec}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Apparent Magnitude: {objectShow?.mag} mag <br />
              Max Altitude (for {observatoryPosition.date.slice(0, 10)}): +
              {objectShow?.max_alt?.toFixed(2)}° <br />
              Distance: {objectShow?.dist} kly <br />
              Constellation: {objectShow?.con}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Paper className={classes.paper}>
        Elevation for {observatoryPosition.date.slice(0, 10)}
        {objectShow !== null && (
          <ObjectChart
            plot={JSON.parse(objectShow?.plot?.replaceAll("'", '"'))}
          />
        )}
      </Paper>
    </div>
  );
}
