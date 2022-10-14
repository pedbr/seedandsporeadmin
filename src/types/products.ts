export interface ProductType {
  id: string
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
