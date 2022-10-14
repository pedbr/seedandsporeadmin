import { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'

import { api } from '../api'

export const useDeleteById = (
  endpoint: string
): {
  handleDeleteById: (id: string) => Promise<void>
  isDeleting: boolean
  error: unknown | undefined
} => {
  const [isDeleting, setDeleting] = useState(false)
  const [error, setError] = useState<unknown>()
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteById = useCallback(
    async (id: string) => {
      setDeleting(true)
      try {
        const { status, data } = await api.delete(`${endpoint}/${id}`)
        if (status === 200) {
          enqueueSnackbar('This item was successfully deleted', {
            variant: 'info',
          })
        } else {
          throw new Error(data?.message)
        }
      } catch (error) {
        setError(error)
        enqueueSnackbar('There was an error deleting this item', {
          variant: 'error',
        })
      } finally {
        setDeleting(false)
      }
    },
    [endpoint, enqueueSnackbar]
  )

  return { handleDeleteById, isDeleting, error }
}
