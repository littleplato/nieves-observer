import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import dotenv from "dotenv";
dotenv.config();

export default function useObject(objectParamsData) {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const getObject = async (objectParamsData) => {
    console.log("fetching object");
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/dso/${objectParamsData}`,
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

  return useQuery(
    ["object", observatoryPosition, objectParamsData],
    () => getObject(objectParamsData),
    {
      onSuccess: () => console.log("object fetch success"),
    }
  );
}
