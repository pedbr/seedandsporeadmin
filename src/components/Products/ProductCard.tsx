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

const ProductCard = ({
  imageUrl,
  name,
  description,
  stock,
  price,
  available,
}: ProductType) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={imageUrl || PRODUCT_DEFAULT_IMAGE}
          alt='green iguana'
        />
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
