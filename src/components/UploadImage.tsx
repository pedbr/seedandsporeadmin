import { useState } from 'react'
import { supabase } from '../supabaseClient'
import VisuallyHidden from '@reach/visually-hidden'
import { Button } from '@mui/material'
import { getRandomId } from '../utils'
import { useGetImage } from '../hooks/useGetImage'

interface UploadImageProps {
  onUpload: (filePath: string) => void
  size?: number
  imagePath?: string
}

const UploadImage = ({ imagePath, size, onUpload }: UploadImageProps) => {
  const [uploading, setUploading] = useState(false)

  const { imageUrl, isImageLoading } = useGetImage('product-images', imagePath)

  const uploadImage = async (event: any) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `product-${getRandomId()}-${getRandomId()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ width: size }}>
      {!isImageLoading && (
        <img
          src={imageUrl}
          alt={'Product'}
          style={{ height: size, width: size, objectFit: 'cover' }}
        />
      )}

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
