import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface PropsType {
  data: object[]
  xAxisKeyName: string
  lineDataKeys: [string, string]
  labels: [string, string]
}

const colors = ["#5D737E", "#000000"]

const LineChartVisualization: React.FC<PropsType> = ({
  data,
  xAxisKeyName,
  lineDataKeys,
  labels,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey={lineDataKeys[0]}
          name={labels[0]}
          stroke={colors[0]}
        />
        <Line
          type="monotone"
          dataKey={lineDataKeys[1]}
          name={labels[1]}
          stroke={colors[1]}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKeyName} allowDataOverflow />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

export { LineChartVisualization }
