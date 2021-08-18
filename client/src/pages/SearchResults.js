import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchShow from "../components/SearchShow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
  },
}));
export default function SearchResults(props) {
  const classes = useStyles();
  const searchShow = props.searchResults;

  return searchShow.state === "loading" ? (
    <>
      Searching for your object...
      <p />
      <CircularProgress />
    </>
  ) : searchShow.length > 0 ? (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Search results for "{props.searchTerm}"
      </Typography>
      <Grid container spacing={2}>
        {searchShow?.map((searchItem, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <SearchShow
              searchItem={searchItem}
              addToScheduler={(data) => props.addToScheduler(data)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <>
      <Typography variant="h4" gutterBottom>
        Sorry, I found nothing for "{props.searchTerm}"
      </Typography>
      Please try a different search term.
    </>
  );
}
