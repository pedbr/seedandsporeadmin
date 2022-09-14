import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { ProductType } from '../../types/products'
import { PRODUCT_DEFAULT_IMAGE } from '../../constants'
import { useCallback, useEffect, useState } from 'react'
import { downloadImage } from '../../utils'

const ProductCard = ({
  imageUrl,
  name,
  description,
  stock,
  price,
  available,
}: ProductType) => {
  const [isImageLoading, setImageLoading] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined)

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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {isImageLoading ? (
          'Loading...'
        ) : (
          <CardMedia
            component='img'
            height='140'
            image={image || PRODUCT_DEFAULT_IMAGE}
            alt='green iguana'
          />
        )}

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Open
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
