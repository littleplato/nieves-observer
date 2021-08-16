import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchShow from "../components/SearchShow";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
  },
}));
export default function SearchResults(props) {
  const classes = useStyles();
  const searchShow = props.searchResults;

  return props.searchResults.length === 0 ? (
    "Sorry, nothing found."
  ) : (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {searchShow?.map((searchItem, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <SearchShow searchItem={searchItem} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
