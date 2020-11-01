import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { NormalFreqDistData } from "../freq-dist-tables/Normal"

const PieChartVisualization = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={NormalFreqDistData}
          dataKey="frekuensi"
          nameKey="interval"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#5D737E"
        />
        <Pie
          data={NormalFreqDistData}
          dataKey="persentase"
          nameKey="interval"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#000"
        />
        <Legend
          payload={[
            {
              value: "Persentase",
              type: "circle",
              id: "ID01",
              color: "#5D737E",
            },
            { value: "Frekuensi", type: "circle", id: "ID02", color: "#000" },
          ]}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export { PieChartVisualization }
