import { useState } from 'react'
import { useSnackbar } from 'notistack'

import { api } from '../api'

const useEditData = (endpoint: string) => {
  const [isEditing, setEditing] = useState(false)
  const [error, setError] = useState<unknown | undefined>()
  const { enqueueSnackbar } = useSnackbar()

  const handleEditData = async (newObject: unknown, targetId?: string) => {
    setEditing(true)
    try {
      const { status, data } = await api.patch(
        `${endpoint}/${targetId}`,
        newObject
      )
      if (status === 200) {
        enqueueSnackbar('Item edited successfully!', { variant: 'success' })
      } else {
        throw new Error(data?.message)
      }
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
