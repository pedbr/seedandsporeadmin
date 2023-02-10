import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { api } from '../api'
import DeleteDialog from '../components/Dialogs/DeleteDialog'
import Drawer from '../components/Drawer/Drawer'
import Loader from '../components/Loader/Loader'
import ProductForm from '../components/Products/ProductForm'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import useFetchById from '../hooks/useFetchById'
import { ProductType } from '../types/products'

const SingleProductView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    mutateAsync: deleteAsync,
    isError: isDeletingError,
    isLoading: isDeleting,
  } = useMutation(() => {
    return api.delete(`/products/${id}`)
  })
  const {
    mutateAsync: editAsync,
    isError: isEditingError,
    isLoading: isEditing,
  } = useMutation((object: Partial<ProductType>) => {
    return api.patch(`/products/${id}`, object)
  })
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const queryClient = useQueryClient()

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const toggleDeleteDialog = () => {
    setOpen(!open)
  }

  const {
    data,
    isLoading,
    error: errorFetching,
  } = useFetchById<ProductType>(`product-${id}`, '/products', id || '')

  const handleDelete = async () => {
    if (id) {
      await deleteAsync()
      if (!isDeletingError) {
        navigate('/products')
        enqueueSnackbar('This item was successfully deleted', {
          variant: 'info',
        })
        toggleDeleteDialog()
      } else {
        enqueueSnackbar('There was an error deleting this item', {
          variant: 'error',
        })
      }
    }
  }

  const onChangeStatus = async () => {
    await editAsync({ active: !data?.active })
    if (!isEditingError) {
      queryClient.invalidateQueries([`product-${id}`])
      enqueueSnackbar('Item edited successfully!', { variant: 'success' })
    } else {
      enqueueSnackbar('There was an error editing this item', {
        variant: 'error',
      })
    }
  }

  if (isLoading) return <Loader />

  if (errorFetching) return <div>An error occurred</div>

  return (
    <>
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'} mb={4}>
          <IconButton onClick={() => navigate('/products')}>
            <ArrowBackIcon />
          </IconButton>
        </Stack>
        <Paper sx={{ borderRadius: '16px', padding: '24px' }}>
          <Stack direction={'row'} spacing={6} width={'100%'}>
            <img
              src={data?.imageUrl || PRODUCT_DEFAULT_IMAGE}
              alt={'Product'}
              style={{
                height: 500,
                width: 500,
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
            <Stack justifyContent={'space-between'} width={'100%'}>
              <Stack>
                <Stack direction={'row'}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    bgcolor={
                      (data?.stock || 0) > 0 ? 'success.main' : 'error.main'
                    }
                    px={1}
                    py={0.5}
                    borderRadius={2}
                    width={(data?.stock || 0) > 0 ? 62 : 90}
                    mb={1}
                    mr={1}
                  >
                    <Typography
                      variant='caption'
                      color='common.white'
                      fontWeight={500}
                    >
                      {(data?.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </Box>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    bgcolor={data?.active ? 'primary.main' : 'warning.main'}
                    px={1}
                    py={0.5}
                    borderRadius={2}
                    mb={1}
                  >
                    <Typography
                      variant='caption'
                      color='common.white'
                      fontWeight={500}
                    >
                      {data?.active ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant={'h1'} mb={2}>
                  {data?.name?.en}
                </Typography>
                <Typography variant={'body2'} color={'text.secondary'} mb={4}>
                  {data?.description?.en}
                </Typography>
                <Stack mb={2}>
                  <Typography
                    fontWeight={500}
                    variant='caption'
                    color='text.secondary'
                  >
                    {`Status`}
                  </Typography>
                  <Typography fontWeight={500} variant='h1'>
                    {data?.active ? 'Active' : 'Hidden'}
                  </Typography>
                </Stack>
                <Stack mb={2}>
                  <Typography
                    fontWeight={500}
                    variant='caption'
                    color='text.secondary'
                  >
                    {`Stock`}
                  </Typography>
                  <Typography fontWeight={500} variant='h1'>
                    {`${data?.stock} Units`}
                  </Typography>
                </Stack>
                <Stack mb={2}>
                  <Typography
                    fontWeight={500}
                    variant='caption'
                    color='text.secondary'
                  >
                    {`Price`}
                  </Typography>
                  <Typography fontWeight={500} variant='h1'>
                    {`${data?.price}EUR`}
                  </Typography>
                </Stack>
                <Stack mb={4}>
                  <Typography
                    fontWeight={500}
                    variant='caption'
                    color='text.secondary'
                  >
                    {`Weight`}
                  </Typography>
                  <Typography fontWeight={500} variant='h1'>
                    {`${data?.weight}G`}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction={'row'} spacing={2} width={'70%'}>
                <Button
                  fullWidth
                  onClick={toggleDeleteDialog}
                  variant={'contained'}
                  color={'error'}
                >
                  Delete
                </Button>
                <Button
                  fullWidth
                  onClick={onChangeStatus}
                  variant={'contained'}
                  color={'secondary'}
                  disabled={isEditing}
                >
                  {data?.active ? 'Hide' : 'Show'}
                </Button>
                <Button
                  fullWidth
                  onClick={() => toggleDrawer()}
                  variant={'contained'}
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Box>
      <DeleteDialog
        open={open}
        toggleDialog={toggleDeleteDialog}
        entity={data?.name?.en || ''}
        entityType={'product'}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
      <Drawer open={isDrawerOpen} onClose={() => toggleDrawer()}>
        <ProductForm editMode defaultValues={data} onSubmit={toggleDrawer} />
      </Drawer>
    </>
  )
}

export default SingleProductView
