import { useAtom } from "jotai";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { darkModeAtom } from "../App";

export default function ObjectChart(props) {
  const [darkMode] = useAtom(darkModeAtom);
  return (
    <ResponsiveContainer>
      <LineChart
        width={280}
        height={150}
        data={props.plot}
        margin={{
          right: 20,
          left: -20,
          bottom: 45,
        }}
      >
        <CartesianGrid
          // strokeDasharray="3 3"
          stroke={darkMode ? "#777B7E" : "#D9DDDC"}
        />
        <YAxis
          stroke={darkMode ? "#b0bec5" : "#546e7a"}
          domain={[10, 90]}
          tick={{ fontSize: 10 }}
          allowDataOverflow={true}
        />
        <XAxis dataKey="name" tick={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#4A4A4A" : "#fff",
            opacity: 0.8,
          }}
        />
        <ReferenceLine
          x="19:00 PM"
          stroke={darkMode ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
        />
        <ReferenceLine
          x="06:00 AM"
          stroke={darkMode ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
        />
        <Line
          type={"natural"}
          dataKey="alt"
          dot={false}
          stroke={darkMode ? "#D9DDDC" : "#777B7E"}
          strokeWidth={2}
          unit="°"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
