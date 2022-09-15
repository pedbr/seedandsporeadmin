import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import VisuallyHidden from '@reach/visually-hidden'
import { Button } from '@mui/material'
import { downloadImage, getRandomId } from '../utils'

interface UploadImageProps {
  onUpload: (filePath: string) => void
  size?: number
  url?: string
}

const UploadImage = ({ url, size, onUpload }: UploadImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [uploading, setUploading] = useState(false)

  const fetchImage = useCallback(async (path: string) => {
    const fileUrl = await downloadImage('product-images', path)
    setImageUrl(fileUrl)
  }, [])

  useEffect(() => {
    if (url) fetchImage(url)
  }, [url, fetchImage])

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
      {imageUrl && (
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
