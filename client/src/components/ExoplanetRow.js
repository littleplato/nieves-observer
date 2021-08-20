import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
// import ExoplanetAltChart from "./ExoplanetAltChart";
import ExoplanetDepthChart from "./ExoplanetDepthChart";

const cardHeight = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  card: {
    maxWidth: 830,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 250,
    minWidth: 100,
    height: cardHeight,
  },
  chart: {
    height: cardHeight,
    paddingTop: 15,
  },
  header: {
    width: 340,
  },
  menuItem: {
    fontSize: 12,
    fontWeight: 700,
  },
  alert: {
    backgroundColor: "#004d40",
  },
}));

export default function ExoplanetRow({ exoplanet }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Card className={classes.root}>
            <div className={classes.cover}>
              <ExoplanetDepthChart
                plot={JSON.parse(exoplanet.transit_plot.replaceAll("'", '"'))}
              />
            </div>
            <div className={classes.details}>
              <CardHeader
                title={exoplanet.planet}
                subheader={`Transit Date: ${exoplanet.date.slice(0, 10)}`}
                className={classes.header}
              />
              <CardContent className={classes.content}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      V Mag: {exoplanet.mag} <br />
                      RA: {exoplanet.ra} <br />
                      Dec: {exoplanet.dec} <br />
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Ingress: {exoplanet.ingress_date.slice(11, 22)} <br />
                      Exgress: {exoplanet.exgress_date.slice(11, 22)} <br />
                      Period: {exoplanet.period.slice(0, 4)} hours <br />
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <Paper className={classes.chart}>
            <ExoplanetAltChart plot={exoplanet.plot} />
          </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
}
