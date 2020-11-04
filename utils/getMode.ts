interface returnObject {
  modus: number
  frekuensiModus: number
}

function getMode(array: number[]): returnObject {
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
    modus: currentModus[0],
    frekuensiModus: currentModus[1],
  }
}

export default getMode
