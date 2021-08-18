import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";

const cardHeight = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  card: {
    maxWidth: 800,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    marginTop: -7,
    marginBottom: -13,
  },
  chart: {
    height: cardHeight,
  },
  header: {
    width: 340,
  },
}));

export default function LoadingRows() {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Card className={classes.root}>
            <Skeleton
              variant="rect"
              animation="wave"
              width={250}
              height={cardHeight}
            />
            <div className={classes.details}>
              <CardHeader
                action={
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={30}
                    height={30}
                    style={{ marginTop: 14, marginRight: 6 }}
                  />
                }
                title={<Skeleton animation="wave" height={40} width="60%" />}
                subheader={
                  <Skeleton animation="wave" height={20} width="50%" />
                }
                className={classes.header}
              />
              <CardContent className={classes.content}>
                <Skeleton width="70%" animation="wave" />
                <Skeleton width="70%" animation="wave" />
                <Skeleton width="70%" animation="wave" />
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.chart}>
            <Skeleton variant="rect" animation="wave" height={cardHeight} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
