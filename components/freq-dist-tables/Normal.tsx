import React from "react"
import { Table } from "antd"

interface DataShape {
  key: number
  interval: string
  tepiBawah: string
  tepiAtas: string
  nilaiTengah: string
  frekuensi: number
  persentase: number
}

interface ColumnShape {
  title: string
  dataIndex: string
  key: string
}

const columns: ColumnShape[] = [
  { title: "Interval (Rp)", dataIndex: "interval", key: "interval" },
  { title: "Tepi Bawah (Rp)", dataIndex: "tepiBawah", key: "tepiBawah" },
  { title: "Tepi Atas (Rp)", dataIndex: "tepiAtas", key: "tepiAtas" },
  { title: "Nilai Tengah (Rp)", dataIndex: "nilaiTengah", key: "nilaiTengah" },
  { title: "Frekuensi", dataIndex: "frekuensi", key: "frekuensi" },
  { title: "Persentase (%)", dataIndex: "persentase", key: "persentase" },
]

const data: DataShape[] = [
  {
    key: 1,
    interval: "20.000 - 100.000",
    frekuensi: 19,
    tepiBawah: "19.999,5",
    tepiAtas: "100.000,5",
    nilaiTengah: "60.000",
    persentase: 38,
  },
  {
    key: 2,
    interval: "100.001 - 200.000",
    frekuensi: 16,
    tepiBawah: "100.000,5",
    tepiAtas: "200.000,5",
    nilaiTengah: "150.000,5",
    persentase: 32,
  },
  {
    key: 3,
    interval: "200.001 - 300.000",
    frekuensi: 4,
    tepiBawah: "200.000,5",
    tepiAtas: "300.000,5",
    nilaiTengah: "250.000,5",
    persentase: 8,
  },
  {
    key: 4,
    interval: "300.001 - 400.000",
    frekuensi: 9,
    tepiBawah: "300.000,5",
    tepiAtas: "400.000,5",
    nilaiTengah: "350.000,5",
    persentase: 18,
  },
  {
    key: 5,
    interval: "400.001 - 500.000",
    frekuensi: 2,
    tepiBawah: "400.000,5",
    tepiAtas: "500.000,5",
    nilaiTengah: "450.000,5",
    persentase: 4,
  },
]

const NormalFreqDistTable: React.FC = () => {
  return <Table bordered dataSource={data} columns={columns} />
}

export { NormalFreqDistTable, data as NormalFreqDistData }
