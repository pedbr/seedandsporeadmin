import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
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
  description,
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
          display: 'flex',
          '.MuiCardMedia-root': {
            width: '140px',
            minWidth: '140px',
          },
        }}
      >
        <CardMedia
          component='img'
          height={'140px'}
          width={'140px'}
          image={imageUrl || PRODUCT_DEFAULT_IMAGE}
          alt='green iguana'
        />

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {description}
            </Typography>
            <Stack direction={'row'} spacing={4} mt={2}>
              <Typography
                fontWeight={500}
                variant='caption'
                color='text.secondary'
              >
                {`Stock: ${stock} Units`}
              </Typography>
              <Typography
                fontWeight={500}
                variant='caption'
                color='text.secondary'
              >
                {`Price: ${price} EUR`}
              </Typography>
              <Typography
                fontWeight={500}
                variant='caption'
                color='text.secondary'
              >
                {`Weight: ${weight} grams`}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions sx={{ paddingX: 4 }}>
            <Stack spacing={2}>
              <Button
                onClick={() => navigate(`/product/${id}`)}
                size='small'
                color='primary'
                variant='outlined'
              >
                Open
              </Button>
              <Button
                onClick={() => toggleDeleteDialog()}
                size='small'
                color='error'
                variant='outlined'
                disabled={isDeleting}
              >
                Delete
              </Button>
            </Stack>
          </CardActions>
        </Stack>
      </Card>
      <DeleteDialog
        open={open}
        toggleDialog={toggleDeleteDialog}
        entity={name}
        entityType={'product'}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}

export default ProductCard
