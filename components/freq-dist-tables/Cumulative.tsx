import { Table } from "antd"
import React from "react"

interface ColumnShape {
  title: string
  dataIndex?: string
  key?: string
  children?: ColumnShape[]
}

interface DataShape {
  key: number
  kelasKurangDari: number
  frekuensiKurangDari: number
  persentasiFrekKurangDari: number
  kelasLebihDari: number
  frekuensiLebihDari: number
  persentasiFrekLebihDari: number
}

const columns: ColumnShape[] = [
  {
    title: "Kurang dari",
    children: [
      { title: "Kelas", dataIndex: "kelasKurangDari", key: "kelasKurangDari" },
      {
        title: "Frekuensi",
        dataIndex: "frekuensiKurangDari",
        key: "frekuensiKurangDari",
      },
      {
        title: "Persentase (%)",
        dataIndex: "persentasiFrekKurangDari",
        key: "persentasiFrekKurangDari",
      },
    ],
  },
  {
    title: "Lebih dari",
    children: [
      { title: "Kelas", dataIndex: "kelasLebihDari", key: "kelasLebihDari" },
      {
        title: "Frekuensi",
        dataIndex: "frekuensiLebihDari",
        key: "frekuensiLebihDari",
      },
      {
        title: "Persentase (%)",
        dataIndex: "persentasiFrekLebihDari",
        key: "persentasiFrekLebihDari",
      },
    ],
  },
]

const data: DataShape[] = [
  {
    key: 1,
    kelasKurangDari: 100000.5,
    frekuensiKurangDari: 19,
    persentasiFrekKurangDari: 38,
    kelasLebihDari: 19999.5,
    frekuensiLebihDari: 50,
    persentasiFrekLebihDari: 100,
  },
  {
    key: 1,
    kelasKurangDari: 200000.5,
    frekuensiKurangDari: 19,
    persentasiFrekKurangDari: 70,
    kelasLebihDari: 100000.5,
    frekuensiLebihDari: 31,
    persentasiFrekLebihDari: 62,
  },
  {
    key: 1,
    kelasKurangDari: 300000.5,
    frekuensiKurangDari: 19,
    persentasiFrekKurangDari: 78,
    kelasLebihDari: 200000.5,
    frekuensiLebihDari: 15,
    persentasiFrekLebihDari: 30,
  },
  {
    key: 1,
    kelasKurangDari: 400000.5,
    frekuensiKurangDari: 19,
    persentasiFrekKurangDari: 96,
    kelasLebihDari: 300000.5,
    frekuensiLebihDari: 11,
    persentasiFrekLebihDari: 22,
  },
  {
    key: 1,
    kelasKurangDari: 500000.5,
    frekuensiKurangDari: 19,
    persentasiFrekKurangDari: 100,
    kelasLebihDari: 400000.5,
    frekuensiLebihDari: 2,
    persentasiFrekLebihDari: 4,
  },
]

const CumulativeFreqDistTable = () => {
  return (
    <Table
      bordered
      dataSource={data}
      columns={columns}
      title={() => (
        <strong style={{ fontSize: "1.5em" }}>
          Tabel Distribusi Frekuensi Kumulatif
        </strong>
      )}
      style={{ margin: "10px 0" }}
    />
  )
}

export { CumulativeFreqDistTable }
