const getVariants = (data: number[]): number => {
  const arrayLength = data.length
  let dataSum = 0
  data.forEach((value) => (dataSum += value))

  let squaredDataSum = 0
  data.forEach((value) => {
    let squaredValue = Math.pow(value, 2)
    squaredDataSum += squaredValue
  })

  const dataSumSquared = Math.pow(dataSum, 2)

  const variants =
    (arrayLength * squaredDataSum - dataSumSquared) /
    (arrayLength * (arrayLength - 1))

  return variants
}

const getStdDeviation = (variants: number): number => {
  const stdDeviation = Math.sqrt(variants)
  return stdDeviation
}

export { getVariants, getStdDeviation }
