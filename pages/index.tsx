import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useState } from "react"
import { GetStaticProps } from "next"
import { DataGrid, ColDef } from "@material-ui/data-grid"
import { LineChart, BarChart, PieChart } from "@/components/charts"
import { CumulativeTable, BasicTable } from "@/components/freq-dist-tables"
import { Tabs } from "antd"
import {
  getMean,
  getMode,
  getData,
  getMedian,
  getFreqDistObject,
  extractValuesFromRecords,
  getFrequencyTableFromRecordValues,
} from "@/utils"

const { TabPane } = Tabs

interface FilteredRecord {
  id: number
  key: number
  name: string
  kota: string
  data: number
}

interface HomeProps {
  records: FilteredRecord[]
  recordValues: number[]
}

const mainDataCols: ColDef[] = [
  { field: "key", headerName: "No.", width: 80 },
  { field: "name", headerName: "Nama", width: 300 },
  { field: "kota", headerName: "Kota", width: 200 },
  { field: "data", headerName: "Biaya Internet", width: 150 },
]

export default function Home({ records, recordValues }: HomeProps) {
  const [data] = useState(records)
  const mean = getMean(recordValues)
  const { nilaiModus: modus, banyakMuncul: frekuensiModus } = getMode(
    recordValues
  )
  const median = getMedian(recordValues)

  return (
    <div className={styles["container"]}>
      <Head>
        <title>Visualisasi Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles["header"]}>
        <div className={styles["text-center"]}>
          <h1 className={`${styles["title"]} ${styles["text-center"]}`}>
            Statistika Komputasi (Visualisasi Data)
          </h1>
          <h2 className={`${styles["subtitle"]} ${styles["subtitle--main"]}`}>
            Danil Hendra Suryawan
          </h2>
          <h3
            className={`${styles["subtitle"]} ${styles["subtitle--secondary"]}`}
          >
            19081010016
          </h3>
        </div>
      </header>

      <div className={styles["table-wrapper--main-data"]}>
        <DataGrid rows={data} columns={mainDataCols} pageSize={10} />
      </div>

      <h2>Mean: {mean}</h2>
      <h2>
        Modus: {modus}, muncul {frekuensiModus} kali
      </h2>
      <h2>Median: {median}</h2>

      <h2 style={{ textAlign: "center", fontSize: "2.5em" }}>
        Tabel Distribusi Frekuensi dan Visualisasinya
      </h2>
      <Tabs
        defaultActiveKey="1"
        onChange={(key) => console.log(key)}
        style={{ width: "85%" }}
        tabBarStyle={{ fontSize: "20px" }}
        size="large"
        centered
      >
        <TabPane tab="Normal & Relatif" key="1" style={{ width: "100%" }}>
          <div style={{ margin: "20px 0" }}>
            <BasicTable />
          </div>
          <hr />
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ textAlign: "center", fontSize: "2.2em" }}>
              Visualisasi Tabel Distribusi Frekuensi
            </h3>
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Diagram Balok" key="1">
                <BarChart />
              </TabPane>
              <TabPane tab="Diagram Lingkaran" key="2">
                <PieChart />
              </TabPane>
              <TabPane tab="Diagram Ogive" key="3">
                <LineChart />
              </TabPane>
            </Tabs>
          </div>
        </TabPane>
        <TabPane tab="Kumulatif & Relatif-Kumulatif" key="2">
          <CumulativeTable />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Test" key="1">
              <h1>Test</h1>
            </TabPane>
            <TabPane tab="Testo" key="2">
              <h1>Testo</h1>
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const records = await getData()
  const recordValues = extractValuesFromRecords(records)
  const freqTable = getFrequencyTableFromRecordValues(recordValues)

  const freqDistObj = getFreqDistObject(freqTable)

  return {
    props: {
      records: records,
      recordValues: recordValues,
      freqDist: freqDistObj,
    },
  }
}
