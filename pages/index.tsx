import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useState } from "react"
import { GetStaticProps } from "next"
import { DataGrid, ColDef } from "@material-ui/data-grid"
import {
  getMean,
  getMode,
  getMedian,
  getData,
  extractValuesFromRecords,
  getFreqDistObject,
  getFrequencyTableFromRecordValues,
} from "@/utils"

interface FilteredRecord {
  id: number
  key: number
  name: string
  kota: string
  data: number
}

interface DistFreqRow {
  id: number
  nomor: number
  interval: string
  frekuensi: number
  tepiBawah: number
  tepiAtas: number
  nilaiTengah: number
}

interface RelativeFreqDistRow {
  id: number
  nomor: number
  interval: string
  frekuensi: number
  persentase: string
}

interface HomeProps {
  records: FilteredRecord[]
  recordValues: number[]
  freqDist: DistFreqRow[]
  relativeFreqDist: RelativeFreqDistRow[]
}

const mainDataCols: ColDef[] = [
  { field: "key", headerName: "No.", width: 80 },
  { field: "name", headerName: "Nama", width: 300 },
  { field: "kota", headerName: "Kota", width: 200 },
  { field: "data", headerName: "Biaya Internet", width: 150 },
]

const distFreqCols: ColDef[] = [
  { field: "nomor", headerName: "Nomor" },
  { field: "interval", headerName: "Interval Kelas (Ribu)", width: 200 },
  { field: "frekuensi", headerName: "Frekuensi" },
  { field: "tepiBawah", headerName: "Tepi Bawah", width: 150 },
  { field: "tepiAtas", headerName: "Tepi Atas", width: 150 },
  { field: "nilaiTengah", headerName: "Nilai Tengah", width: 150 },
]

const relativeFreqDistCols: ColDef[] = [
  { field: "nomor", headerName: "Nomor" },
  { field: "interval", headerName: "Interval Kelas (Ribu)", width: 200 },
  { field: "frekuensi", headerName: "Frekuensi" },
  { field: "persentase", headerName: "Persentase", width: 150 },
]

export default function Home({
  records,
  recordValues,
  freqDist,
  relativeFreqDist,
}: HomeProps) {
  console.log(relativeFreqDist)
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
            Visualisasi Data
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

      <div className={styles["table-wrapper--dist-freq"]}>
        <DataGrid rows={freqDist} columns={distFreqCols} pageSize={10} />
      </div>

      <div className={styles["table-wrapper--relative-dist-freq"]}>
        <DataGrid
          rows={relativeFreqDist}
          columns={relativeFreqDistCols}
          pageSize={5}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const records = await getData()
  const recordValues = extractValuesFromRecords(records)
  const freqTable = getFrequencyTableFromRecordValues(recordValues)

  const freqDistObj = getFreqDistObject(freqTable)
  const relativeFreqDist = getRelativeFreqDistObject(freqDistObj)

  return {
    props: {
      records: records,
      recordValues: recordValues,
      freqDist: freqDistObj,
      relativeFreqDist,
    },
  }
}

function getRelativeFreqDistObject(
  freqDistObj: DistFreqRow[]
): RelativeFreqDistRow[] {
  let relativeFreqDistObj: RelativeFreqDistRow[] = []

  freqDistObj.forEach((row, index) => {
    relativeFreqDistObj.push({
      id: index,
      nomor: index + 1,
      interval: row.interval,
      frekuensi: row.frekuensi,
      persentase: `${(row.frekuensi / 50) * 100}%`,
    })
  })

  return relativeFreqDistObj
}
