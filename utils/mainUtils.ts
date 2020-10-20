interface FilteredRecord {
  id: number
  key: number
  name: string
  kota: string
  data: number
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

export { getData, extractValuesFromRecords }
