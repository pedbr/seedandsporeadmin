import { useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { Button } from '@mui/material'
import { storage } from '../api/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { getRandomId } from '../utils'
import { useSnackbar } from 'notistack'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

interface UploadImageProps {
  onUpload: (filePath: string) => void
  size?: number
  imageUrl?: string
}

const UploadImage = ({ imageUrl, size, onUpload }: UploadImageProps) => {
  const [uploading, setUploading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const uploadImage = async (event: any) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `product-${getRandomId()}-${getRandomId()}.${fileExt}`

      const imageRef = ref(storage, `products/${fileName}`)
      const { metadata } = await uploadBytes(imageRef, file)
      if (metadata) {
        const url = await getDownloadURL(imageRef)
        if (url) {
          onUpload(url)
          enqueueSnackbar('Image uploaded successfully', { variant: 'success' })
        } else {
          throw new Error()
        }
      } else {
        throw new Error()
      }
    } catch (error: any) {
      enqueueSnackbar('There was an error uploading your image', {
        variant: 'error',
      })
      console.error(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ width: size }}>
      <img
        src={imageUrl || PRODUCT_DEFAULT_IMAGE}
        alt={'Product'}
        style={{ height: size, width: size, objectFit: 'cover' }}
      />

      {uploading ? (
        'Uploading...'
      ) : (
        <>
          <Button component='label' htmlFor='single'>
            {imageUrl ? 'Change Image' : 'Upload Image'}
          </Button>
          <VisuallyHidden>
            <input
              type='file'
              id='single'
              accept='image/*'
              onChange={uploadImage}
              disabled={uploading}
            />
          </VisuallyHidden>
        </>
      )}
    </div>
  )
}

export default UploadImage
