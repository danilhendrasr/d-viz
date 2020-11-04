function getMode(array: number[]): number {
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

  const modus = currentModus[0]

  return modus
}

export default getMode
