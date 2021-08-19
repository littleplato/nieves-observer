import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import dotenv from "dotenv";
dotenv.config();

export default function useSearch(searchInput) {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const getSearchResults = async (searchInput) => {
    console.log("fetching scheduler");
    if (searchInput !== undefined) {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/search", {
        method: "POST",
        body: JSON.stringify({ search: searchInput }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    }
  };

  return useQuery(
    ["scheduler", observatoryPosition, searchInput],
    () => getSearchResults(searchInput),
    {
      onSuccess: () => console.log("Search results fetch success"),
      // enabled: false,
    }
  );
}
