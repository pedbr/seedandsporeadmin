import { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import { supabase } from '../supabaseClient'

function useFetchById<T>(table: string, id?: number, refetch?: number) {
  const [item, setItem] = useState<T>()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<unknown | undefined>()
  const { enqueueSnackbar } = useSnackbar()

  const fetchProduct = useCallback(async () => {
    setIsFetching(true)
    try {
      const { data, error } = await supabase
        .from(table)
        .select()
        .eq('id', id)
        .single()
      if (error) {
        throw error
      }
      setItem(data)
    } catch (error) {
      setError(error)
      enqueueSnackbar('There was an error fetching this item', {
        variant: 'error',
      })
    } finally {
      setIsFetching(false)
    }
  }, [table, id, enqueueSnackbar])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct, refetch])

  return { item, isFetching, error }
}

export default useFetchById
