import { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import { api } from '../api'

function useFetchData<T>(endpoint: string, refetch?: number) {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<unknown | undefined>()
  const [isFetching, setIsFetching] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const fetchProducts = useCallback(async () => {
    setIsFetching(true)
    try {
      const { data, status } = await api.get(endpoint)
      if (status === 200) {
        setData(data)
      } else {
        throw new Error(data?.message)
      }
    } catch (error) {
      setError(error)
      enqueueSnackbar('There was an error fetching data', {
        variant: 'error',
      })
    } finally {
      setIsFetching(false)
    }
  }, [enqueueSnackbar, endpoint])

  useEffect(() => {
    fetchProducts()
  }, [refetch, fetchProducts])

  return { data, isFetching, error }
}

export default useFetchData
