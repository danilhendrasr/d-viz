import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts"

interface PropsType {
  data: object[]
  xAxisKeyName: string
  barDataKeys: [string, string]
  labels: [string, string]
}

const colors: [string, string] = ["#5D737E", "#000000"]

const BarChartVisualization: React.FC<PropsType> = ({
  data,
  xAxisKeyName,
  barDataKeys,
  labels,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKeyName} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={barDataKeys[0]} fill={colors[0]} name={labels[0]} />
        <Bar dataKey={barDataKeys[1]} fill={colors[1]} name={labels[1]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { BarChartVisualization }
