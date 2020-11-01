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
import { NormalFreqDistData } from "../freq-dist-tables/Normal"

const BarChartVisualization = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={NormalFreqDistData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="interval" interval={0} />
        <YAxis />
        <Tooltip />
        <Legend
          payload={[
            { value: "Persentase", type: "rect", id: "ID01", color: "#5D737E" },
            { value: "Frekuensi", type: "rect", id: "ID01", color: "#000" },
          ]}
        />
        <Bar dataKey="frekuensi" fill="#5D737E" />
        <Bar dataKey="persentase" fill="#000000" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { BarChartVisualization }
