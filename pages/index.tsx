import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useState } from "react"
import { DataGrid, ColDef } from "@material-ui/data-grid"
import { GetServerSideProps } from "next"
import {
  getMean,
  getMode,
  getMedian,
  getData,
  extractValuesFromRecords,
} from "@/utils"

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
  freqDist: DistFreqRow[]
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

export default function Home({ records, recordValues, freqDist }: HomeProps) {
  console.log(freqDist)
  const [data] = useState(records)
  const mean = getMean(recordValues)
  const { nilaiModus: modus, banyakMuncul: frekuensiModus } = getMode(
    recordValues
  )
  const median = getMedian(recordValues)

  return (
    <div className={styles.container}>
      <Head>
        <title>Visualisasi Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Visualisasi Data</h1>
          <h2>Danil Hendra Suryawan</h2>
          <h3>19081010016</h3>
          <h4>Statistika Komputasi (D)</h4>
        </div>
      </header>

      <div className={styles["table-wrapper--main-data"]}>
        <DataGrid rows={data} columns={mainDataCols} pageSize={7} />
      </div>

      <h2>Mean: {mean}</h2>
      <h2>
        Modus: {modus}, muncul {frekuensiModus} kali
      </h2>
      <h2>Median: {median}</h2>

      <div className={styles["table-wrapper--dist-freq"]}>
        <DataGrid rows={freqDist} columns={distFreqCols} pageSize={8} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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

const getFrequencyTableFromRecordValues = (recordValues: number[]) => {
  const freqRecorder = {
    "20000 - 100000": 0,
    "100001 - 200000": 0,
    "200001 - 300000": 0,
    "300001 - 400000": 0,
    "400001 - 500000": 0,
  }

  recordValues.forEach((value) => {
    for (const [key] of Object.entries(freqRecorder)) {
      const keyInArray: string[] = key.split("-")
      const keyInNumber: number[] = keyInArray.map((singleKey) =>
        Number(singleKey)
      )

      if (value >= keyInNumber[0] && value <= keyInNumber[1])
        freqRecorder[key] += 1
    }
  })

  return freqRecorder
}

const getFreqDistObject = (frequencyTable: Record<string, number>) => {
  const freqDist: DistFreqRow[] = []
  let id = 0

  for (const [key, value] of Object.entries(frequencyTable)) {
    const keyInArray: string[] = key.split("-")
    const keyInNumber: number[] = keyInArray.map((singleKey) =>
      Number(singleKey)
    )

    const tepiBawah = keyInNumber[0] - 0.5
    const tepiAtas = keyInNumber[1] + 0.5

    freqDist.push({
      id,
      nomor: id + 1,
      interval: key,
      frekuensi: value,
      tepiBawah,
      tepiAtas,
      nilaiTengah: (tepiBawah + tepiAtas) / 2,
    })

    id++
  }

  return freqDist
}
