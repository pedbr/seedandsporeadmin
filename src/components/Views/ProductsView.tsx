import { useEffect } from 'react'
import { supabase } from '../../supabaseClient'

const ProductsView = () => {
  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select()
    console.log(data)
    console.log(error)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return <div>ProductsView</div>
}

export default ProductsView
