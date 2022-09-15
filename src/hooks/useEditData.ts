import { useState } from 'react'
import { useSnackbar } from 'notistack'

import { supabase } from '../supabaseClient'

const useEditData = (table: string) => {
  const [isEditing, setEditing] = useState(false)
  const [error, setError] = useState<unknown | undefined>()
  const { enqueueSnackbar } = useSnackbar()

  const handleEditData = async (newObject: unknown, targetId?: number) => {
    setEditing(true)
    try {
      const { error } = await supabase
        .from(table)
        .update([newObject])
        .match({ id: targetId })
      if (error) {
        throw error
      }
      enqueueSnackbar('Item edited successfully!', { variant: 'success' })
    } catch (error) {
      setError(error)
      enqueueSnackbar('There was an error editing this item', {
        variant: 'error',
      })
    } finally {
      setEditing(false)
    }
  }

  return { handleEditData, isEditing, error }
}

export default useEditData
