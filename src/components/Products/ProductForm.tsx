import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'

import UploadImage from '../UploadImage'
import { supabase } from '../../supabaseClient'
import useStore from '../../store'
import { ProductType } from '../../types/products'

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
  const { enqueueSnackbar } = useSnackbar()
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState<string | undefined>(defaultValues?.name)
  const [description, setDescription] = useState<string | undefined>(
    defaultValues?.description
  )
  const [price, setPrice] = useState<number | undefined>(defaultValues?.price)
  const [stock, setStock] = useState<number | undefined>(defaultValues?.stock)
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    defaultValues?.imageUrl
  )

  const missingFields = !name || !price || !stock

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('products')
        .insert([{ name, description, price, stock, imageUrl }])
      if (error) {
        console.log(error)
        enqueueSnackbar('There was an error creating this product', {
          variant: 'error',
        })
        return
      }
      triggerRefetchProducts()
      enqueueSnackbar('Product created successfully!', { variant: 'success' })
      onSubmit()
    } catch (error) {
      console.log('error', error)
      enqueueSnackbar('There was an error creating this product', {
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = async () => {
    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('products')
        .update([{ name, description, price, stock, imageUrl }])
        .match({ id: defaultValues?.id })
      if (error) {
        console.log(error)
        enqueueSnackbar('There was an error editing this product', {
          variant: 'error',
        })
        return
      }
      triggerRefetchSingleProduct()
      enqueueSnackbar('Product edited successfully!', { variant: 'success' })
      onSubmit()
    } catch (error) {
      console.log('error', error)
      enqueueSnackbar('There was an error editing this product', {
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
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
            defaultValue={defaultValues?.name}
            label={'Name'}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'Description'}
            defaultValue={defaultValues?.description}
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
            defaultValue={defaultValues?.price}
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
            defaultValue={defaultValues?.stock}
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
          disabled={submitting}
          onClick={() => onSubmit()}
          variant={'outlined'}
        >
          Cancel
        </Button>
        <Button
          disabled={missingFields || submitting}
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
