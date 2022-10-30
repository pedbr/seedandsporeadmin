import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import UploadImage from '../UploadImage'
import { ProductType } from '../../types/products'
import useCreateData from '../../hooks/useCreateData'
import useEditData from '../../hooks/useEditData'

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
  const { handleSubmit, register } = useForm<ProductType>({ defaultValues })

  console.log('rendering form')

  const { handleCreateData, isCreating, error } = useCreateData('/products')

  const {
    editAsync,
    isLoading: isEditing,
    error: editingError,
  } = useEditData<Partial<ProductType>>('/products', defaultValues?.id || '')

  const onSubmit = async (values: ProductType) => {
    const { name, description, price, stock, imageUrl, weight } = values
    await handleCreateData({
      name,
      description,
      price,
      stock,
      imageUrl,
      weight,
    })
    if (!error) {
      queryClient.invalidateQueries(['products'])
      onSubmitCallback()
    }
  }

  const onEdit = async (values: ProductType) => {
    const { name, description, price, stock, imageUrl, weight } = values
    await editAsync({
      name,
      description,
      price,
      stock,
      imageUrl,
      weight,
    })
    if (!editingError) {
      queryClient.invalidateQueries([`product-${defaultValues?.id}`])
      onSubmitCallback()
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
          {/* <Grid item xs={12}>
            <UploadImage
              size={300}
              imageUrl={imageUrl || defaultValues?.imageUrl}
              onUpload={(url) => {
                setImageUrl(url)
              }}
            />
          </Grid> */}
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
