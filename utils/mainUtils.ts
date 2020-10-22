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

const getData = async () => {
  const records = await fetchDataFromAirtable()
  const filteredRecords = filterFetchedData(records)
  return filteredRecords
}

const fetchDataFromAirtable = async () => {
  const response = await fetch(
    "https://api.airtable.com/v0/appqjyXJh5Z4SOlcL/STATKOM-D?api_key=keyCQJU1TL6nSy9A8"
  )
  const records = (await response.json()).records
  return records
}

const filterFetchedData = (records: any[]) => {
  const filteredRecords: FilteredRecord[] = records.map((record, index) => {
    return {
      id: index,
      key: index + 1,
      name: record.fields["Name"],
      kota: record.fields["Kota"],
      data: record.fields["Biaya Internet per Bulan"],
    }
  })

  return filteredRecords
}

const extractValuesFromRecords = (filteredRecords: FilteredRecord[]) => {
  const recordValues: number[] = filteredRecords.map((record) => {
    return record.data
  })
  const sortedValues = sortValues(recordValues)
  return sortedValues
}

const sortValues = (recordValues: number[]) => {
  const sortedRecordValues: number[] = recordValues.sort((a, b) => a - b)
  return sortedRecordValues
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

export {
  getData,
  extractValuesFromRecords,
  getFrequencyTableFromRecordValues,
  getFreqDistObject,
}
