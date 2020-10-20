function getMean(array: number[]): number {
  let avg: number
  let total = 0
  array.forEach((value) => (total = total + value))
  avg = total / array.length
  return avg
}

export default getMean;