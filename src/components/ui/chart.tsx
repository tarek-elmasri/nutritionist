"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type TLine<TKey> = {
  key: TKey;
  strokeColor: string;
};

interface ChartProps<TData> {
  id: string;
  data: TData[];
  lineKeys: TLine<keyof TData>[];
  xAxisKey: keyof TData;
  width?: number;
  height?: number;
}

const Chart = <T,>({
  id,
  data,
  lineKeys,
  xAxisKey,
  width,
  height,
}: ChartProps<T>) => {
  return (
    <LineChart
      id={id}
      width={width ?? 600}
      height={height ?? 300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      throttleDelay={20}
    >
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey={xAxisKey as string} />
      <YAxis type="number" domain={["dataMin", "dataMax"]} />
      <Tooltip />
      <Legend />
      {lineKeys.map((line) => (
        <Line
          key={line.key as string}
          type="monotone"
          dataKey={line.key as string}
          stroke={line.strokeColor}
        />
      ))}
    </LineChart>
  );
};

export default Chart;
