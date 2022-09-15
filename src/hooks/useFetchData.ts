import { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import { supabase } from '../supabaseClient'

function useFetchData<T>(table: string, refetch?: number) {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<unknown | undefined>()
  const [isFetching, setIsFetching] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const fetchProducts = useCallback(async () => {
    setIsFetching(true)
    try {
      const { data, error } = await supabase.from('products').select()
      if (error) {
        throw error
      }
      setData(data)
    } catch (error) {
      setError(error)
      enqueueSnackbar('There was an error fetching data', {
        variant: 'error',
      })
    } finally {
      setIsFetching(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchProducts()
  }, [refetch, fetchProducts])

  return { data, isFetching, error }
}

export default useFetchData
