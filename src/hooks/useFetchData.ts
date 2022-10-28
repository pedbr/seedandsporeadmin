import { useSnackbar } from 'notistack'
import { useQuery } from '@tanstack/react-query'

import { api } from '../api'

export async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await api.get(endpoint)
  return res?.data
}

export function useFetchData<T>(
  key: string,
  endpoint: string,
  queryOptions?: {}
) {
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading, error, isFetching, isError, refetch } = useQuery<T>(
    [key],
    () => fetchData(endpoint),
    queryOptions
  )

  if (isError) {
    enqueueSnackbar('There was an error fetching data', {
      variant: 'error',
    })
  }

  return { data, isFetching, error, isLoading, refetch }
}

export default useFetchData
