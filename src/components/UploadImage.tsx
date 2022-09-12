import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import VisuallyHidden from '@reach/visually-hidden'
import { Button } from '@mui/material'

interface UploadImageProps {
  onUpload: (filePath: string) => void
  size?: number
  url?: string
}

const UploadImage = ({ url, size, onUpload }: UploadImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('products')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setImageUrl(url)
    } catch (error: any) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `product-${Math.random()}.${fileExt}`
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
          style={{ height: size, width: size }}
        />
      )}

      {uploading ? (
        'Uploading...'
      ) : (
        <>
          <Button component='label' htmlFor='single'>
            Upload
          </Button>
          <VisuallyHidden>
            <input
              type='file'
              id='single'
              accept='image/*'
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </VisuallyHidden>
        </>
      )}
    </div>
  )
}

export default UploadImage
