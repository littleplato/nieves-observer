import { useAtom } from "jotai";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  //   ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { darkModeAtom } from "../App";

export default function ExoplanetAltChart(props) {
  const [darkMode] = useAtom(darkModeAtom);

  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={170}
        data={props.plot}
        margin={{
          right: 20,
          left: -20,
          bottom: -10,
        }}
      >
        <CartesianGrid stroke={darkMode ? "#777B7E" : "#D9DDDC"} />
        <XAxis dataKey="name" tick={false} />
        <YAxis
          stroke={darkMode ? "#b0bec5" : "#546e7a"}
          tick={{ fontSize: 10 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#4A4A4A" : "#fff",
            opacity: 0.8,
          }}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke={darkMode ? "#D9DDDC" : "#777B7E"}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
