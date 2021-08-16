import React from "react";
import SearchShow from "../components/SearchShow";

export default function SearchResults(props) {
  return (
    <>
      {props.searchResults.length === 0 ? (
        "Sorry, nothing found."
      ) : (
        <SearchShow />
      )}
    </>
  );
}
