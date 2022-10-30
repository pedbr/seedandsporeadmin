import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import UploadImage from '../UploadImage'
import { ProductType } from '../../types/products'
import { useSnackbar } from 'notistack'
import { api } from '../../api'
import { useState } from 'react'

interface ProductFormProps {
  onSubmit: () => void
  defaultValues?: ProductType
  editMode?: boolean
}

const ProductForm = ({
  onSubmit: onSubmitCallback,
  defaultValues,
  editMode,
}: ProductFormProps) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { handleSubmit, register } = useForm<ProductType>({ defaultValues })
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl)
  const {
    mutateAsync: editAsync,
    isError: isEditingError,
    isLoading: isEditing,
  } = useMutation((object: Partial<ProductType>) => {
    return api.patch(`/products/${defaultValues?.id || ''}`, object)
  })
  const {
    mutateAsync: createAsync,
    isError: isCreatingError,
    isLoading: isCreating,
  } = useMutation((object: Partial<ProductType>) => {
    return api.post(`/products`, object)
  })

  const onSubmit = async (values: ProductType) => {
    const { name, description, price, stock, weight } = values
    await createAsync({
      name,
      description,
      price,
      stock,
      imageUrl,
      weight,
    })
    if (!isCreatingError) {
      queryClient.invalidateQueries(['products'])
      enqueueSnackbar('Product created successfully!', { variant: 'success' })
      onSubmitCallback()
    } else {
      enqueueSnackbar('There was an error creating this item', {
        variant: 'error',
      })
    }
  }

  const onEdit = async (values: ProductType) => {
    const { name, description, price, stock, weight } = values
    await editAsync({
      name,
      description,
      price,
      stock,
      imageUrl,
      weight,
    })
    if (!isEditingError) {
      queryClient.invalidateQueries([`product-${defaultValues?.id}`])
      enqueueSnackbar('Item edited successfully!', { variant: 'success' })
      onSubmitCallback()
    } else {
      enqueueSnackbar('There was an error editing this item', {
        variant: 'error',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(editMode ? onEdit : onSubmit)}>
      <Stack height={'100%'} justifyContent={'space-between'}>
        <Grid container spacing={3} p={2}>
          <Grid item xs={12}>
            <Typography variant={'h5'}>
              {editMode ? `Edit product` : `Create new product`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={'Name'}
              required
              {...register('name', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={'Description'}
              multiline
              {...register('description')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label={'Price (EUR)'}
              type={'number'}
              {...register('price', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label={'Stock (units)'}
              type={'number'}
              {...register('stock', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label={'Weight (grams)'}
              type={'number'}
              {...register('weight', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <UploadImage
              size={300}
              imageUrl={imageUrl || defaultValues?.imageUrl}
              onUpload={(url) => {
                setImageUrl(url)
              }}
            />
          </Grid>
        </Grid>
        <Stack direction={'row'} justifyContent={'space-between'} p={2}>
          <Button
            disabled={isEditing || isCreating}
            onClick={() => onSubmitCallback()}
            variant={'outlined'}
          >
            Cancel
          </Button>
          <Button
            disabled={isEditing || isCreating}
            type={'submit'}
            variant={'contained'}
          >
            {editMode ? `Edit product` : `Create product`}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default ProductForm
