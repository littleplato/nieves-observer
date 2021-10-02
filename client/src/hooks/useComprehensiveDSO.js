import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import dotenv from "dotenv";
dotenv.config();

export default function useComprehensiveDSO() {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const getComprehensiveDSO = async () => {
    console.log("fetching comprehensive");
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/dso/comprehensive`,
      {
        method: "POST",
        body: JSON.stringify(observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  };

  return useQuery(["comprehensive", observatoryPosition], getComprehensiveDSO, {
    onSuccess: () => console.log("comprehensive fetch success"),
  });
}
