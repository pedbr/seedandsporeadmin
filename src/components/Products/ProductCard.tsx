import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { api } from '../../api'
import { PRODUCT_DEFAULT_IMAGE } from '../../constants'
import { ProductType } from '../../types/products'
import DeleteDialog from '../Dialogs/DeleteDialog'

const ProductCard = ({
  id,
  imageUrl,
  name,
  stock,
  active,
  discount,
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

  const isDiscountActive = discount > 0

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
            height={300}
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
              <Typography
                height={100}
                gutterBottom
                variant='h5'
                component='div'
              >
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
                <Stack direction={'row'} spacing={2}>
                  <Box
                    bgcolor={active ? 'primary.main' : 'error.main'}
                    px={1}
                    py={0.5}
                    borderRadius={2}
                  >
                    <Typography
                      variant='caption'
                      color='common.white'
                      fontWeight={700}
                    >
                      {active ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                  {isDiscountActive && (
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      bgcolor={'info.main'}
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
                        Discount Active
                      </Typography>
                    </Box>
                  )}
                </Stack>
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
