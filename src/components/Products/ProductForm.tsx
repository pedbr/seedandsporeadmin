import { useState } from 'react'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'

import UploadImage from '../UploadImage'
import useStore from '../../store'
import { ProductType } from '../../types/products'
import useCreateData from '../../hooks/useCreateData'
import useEditData from '../../hooks/useEditData'

interface ProductFormProps {
  onSubmit: () => void
  defaultValues?: ProductType
  editMode?: boolean
}

const ProductForm = ({
  onSubmit,
  defaultValues,
  editMode,
}: ProductFormProps) => {
  const triggerRefetchProducts = useStore(
    (state) => state.triggerRefetchProducts
  )
  const triggerRefetchSingleProduct = useStore(
    (state) => state.triggerRefetchSingleProduct
  )
  const [name, setName] = useState<string>(defaultValues?.name || '')
  const [description, setDescription] = useState<string>(
    defaultValues?.description || ''
  )
  const [price, setPrice] = useState<number>(defaultValues?.price || 0)
  const [stock, setStock] = useState<number>(defaultValues?.stock || 0)
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    defaultValues?.imageUrl
  )

  const { handleCreateData, isCreating, error } = useCreateData('products')

  const {
    handleEditData,
    isEditing,
    error: editingError,
  } = useEditData('products')

  const missingFields = !name || !price || !stock

  const handleSubmit = async () => {
    await handleCreateData({ name, description, price, stock, imageUrl })
    if (!error) {
      triggerRefetchProducts()
      onSubmit()
    }
  }

  const handleEdit = async () => {
    await handleEditData(
      { name, description, price, stock, imageUrl },
      defaultValues?.id
    )
    if (!editingError) {
      triggerRefetchSingleProduct()
      onSubmit()
    }
  }

  return (
    <Stack height={'100%'} justifyContent={'space-between'}>
      <Grid container spacing={3} p={2}>
        <Grid item xs={12}>
          <Typography variant={'h5'}>
            {editMode ? `Edit product` : `Create new product`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label={'Name'}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'Description'}
            multiline
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            type={'number'}
            label={'Price (EUR)'}
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            type={'number'}
            label={'Stock (units)'}
            onChange={(e) => setStock(Number(e.target.value))}
            value={stock}
          />
        </Grid>
        <Grid item xs={12}>
          <UploadImage
            size={300}
            imagePath={imageUrl || defaultValues?.imageUrl}
            onUpload={(url) => {
              setImageUrl(url)
            }}
          />
        </Grid>
      </Grid>
      <Stack direction={'row'} justifyContent={'space-between'} p={2}>
        <Button
          disabled={isEditing || isCreating}
          onClick={() => onSubmit()}
          variant={'outlined'}
        >
          Cancel
        </Button>
        <Button
          disabled={missingFields || isEditing || isCreating}
          onClick={() => (editMode ? handleEdit() : handleSubmit())}
          variant={'contained'}
        >
          {editMode ? `Edit product` : `Create product`}
        </Button>
      </Stack>
    </Stack>
  )
}

export default ProductForm
