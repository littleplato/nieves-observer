import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DSOChart from "./DSOChart";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
}));

export default function DSORow(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAdd = () => {
    setAnchorEl(null);
    console.log(`${props.dso.name} added`);
    props.addToScheduler(props.dso.params);
  };

  const handleReadMore = () => {
    history.push("/object/" + props.dso.params);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              image={props.dso.image}
              title={props.dso.name}
            />
            <div className={classes.details}>
              <CardHeader
                action={
                  <div>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={handleReadMore}
                        className={classes.menuItem}
                      >
                        READ MORE
                      </MenuItem>
                      <MenuItem
                        onClick={handleAdd}
                        className={classes.menuItem}
                      >
                        SAVE OBJECT
                      </MenuItem>
                    </Menu>
                  </div>
                }
                title={props.dso.name}
                subheader={props.dso.type}
                className={classes.header}
              />
              <CardContent className={classes.content}>
                <Typography variant="subtitle2" color="textSecondary">
                  Apparent Magnitude: {props.dso.mag} mag <br />
                  Maximum Altitude: +{props.dso.max_alt.toFixed(2)}° <br />
                  Distance: {props.dso.dist} kly
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.chart}>
            <DSOChart
              plot={JSON.parse(
                props.dso.plot.replaceAll("'", '"').replaceAll("-1.00", "—")
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
