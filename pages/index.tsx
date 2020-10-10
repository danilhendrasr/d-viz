import Head from "next/head"
import styles from "../styles/Home.module.css"
import { useState } from "react"
import { DataGrid, ColDef } from "@material-ui/data-grid"
import { GetServerSideProps } from "next"

interface FilteredRecord {
  id: number
  key: number
  data: number
}

const columns: ColDef[] = [
  { field: "key", headerName: "No.", width: 70 },
  { field: "data", headerName: "Nilai Data", width: 130 },
]

export default function Home({
  records,
  recordValues,
}: {
  records: FilteredRecord[]
  recordValues: number[]
}) {
  const [data] = useState(records)
  const mean = getMean(recordValues)
  const { nilaiModus: modus, banyakMuncul: frekuensiModus } = getModus(
    recordValues
  )
  const median = getMedian(recordValues)

  return (
    <div className={styles.container}>
      <Head>
        <title>Visualisasi Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles["table-wrapper"]}>
        <DataGrid rows={data} columns={columns} pageSize={7} />
      </div>

      <h2>Mean: {mean}</h2>
      <h2>
        Modus: {modus}, muncul {frekuensiModus} kali
      </h2>
      <h2>Median: {median}</h2>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    "https://api.airtable.com/v0/appqjyXJh5Z4SOlcL/STATKOM-D?api_key=keyCQJU1TL6nSy9A8"
  )

  const records = (await response.json()).records

  const filteredRecords: FilteredRecord[] = records.map((record, index) => {
    return {
      id: index,
      key: index + 1,
      data: record.fields["Biaya Internet per Bulan"],
    }
  })

  const recordValues: number[] = filteredRecords.map((record) => {
    return record.data
  })

  const sortedRecordValues: number[] = recordValues.sort((a, b) => a - b)

  return {
    props: {
      records: filteredRecords,
      recordValues: sortedRecordValues,
    },
  }
}

function getMean(array: number[]): number {
  let avg: number
  let total = 0
  array.forEach((value) => (total = total + value))
  avg = total / array.length
  return avg
}

function getModus(
  array: number[]
): { nilaiModus: number; banyakMuncul: number } {
  let currentModus: [number, number] = [0, 0]
  let counterObj: Record<number, number> = { 0: 0 }
  const distinctArray = new Set(array)

  distinctArray.forEach((value) => {
    counterObj[value] = 0
  })

  array.forEach((value) => {
    counterObj[value] += 1
  })

  for (const [key, value] of Object.entries(counterObj)) {
    if (currentModus[1] == undefined) {
      currentModus = [Number(key), Number(value)]
    } else {
      if (currentModus[1] < value) currentModus = [Number(key), Number(value)]
    }
  }

  return {
    nilaiModus: currentModus[0],
    banyakMuncul: currentModus[1],
  }
}

function getMedian(array: number[]): number {
  const arrayLength = array.length
  const isArrayLengthEven = arrayLength % 2 === 0 ? true : false

  if (isArrayLengthEven) {
    let firstMidIndex = arrayLength / 2
    let secondMidIndex = firstMidIndex + 1
    let result = (array[firstMidIndex] + array[secondMidIndex]) / 2

    return result
  } else {
    let medianIndex = (arrayLength + 1) / 2
    return array[medianIndex]
  }
}
