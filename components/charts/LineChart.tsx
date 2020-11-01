import { NormalFreqDistData } from "../freq-dist-tables/Normal"
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

const LineChartVisualization = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={NormalFreqDistData}>
        <Line type="monotone" dataKey="frekuensi" stroke="#5D737E" />
        <Line type="monotone" dataKey="persentase" stroke="#000" />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="interval" interval={0} allowDataOverflow />
        <YAxis />
        <Tooltip />
        <Legend
          payload={[
            { value: "Persentase", type: "line", id: "ID01", color: "#5D737E" },
            { value: "Frekuensi", type: "line", id: "ID01", color: "#000" },
          ]}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export { LineChartVisualization }
