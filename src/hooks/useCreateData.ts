import { useSnackbar } from 'notistack'
import { useState } from 'react'

import { supabase } from '../supabaseClient'

const useCreateData = (table: string) => {
  const [isCreating, setCreating] = useState(false)
  const [error, setError] = useState<unknown | undefined>()
  const { enqueueSnackbar } = useSnackbar()

  const handleCreateData = async (item: unknown) => {
    setCreating(true)
    try {
      const { error } = await supabase.from(table).insert([item])
      if (error) {
        throw error
      }
      enqueueSnackbar('Product created successfully!', { variant: 'success' })
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
