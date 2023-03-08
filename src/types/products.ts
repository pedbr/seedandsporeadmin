export interface ProductType {
  id: string
  createdAt: number
  active: boolean
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
  discount: number
  categoryId?: number
  campaignId?: number
}
