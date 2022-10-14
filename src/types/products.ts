export interface ProductType {
  id: number
  createdAt: number
  name: string
  stock: number
  price: number
  imageUrl: string
  description: string
  available: boolean
  weight: number
  categoryId?: number
  campaignId?: number
}
