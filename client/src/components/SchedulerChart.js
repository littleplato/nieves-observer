import { useAtom } from "jotai";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { darkModeAtom } from "../App";

export default function SchedulerChart(props) {
  const [darkMode] = useAtom(darkModeAtom);

  const chartLineColors = {
    dark: [
      "#ffcc80", //orange
      "#80cbc4", //teal
      "#90caf9", //blue
      "#ffab91", //red
      "#b39ddb", //purple
      "#c5e1a5", //green
      "#b0bec5", //steel
      "#fff59d", //yellow
    ],
    light: [
      "#ff9800",
      "#009688",
      "#1e88e5",
      "#ff5722",
      "#673ab7",
      "#8bc34a",
      "#607d8b",
      "#ffeb3b",
    ],
    chooseKey() {
      return darkMode ? this.dark : this.light;
    },
  };

  const convertPlotsToRecharts = (schedulerFullDataArray) => {
    let plot_data = [];
    for (let i = 0; i < schedulerFullDataArray.length; i++) {
      // to parse the strings
      const parsedData = JSON.parse(
        schedulerFullDataArray[i].plot
          .replaceAll("'", '"')
          .replaceAll("-1.00", "—")
      );
      if (plot_data.length < 1) {
        //initial parameters (time and 1st object)
        for (let j = 0; j < parsedData.length; j++) {
          const dataPoint = {
            [schedulerFullDataArray[i].name]: parsedData[j].alt,
          };
          const timeAxis = { time: parsedData[j].time };
          const timePoints = { name: parsedData[j].name };
          plot_data.push({ ...dataPoint, ...timeAxis, ...timePoints });
        }
      } else {
        // to add additional objects
        for (let j = 0; j < parsedData.length; j++) {
          const newDataPoint = {
            [schedulerFullDataArray[i].name]: parsedData[j].alt,
          };
          plot_data[j] = { ...newDataPoint, ...plot_data[j] };
        }
      }
    }
    // console.log(plot_data);
    return plot_data;
  };

  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={150}
        data={convertPlotsToRecharts(props.schedulerData)}
        margin={{
          right: 20,
          left: -20,
          bottom: 25,
        }}
      >
        <CartesianGrid stroke={darkMode ? "#616161" : "#D9DDDC"} />
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
          }}
        />
        <ReferenceLine
          x="19:00 PM"
          stroke={darkMode ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
          strokeWidth={2}
        />
        <ReferenceLine
          x="06:00 AM"
          stroke={darkMode ? "#D9DDDC" : "#777B7E"}
          strokeDasharray="3 3"
          strokeWidth={2}
        />
        {Object.keys(convertPlotsToRecharts(props.schedulerData)[0])
          .slice(0, -2)
          .map((keyName, i) => (
            <Line
              type="natural"
              dataKey={keyName}
              dot={false}
              key={i}
              stroke={chartLineColors.chooseKey()[i]}
              unit="°"
            />
          ))}
        <Legend wrapperStyle={{ marginBottom: 20 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
