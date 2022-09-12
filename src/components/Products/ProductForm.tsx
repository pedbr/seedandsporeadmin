import { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import UploadImage from '../UploadImage'
import { supabase } from '../../supabaseClient'

const ProductForm = () => {
  const [name, setName] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  const [stock, setStock] = useState<number | undefined>()
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('products')
      .insert([{ name, description, price, stock, imageUrl }])
    console.log('data', data)
    console.log('error', error)
  }

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={'Name'}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={'Description'}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={'Price'}
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={'Stock'}
          onChange={(e) => setStock(Number(e.target.value))}
          value={stock}
        />
      </Grid>
      <Grid item xs={12}>
        <UploadImage
          size={300}
          url={imageUrl}
          onUpload={(url) => {
            setImageUrl(url)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => handleSubmit()}>Create Product</Button>
      </Grid>
    </Grid>
  )
}

export default ProductForm
