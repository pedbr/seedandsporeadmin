import { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import { api } from '../api'

function useFetchById<T>(endpoint: string, id?: number, refetch?: number) {
  const [item, setItem] = useState<T>()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<unknown | undefined>()
  const { enqueueSnackbar } = useSnackbar()

  const fetchProduct = useCallback(async () => {
    setIsFetching(true)
    try {
      const { data, status } = await api.get(`${endpoint}/${id}`)
      if (status === 200) {
        setItem(data)
      } else {
        throw new Error(data?.message)
      }
    } catch (error) {
      setError(error)
      enqueueSnackbar('There was an error fetching this item', {
        variant: 'error',
      })
    } finally {
      setIsFetching(false)
    }
  }, [endpoint, id, enqueueSnackbar])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct, refetch])

  return { item, isFetching, error }
}

export default useFetchById
