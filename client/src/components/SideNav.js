import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Calendar from "./Calendar";
import Container from "@material-ui/core/Container";
import Location from "./Location";
import TollIcon from "@material-ui/icons/Toll";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import AdjustIcon from "@material-ui/icons/Adjust";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  options: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  icon: {
    minWidth: 40,
  },
  nav: {
    flexGrow: 1,
  },
}));

const navObjects = [
  { text: "Deep Sky Objects", icon: <BubbleChartIcon />, link: "/" },
  { text: "Exoplanets", icon: <AdjustIcon />, link: "/exoplanets" },
  {
    text: "Eclipsing Binaries",
    icon: <TollIcon />,
    link: "/eclipsingbinaries",
  },
];

export default function SideBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="#fff"
      >
        <Toolbar>
          <Typography variant="subtitle1" className={classes.nav}>
            Scheduler
          </Typography>
          <Tooltip title="Toggle light/dark mode">
            <IconButton onClick={() => props.selectMode(!props.darkMode)}>
              {props.darkMode === true ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Container>
          <Typography variant="h6" noWrap className={classes.logo}>
            Observatory Planner
          </Typography>
        </Container>
        <div />
        <Divider />
        <div className={classes.options}>
          <Container>
            <Location
              locationSelection={(locationData) =>
                props.locationSelection(locationData)
              }
            />
            <Calendar
              dateSelection={(dateData) => props.dateSelection(dateData)}
            />
          </Container>
        </div>
        <Divider />

        <List>
          {navObjects.map((item, index) => (
            <Link
              component={RouterLink}
              color="inherit"
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <ListItem button key={item.text}>
                <ListItemIcon className={classes.icon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
