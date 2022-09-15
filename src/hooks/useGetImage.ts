import { StorageError } from '@supabase/storage-js'
import { useCallback, useEffect, useState } from 'react'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import { supabase } from '../supabaseClient'

export const useGetImage = (
  bucketName: string,
  path?: string
): {
  imageUrl: string
  isImageLoading: boolean
  error: StorageError | undefined
} => {
  const [imageUrl, setImageUrl] = useState<string>(PRODUCT_DEFAULT_IMAGE)
  const [isImageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState<StorageError | undefined>()

  const fetchImageUrl = useCallback(async () => {
    setImageLoading(true)
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download(path || '')
      if (error) {
        setError(error)
      }
      if (data) {
        const url = URL.createObjectURL(data)
        setImageUrl(url)
      }
    } catch (error: any) {
      setError(error)
    } finally {
      setImageLoading(false)
    }
  }, [bucketName, path])

  useEffect(() => {
    if (path) fetchImageUrl()
  }, [path, fetchImageUrl])

  return { imageUrl, isImageLoading, error }
}
