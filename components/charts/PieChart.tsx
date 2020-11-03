import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts"

interface PropsType {
  data: any[]
  dataKeys: [string, string]
  nameKey: string
  legendLabels: [string, string]
}

const PieChartVisualization: React.FC<PropsType> = ({
  data,
  dataKeys,
  nameKey,
  legendLabels,
}) => {
  const legendPayload = [
    {
      value: legendLabels[0],
      type: "circle",
      id: "ID01",
      color: "#5D737E",
    },
    { value: legendLabels[1], type: "circle", id: "ID02", color: "#000" },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKeys[0]}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={40}
          label
          fill="#5D737E"
        />
        <Pie
          data={data}
          dataKey={dataKeys[1]}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={120}
          label
          fill="#000"
        />
        <Legend payload={legendPayload} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export { PieChartVisualization }
