import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import dotenv from "dotenv";
dotenv.config();

export default function useLanding() {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const getLanding = async () => {
    console.log("fetching landing");
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/dso`, {
      method: "POST",
      body: JSON.stringify(observatoryPosition),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  return useQuery(["landing", observatoryPosition], getLanding, {
    onSuccess: () => console.log("landing fetch success"),
  });
}
