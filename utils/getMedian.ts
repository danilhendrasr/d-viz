function getMedian(array: number[]): number {
  const arrayLength = array.length
  let firstMidIndex = arrayLength / 2
  let secondMidIndex = firstMidIndex + 1
  let result = (array[firstMidIndex] + array[secondMidIndex]) / 2

  return result
}

export default getMedian
