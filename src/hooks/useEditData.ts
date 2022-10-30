import { useSnackbar } from 'notistack'
import { useMutation } from '@tanstack/react-query'

import { api } from '../api'

function useEditData<T>(endpoint: string, targetId: string) {
  const {
    mutate: edit,
    mutateAsync: editAsync,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useMutation((object: T) => {
    return api.patch(`${endpoint}/${targetId}`, object)
  })
  const { enqueueSnackbar } = useSnackbar()

  console.log('rendering')

  if (isError) {
    enqueueSnackbar('There was an error editing this item', {
      variant: 'error',
    })
  }

  if (isSuccess) {
    enqueueSnackbar('Item edited successfully!', { variant: 'success' })
  }

  return { edit, editAsync, isLoading, error, isError }
}

export default useEditData
