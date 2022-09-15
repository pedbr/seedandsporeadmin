import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { ProductType } from '../types/products'
import ProductForm from '../components/Products/ProductForm'
import useStore from '../store'
import { useGetImage } from '../hooks/useGetImage'

const SingleProductView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const [product, setProduct] = useState<ProductType | undefined>()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const refetchSingleProduct = useStore((state) => state.refetchSingleProduct)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const toggleDeleteDialog = () => {
    setOpen(!open)
  }

  const { imageUrl, isImageLoading } = useGetImage(
    'product-images',
    product?.imageUrl
  )

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select()
          .eq('id', id)
          .single()
        setProduct(data)
        console.log('data', data)
        console.log('error', error)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [id, refetchSingleProduct])

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .delete()
        .match({ id })
      console.log('delete Data', data)
      console.log('delete Error', error)
      navigate('/products')
      toggleDeleteDialog()
    } catch (error) {
      console.log(error)
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <>
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'} mb={4}>
          <IconButton onClick={() => navigate('/products')}>
            <ArrowBackIcon />
          </IconButton>
          <Stack direction={'row'} spacing={2}>
            <Button
              onClick={toggleDeleteDialog}
              variant={'outlined'}
              color={'error'}
            >
              Delete
            </Button>
            <Button onClick={() => toggleDrawer()} variant={'contained'}>
              Edit
            </Button>
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          {isImageLoading ? (
            'Loading...'
          ) : (
            <img
              src={imageUrl}
              alt={'Product'}
              style={{ height: 300, width: 300, objectFit: 'cover' }}
            />
          )}
          <Stack spacing={4}>
            <Typography variant={'h4'}>{product.name}</Typography>
            <Typography variant={'body2'}>{product.description}</Typography>
            <Typography
              fontWeight={500}
              variant='caption'
              color='text.secondary'
            >
              {`Stock: ${product.stock}`}
            </Typography>
            <Typography
              fontWeight={500}
              variant='caption'
              color='text.secondary'
            >
              {`Price: ${product.price}EUR`}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Dialog open={open} onClose={toggleDeleteDialog}>
        <DialogTitle id='alert-dialog-title'>{`Delete ${product.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you wish to delete this product? This action is
            permanent and will delete all the product's information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDeleteDialog} variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='error'
            variant='contained'
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={() => toggleDrawer()}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 2,
          '.MuiPaper-root': {
            width: '400px',
          },
        })}
      >
        <ProductForm editMode defaultValues={product} onSubmit={toggleDrawer} />
      </Drawer>
    </>
  )
}

export default SingleProductView
