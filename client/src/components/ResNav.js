import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import GitHubIcon from "@material-ui/icons/GitHub";
import SearchBar from "./SearchBar";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Calendar from "./Calendar";
import Container from "@material-ui/core/Container";
import Location from "./Location";
import logoLight from "../assets/logoLight.svg";
import logoDark from "../assets/logoDark.svg";
import TollIcon from "@material-ui/icons/Toll";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import AdjustIcon from "@material-ui/icons/Adjust";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nav: {
    flexGrow: 1,
  },
  logo: {
    paddingTop: 8,
    marginLeft: 3,
    paddingBottom: 15,
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

function ResNav(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Link
        component={RouterLink}
        color="inherit"
        to="/"
        style={{ textDecoration: "none" }}
      >
        <img
          src={props.darkMode ? logoDark : logoLight}
          alt="logo"
          width={drawerWidth - 25}
          className={classes.logo}
        />
      </Link>

      <div />
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
            key={index}
            style={{ textDecoration: "none" }}
          >
            <ListItem button key={item.text}>
              <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>

      <div className={classes.footer}>
        <Container>
          <Typography variant="caption" style={{ fontWeight: 800 }}>
            {/* A full-stack app by Wee Jerrick */}
          </Typography>
        </Container>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
              href="https://github.com/weejerrick/nieves-observer"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle light/dark mode">
            <IconButton onClick={() => props.selectMode(!props.darkMode)}>
              {props.darkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>
          <SearchBar handleSearch={(data) => props.handleSearch(data)} />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default ResNav;
