import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DSOChart(props) {
  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={170}
        data={props.plot}
        margin={{
          right: 20,
          left: -20,
          bottom: 25,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          // stroke={props.axisColor === "black" ? "#D9DDDC" : "#777B7E"}
        />
        <YAxis
          // stroke={props.axisColor}
          domain={[10, 90]}
          tick={{ fontSize: 10 }}
          allowDataOverflow={true}
        />
        <Tooltip
          contentStyle={{
            // backgroundColor: props.axisColor === "black" ? "#fff" : "#4A4A4A",
            opacity: 0.8,
          }}
        />
        {/* <Legend /> */}
        <Line
          type={"natural"}
          dataKey="alt"
          dot={false}
          stroke="#90caf9"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
