import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { observatoryPositionAtom } from "../App";
import dotenv from "dotenv";
dotenv.config();

export default function useDSOFilter(selectedType) {
  const [observatoryPosition] = useAtom(observatoryPositionAtom);

  const getFilteredDSO = async (selectedType) => {
    console.log("fetching DSO filter");
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/dso/filter`, {
      method: "POST",
      body: JSON.stringify({
        ...observatoryPosition,
        dso_type: selectedType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };

  return useQuery(
    ["dsoFiltered", selectedType, observatoryPosition],
    () => getFilteredDSO(selectedType),
    {
      onSuccess: () => console.log("filter fetch success"),
    }
  );
}
