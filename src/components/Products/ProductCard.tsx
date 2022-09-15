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
import useStore from '../../store'
import { useGetImage } from '../../hooks/useGetImage'
import { useDeleteById } from '../../hooks/useDeleteById'
import DeleteDialog from '../Dialogs/DeleteDialog'

const ProductCard = ({
  id,
  imageUrl: imagePath,
  name,
  description,
  stock,
  price,
  available,
}: ProductType) => {
  const [open, setOpen] = useState(false)
  const triggerRefetchProducts = useStore(
    (state) => state.triggerRefetchProducts
  )
  const navigate = useNavigate()
  const { imageUrl, isImageLoading } = useGetImage('product-images', imagePath)
  const { handleDeleteById, isDeleting, error } = useDeleteById('products')

  const toggleDeleteDialog = () => {
    setOpen(!open)
  }

  const handleDelete = async () => {
    await handleDeleteById(id)
    if (!error) {
      triggerRefetchProducts()
      toggleDeleteDialog()
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
        {isImageLoading ? (
          'Loading...'
        ) : (
          <CardMedia
            component='img'
            height={'140px'}
            width={'140px'}
            image={imageUrl || PRODUCT_DEFAULT_IMAGE}
            alt='green iguana'
          />
        )}
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
                {`Stock: ${stock}`}
              </Typography>
              <Typography
                fontWeight={500}
                variant='caption'
                color='text.secondary'
              >
                {`Price: ${price}EUR`}
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
