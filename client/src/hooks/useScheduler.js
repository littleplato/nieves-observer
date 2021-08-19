import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import dotenv from "dotenv";
dotenv.config();

export default function useScheduler(localStorageData) {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const getScheduler = async (localStorageData) => {
    console.log("fetching scheduler");
    const infoToServer = {
      savedData: localStorageData,
      ...observatoryPosition,
    };
    const res = await fetch(process.env.REACT_APP_SERVER_URL + "/scheduler", {
      method: "POST",
      body: JSON.stringify(infoToServer),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  return useQuery(
    ["scheduler", observatoryPosition, localStorageData],
    () => getScheduler(localStorageData),
    {
      onSuccess: () => console.log("scheduler fetch success"),
    }
  );
}
