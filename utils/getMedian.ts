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

export default getMedian
