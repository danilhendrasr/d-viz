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

interface LegendPayload {
  value: string
  type: string
  id: string
  color: string
}

const BarChartVisualization: React.FC<{
  data: object[]
  xAxisKeyName: string
  barDataKeys: [string, string]
  labels: [string, string]
}> = ({ data, xAxisKeyName, barDataKeys, labels }) => {
  const colors: [string, string] = ["#5D737E", "#000000"]
  const payload: LegendPayload[] = [
    {
      value: labels[0],
      type: "rect",
      id: "id01",
      color: colors[0],
    },
    {
      value: labels[1],
      type: "rect",
      id: "id02",
      color: colors[1],
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKeyName} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend payload={payload} />
        <Bar dataKey={barDataKeys[0]} fill={colors[0]} name={labels[0]} />
        <Bar dataKey={barDataKeys[1]} fill={colors[1]} name={labels[1]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { BarChartVisualization }
