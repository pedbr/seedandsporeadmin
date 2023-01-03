export interface ProductType {
  id: string
  createdAt: number
  name?: {
    en: string
    pt: string
  }
  description?: {
    en: string
    pt: string
  }
  stock: number
  price: number
  imageUrl?: string
  available: boolean
  weight: number
  categoryId?: number
  campaignId?: number
}
