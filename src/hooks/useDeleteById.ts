import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { supabase } from '../supabaseClient'

export const useDeleteById = (
  table: string
): {
  handleDeleteById: (id: number) => Promise<void>
  isDeleting: boolean
  error: unknown | undefined
} => {
  const [isDeleting, setDeleting] = useState(false)
  const [error, setError] = useState<unknown>()
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteById = useCallback(
    async (id: number) => {
      setDeleting(true)
      try {
        const { error } = await supabase.from(table).delete().match({ id })
        if (error) throw error
        enqueueSnackbar('This item was successfully deleted', {
          variant: 'success',
        })
      } catch (error) {
        setError(error)
        enqueueSnackbar('There was an error deleting this item', {
          variant: 'error',
        })
      } finally {
        setDeleting(false)
      }
    },
    [table, enqueueSnackbar]
  )

  return { handleDeleteById, isDeleting, error }
}
