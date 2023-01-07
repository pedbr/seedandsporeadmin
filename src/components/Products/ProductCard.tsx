import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  CardActionArea,
  Box,
} from '@mui/material'

import { ProductType } from '../../types/products'
import { PRODUCT_DEFAULT_IMAGE } from '../../constants'
import DeleteDialog from '../Dialogs/DeleteDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../api'
import { useSnackbar } from 'notistack'

const ProductCard = ({
  id,
  imageUrl,
  name,
  stock,
  price,
  weight,
}: ProductType) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const {
    mutateAsync: deleteAsync,
    isError: isDeletingError,
    isLoading: isDeleting,
  } = useMutation(() => {
    return api.delete(`/products/${id}`)
  })
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const toggleDeleteDialog = () => {
    setOpen(!open)
  }

  const handleDelete = async () => {
    if (id) {
      await deleteAsync()
      if (!isDeletingError) {
        queryClient.invalidateQueries(['products'])
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

  return (
    <>
      <Card
        sx={{
          borderRadius: '16px',
        }}
      >
        <CardActionArea onClick={() => navigate(`/product/${id}`)}>
          <CardMedia
            component='img'
            image={imageUrl || PRODUCT_DEFAULT_IMAGE}
          />
          <CardContent>
            <Box p={2}>
              <Typography
                variant='body2'
                color={`${stock > 0 ? 'success' : 'error'}.main`}
              >
                {stock > 0 ? 'In stock' : 'Out of stock'}
              </Typography>
              <Typography gutterBottom variant='h5' component='div'>
                {name?.en}
              </Typography>
              <Stack direction={'row'} justifyContent={'space-between'} mt={4}>
                <Box
                  bgcolor={'secondary.main'}
                  px={1}
                  py={0.5}
                  borderRadius={2}
                >
                  <Typography
                    variant='caption'
                    color='common.black'
                    fontWeight={700}
                  >{`${stock} Units`}</Typography>
                </Box>
                <Box bgcolor={'primary.main'} px={1} py={0.5} borderRadius={2}>
                  <Typography
                    variant='caption'
                    color='common.white'
                    fontWeight={700}
                  >{`${price} EUR`}</Typography>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <DeleteDialog
        open={open}
        toggleDialog={toggleDeleteDialog}
        entity={name?.en || ''}
        entityType={'product'}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}

export default ProductCard
