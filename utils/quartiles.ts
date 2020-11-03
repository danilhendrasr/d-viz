const getQuartiles = (
  data: number[]
): { quartile1: number; quartile2: number; quartile3: number } => {
  const ARRAY_LENGTH = data.length
  const MID_IDX = ARRAY_LENGTH / 2
  const ARRAY_QUARTER_LENGTH = (MID_IDX + 1) / 2

  let quartile2 = (data[MID_IDX] + data[MID_IDX + 1]) / 2

  const FIRST_QUARTER_IDX = MID_IDX - ARRAY_QUARTER_LENGTH
  let quartile1 = data[FIRST_QUARTER_IDX]

  const THIRD_QUARTER_IDX = MID_IDX + ARRAY_QUARTER_LENGTH
  let quartile3 = data[THIRD_QUARTER_IDX]

  return {
    quartile1,
    quartile2,
    quartile3,
  }
}

export { getQuartiles }
