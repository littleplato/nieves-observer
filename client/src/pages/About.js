import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  about: {
    marginBottom: 30,
  },
  reading: {
    fontSize: 16,
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.about}>
        <Typography variant="h1" gutterBottom>
          The Nieves Observer
        </Typography>
        <Typography variant="p" className={classes.reading}>
          For the uninitiated, this app solves a pesky problem in astronomy of
          <strong> target selection</strong>. With observatories’ remote
          capabilities, students have almost infinite time access to these
          research-grade telescopes. This is excellent, but it is a tedious
          process to determine the objects that they can view and study using
          the telescopes as it involves advanced trigonometry and calculus.
          Furthermore, it is usually not fruitful for beginners to be doing such
          calculations: it’s boring, prone to error, and besides the point.
        </Typography>
        <p />
        <Typography variant="p" className={classes.reading}>
          The observatory planner app intends to fill this difficulty by doing
          the calculations and allowing students to quickly select targets to
          practice telescope usage. The app calculates the viewability for three
          classes of objects, with each having a different pedagogical purpose.
        </Typography>
        <Typography variant="p" className={classes.reading}>
          <ol>
            <li>
              <strong>Deep sky objects (DSOs).</strong> DSOs are objects that
              are not part of the solar system, such as nebulae, star clusters,
              and galaxies. These objects are excellent for astrophotography,
              which is a good exercise for teaching image processing, quantum
              mechanical processes, and understanding the astrophysical
              compositions of objects. The app lists the DSOs that are available
              in the sky for a given night. For a quick introduction to
              astronomical objects, please visit A Brief Guide to Astronomical
              Objects.
            </li>
            <p />
            <li>
              <strong>Exoplanets.</strong> Exoplanets are planets that orbit
              other stars (than our sun). These objects are great to introduce
              students to time-series photometry, which is the measurement of
              brightness over time of an object—their first step into “legit”
              astrophysics. The app lists the exoplanet hosts that have
              exoplanets transiting for a given night.
            </li>
            <p />
            <li>
              <strong>Eclipsing binaries.</strong> Eclipsing binaries are binary
              stars (stars that orbit around each other) that block each other
              whenever one goes in front of the other. These objects are studied
              and taught for time-series analysis, which requires tools like
              Chi-squared or Lomb-Scargle analysis, which is difficult and more
              suited for juniors and seniors in the undergrad level. The app
              lists the eclipsing binaries that are eclipsing for a given night.
            </li>
          </ol>
        </Typography>
      </div>
      <div>
        <p />
        <Typography
          variant="h2"
          style={{ fontSize: 26, fontWeight: 500 }}
          gutterBottom
        >
          Getting Started
        </Typography>
        <Typography variant="p" className={classes.reading}>
          By default, the Nieves Observer is set to the perspective of the
          Nieves Observatory located at the Soka University of America (33.553°,
          -117.736°). The landing page shows high-quality, observable DSOs that
          are or will be up tonight.
          <p />
          The app allows you to toggle the perspective of the observatory from
          either Nieves or the LCRO. Toggling between the perspective will
          immediately update the list of targets, as they are optimised for a
          particular location.
          <p /> The app also allows you to toggle the date of observation. This
          is helpful if you have an upcoming availability at one of the
          observatories, and would like to plan ahead to optimise telescope
          time.
        </Typography>
        <p />
        <Typography
          variant="h2"
          style={{ fontSize: 22, fontWeight: 500 }}
          gutterBottom
        >
          Saving Targets
        </Typography>
        <p />

        <Typography variant="p" className={classes.reading}>
          Once you've seen a target that you like, you can add it to the saved
          list. To see the items that you've saved, click on the scheduler,
          which would give you a summary of the targets relative to each other.
          You can also toggle between dates and observatories to see their
          relative availability throughout the year and from different positions
          on Earth.
        </Typography>
        <p />
        <Typography
          variant="h2"
          style={{ fontSize: 22, fontWeight: 500 }}
          gutterBottom
        >
          Searching Objects
        </Typography>
        <p />
        <Typography variant="p" className={classes.reading}>
          You can search the objects in our database with the search function on
          the right. You can search for the common name (e.g., Orion's Nebula),
          but as objects tend to have many inconsistent naming, you will yield
          better results when you search for the particular NGC/IC or catalogue
          number (e.g., M42).
        </Typography>
        <p />
        <Typography
          variant="h2"
          style={{ fontSize: 22, fontWeight: 500 }}
          gutterBottom
        >
          Astronomical Data
        </Typography>
        <p />
        <Typography variant="p" className={classes.reading}>
          The detailed astronomical data are obtained from{" "}
          <a
            href="http://www.klima-luft.de/steinicke/ngcic/ngcic_e.htm"
            target="_blank"
            rel="noreferrer"
          >
            <Typography variant="p" color="primary">
              Dr. Wolfgang Steinicke's catalogue
            </Typography>
          </a>{" "}
          of NGC/IC and Messier objects. The deep-sky objects' images are web
          scrapped from Wikipedia, which were themselves scrapped mostly from
          NASA & ESO/Hubble. Exoplanet data are obtained from the{" "}
          <a
            href="https://exoplanetarchive.ipac.caltech.edu/"
            target="_blank"
            rel="noreferrer"
          >
            <Typography variant="p" color="primary">
              NASA Exoplanet Archive
            </Typography>
          </a>
          .
        </Typography>
      </div>
    </div>
  );
}
