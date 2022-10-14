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
import useStore from '../store'
import DeleteDialog from '../components/Dialogs/DeleteDialog'
import { useDeleteById } from '../hooks/useDeleteById'
import useFetchById from '../hooks/useFetchById'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

const SingleProductView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const refetchSingleProduct = useStore((state) => state.refetchSingleProduct)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const toggleDeleteDialog = () => {
    setOpen(!open)
  }

  const {
    item,
    isFetching,
    error: errorFetching,
  } = useFetchById<ProductType>('products', Number(id), refetchSingleProduct)

  const {
    handleDeleteById,
    isDeleting,
    error: errorDeleting,
  } = useDeleteById('products')

  const handleDelete = async () => {
    await handleDeleteById(Number(id))
    if (!errorDeleting) {
      navigate('/products')
      toggleDeleteDialog()
    }
  }

  if (isFetching) return <div>Loading...</div>

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
            src={item?.imageUrl || PRODUCT_DEFAULT_IMAGE}
            alt={'Product'}
            style={{ height: 300, width: 300, objectFit: 'cover' }}
          />
          <Stack spacing={4}>
            <Typography variant={'h4'}>{item?.name}</Typography>
            <Typography variant={'body2'}>{item?.description}</Typography>
            <Typography
              fontWeight={500}
              variant='caption'
              color='text.secondary'
            >
              {`Stock: ${item?.stock}`}
            </Typography>
            <Typography
              fontWeight={500}
              variant='caption'
              color='text.secondary'
            >
              {`Price: ${item?.price}EUR`}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <DeleteDialog
        open={open}
        toggleDialog={toggleDeleteDialog}
        entity={item?.name || ''}
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
        <ProductForm editMode defaultValues={item} onSubmit={toggleDrawer} />
      </Drawer>
    </>
  )
}

export default SingleProductView
