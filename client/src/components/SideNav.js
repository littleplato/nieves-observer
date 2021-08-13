import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";
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
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import GitHubIcon from "@material-ui/icons/GitHub";
// import ObsStats from "./ObsStats";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
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
        color="inherit"
      >
        <Toolbar>
          <Typography variant="subtitle1" className={classes.nav}>
            <Link
              component={RouterLink}
              color="inherit"
              to="/scheduler"
              style={{ textDecoration: "none" }}
            >
              Scheduler
            </Link>
          </Typography>
          <Tooltip title="See source on GitHub">
            <IconButton
              onClick={() => {
                console.log("github");
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle light/dark mode">
            <IconButton onClick={() => props.selectMode(!props.darkMode)}>
              {props.darkMode === true ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
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
        {/* <ObsStats /> */}
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
