export type Status =
  | 'processing'
  | 'pending'
  | 'preparing'
  | 'expedited'
  | 'delivered'
  | 'closed'

export interface OrderProductType {
  price: number
  imageUrl: string
  name: string
  quantity: number
  description: string
  id: string
}

export interface OrderType {
  id: string
  createdAt: string
  status: Status
  products: OrderProductType[]
  userId: string
  productsPrice: number
  shippingCost: number
  totalPrice: number
  deliveryAddress: string
  expeditedAt: string
  deliveredAt: string
  returned: boolean
  returnId: string
  orderWeight: number
  orderFullName: string
  orderEmail: string
  orderPhoneNumber: string
  orderDeliveryAddress: string
  orderDeliveryPostCode: string
  orderDeliveryLocation: string
  orderBillingAddress: string
}
