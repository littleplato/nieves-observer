import React, { useContext } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { DarkModeContext } from "../App";

const convertPlotsToRecharts = (schedulerFullDataArray) => {
  let plot_data = [];
  for (let i = 0; i < schedulerFullDataArray.length; i++) {
    const parsedData = JSON.parse(
      schedulerFullDataArray[i].plot.replaceAll("'", '"')
    );
    if (plot_data.length < 1) {
      for (let j = 0; j < parsedData.length; j++) {
        const dataPoint = {
          [schedulerFullDataArray[i].name]: parsedData[j].alt,
        };
        plot_data.push(dataPoint);
      }
    } else {
      for (let j = 0; j < parsedData.length; j++) {
        const newDataPoint = {
          [schedulerFullDataArray[i].name]: parsedData[j].alt,
        };
        plot_data[j] = { ...plot_data[j], ...newDataPoint };
        if (i === schedulerFullDataArray.length - 1) {
          const timeAxis = { time: parsedData[j].time };
          plot_data[j] = { ...plot_data[j], ...timeAxis };
        }
      }
    }
  }
  return plot_data;
};

export default function SchedulerChart(props) {
  const darkModeContext = useContext(DarkModeContext);

  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={170}
        data={convertPlotsToRecharts(props.schedulerData)}
        margin={{
          right: 20,
          left: -20,
          bottom: 25,
        }}
      >
        <CartesianGrid
          // strokeDasharray="3 3"
          stroke={darkModeContext ? "#616161" : "#D9DDDC"}
        />
        <YAxis
          stroke={darkModeContext ? "#b0bec5" : "#546e7a"}
          domain={[10, 90]}
          tick={{ fontSize: 10 }}
          allowDataOverflow={true}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkModeContext ? "#4A4A4A" : "#fff",
            opacity: 0.8,
          }}
        />
        {/* <Legend /> */}
        <ReferenceLine
          x="8"
          stroke={darkModeContext ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
          strokeWidth={2}
        />
        <ReferenceLine
          x="21"
          stroke={darkModeContext ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
          strokeWidth={2}
        />
        {Object.keys(convertPlotsToRecharts(props.schedulerData)[0])
          .slice(0, -1)
          .map((keyName) => (
            <Line type="natural" dataKey={keyName} dot={false} />
          ))}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
