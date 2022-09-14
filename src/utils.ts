import { supabase } from './supabaseClient'

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomId = () => getRandomArbitrary(1, 99999999999999)

export const downloadImage = async (bucketName: string, path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(path)
    if (error) {
      throw error
    }
    const url = URL.createObjectURL(data)
    return url
  } catch (error: any) {
    console.log('Error downloading image: ', error.message)
  }
}
