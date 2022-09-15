export const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomId = () => getRandomArbitrary(1, 99999999999999)
