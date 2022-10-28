import { useState } from 'react'
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'

import { ProductType } from '../types/products'
import ProductForm from '../components/Products/ProductForm'
import DeleteDialog from '../components/Dialogs/DeleteDialog'
import { useDeleteById } from '../hooks/useDeleteById'
import useFetchById from '../hooks/useFetchById'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

const SingleProductView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const toggleDeleteDialog = () => {
    setOpen(!open)
  }

  const {
    data,
    isLoading,
    error: errorFetching,
  } = useFetchById<ProductType>(`product-${id}`, '/products', id || '')

  const {
    handleDeleteById,
    isDeleting,
    error: errorDeleting,
  } = useDeleteById('products')

  const handleDelete = async () => {
    if (id) {
      await handleDeleteById(id)
      if (!errorDeleting) {
        navigate('/products')
        toggleDeleteDialog()
      }
    }
  }

  if (isLoading) return <div>Loading...</div>

  if (errorFetching) return <div>An error occurred</div>

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
          <img
            src={data?.imageUrl || PRODUCT_DEFAULT_IMAGE}
            alt={'Product'}
            style={{ height: 300, width: 300, objectFit: 'cover' }}
          />
          <Stack spacing={4}>
            <Typography variant={'h4'}>{data?.name}</Typography>
            <Typography variant={'body2'}>{data?.description}</Typography>
            <Typography
              fontWeight={500}
              variant='caption'
              color='text.secondary'
            >
              {`Stock: ${data?.stock} units`}
            </Typography>
            <Typography
              fontWeight={500}
              variant='caption'
              color='text.secondary'
            >
              {`Price: ${data?.price} EUR`}
            </Typography>
            <Typography
              fontWeight={500}
              variant='caption'
              color='text.secondary'
            >
              {`Price: ${data?.weight} grams`}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <DeleteDialog
        open={open}
        toggleDialog={toggleDeleteDialog}
        entity={data?.name || ''}
        entityType={'product'}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
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
        <ProductForm editMode defaultValues={data} onSubmit={toggleDrawer} />
      </Drawer>
    </>
  )
}

export default SingleProductView
