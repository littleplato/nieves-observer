import React from "react";
import ExoplanetRow from "./ExoplanetRow";
import LoadingRows from "./LoadingRows";

const plot_data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dummyData = [
  {
    name: "CoRoT-13 b",
    max_alt: "51.3°",
    mag: 12.3,
    ra: "06h50m53.07s",
    dec: "-05d05m11.24s",
    period: 4.03519,
    duration: 3.14,
    depth: 0.810802,
    plot: plot_data,
    ingress: "01:03:01 AM",
    exgress: "05:06:04 AM",
    date: "2021-08-29",
  },
  {
    name: "CoRoT-13 b",
    max_alt: "51.3°",
    mag: 12.3,
    ra: "06h50m53.07s",
    dec: "-05d05m11.24s",
    period: 4.03519,
    duration: 3.14,
    depth: 0.810802,
    plot: plot_data,
    ingress: "01:03:01 AM",
    exgress: "05:06:04 AM",
    date: "2021-08-29",
  },
];

export default function ExoplanetList() {
  return 1 + 0 === 2 ? (
    <div>
      <p />
      <LoadingRows />
      <LoadingRows />
    </div>
  ) : (
    dummyData.map((exoplanet) => <ExoplanetRow dummyData={exoplanet} />)
  );
}
