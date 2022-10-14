import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { api } from '../api'

const useCreateData = (endpoint: string) => {
  const [isCreating, setCreating] = useState(false)
  const [error, setError] = useState<unknown | undefined>()
  const { enqueueSnackbar } = useSnackbar()

  const handleCreateData = async (item: unknown) => {
    setCreating(true)
    try {
      const { status, data } = await api.post(endpoint, item)
      if (status === 200) {
        enqueueSnackbar('Product created successfully!', { variant: 'success' })
      } else {
        throw new Error(data?.message)
      }
    } catch (error) {
      setError(error)
      enqueueSnackbar('There was an error creating this item', {
        variant: 'error',
      })
    } finally {
      setCreating(false)
    }
  }
  return { handleCreateData, isCreating, error }
}

export default useCreateData
