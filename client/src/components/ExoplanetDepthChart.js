import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAtom } from "jotai";
import { darkModeAtom } from "../App";

export default function ExoplanetDepthChart(props) {
  const [darkMode] = useAtom(darkModeAtom);

  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={170}
        data={props.plot}
        margin={{
          top: 20,
          right: 10,
          left: -35,
          bottom: -5,
        }}
      >
        <CartesianGrid stroke={darkMode ? "#777B7E" : "#D9DDDC"} />
        <XAxis dataKey="time" tick={false} />
        <YAxis
          stroke={darkMode ? "#b0bec5" : "#546e7a"}
          // tick={{ fontSize: 10 }}
          domain={[props.plot[3].mag * 0.999, props.plot[0].mag * 1.001]}
          tick={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#4A4A4A" : "#fff",
            opacity: 0.8,
          }}
        />
        <Line
          type="monotone"
          dataKey="mag"
          stroke={darkMode ? "#D9DDDC" : "#777B7E"}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
