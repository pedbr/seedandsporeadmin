import {
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { ProductType } from '../../types/products'
import { PRODUCT_DEFAULT_IMAGE } from '../../constants'
import { useCallback, useEffect, useState } from 'react'
import { downloadImage } from '../../utils'
import { supabase } from '../../supabaseClient'
import useStore from '../../store'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({
  id,
  imageUrl,
  name,
  description,
  stock,
  price,
  available,
}: ProductType) => {
  const [isImageLoading, setImageLoading] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const triggerRefetchProducts = useStore(
    (state) => state.triggerRefetchProducts
  )
  const navigate = useNavigate()

  const toggleDeleteDialog = () => {
    setOpen(!open)
  }

  const fetchImage = useCallback(async () => {
    setImageLoading(true)
    try {
      const fileUrl = await downloadImage('product-images', imageUrl)
      setImage(fileUrl)
    } catch (error) {
      console.error(error)
    } finally {
      setImageLoading(false)
    }
  }, [imageUrl])

  useEffect(() => {
    fetchImage()
  }, [fetchImage])

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .delete()
        .match({ id })
      console.log('delete Data', data)
      console.log('delete Error', error)
      triggerRefetchProducts()
      toggleDeleteDialog()
    } catch (error) {
      console.log(error)
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
            image={image || PRODUCT_DEFAULT_IMAGE}
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
              >
                Delete
              </Button>
            </Stack>
          </CardActions>
        </Stack>
      </Card>
      <Dialog open={open} onClose={toggleDeleteDialog}>
        <DialogTitle id='alert-dialog-title'>{`Delete ${name}?`}</DialogTitle>
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
    </>
  )
}

export default ProductCard
