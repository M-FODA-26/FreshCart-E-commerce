import { getUserOrders } from '@/CheckoutApi/getUserOrders.api'
import getMyToken from '@/utilities/getMyToken.utilities'
import { jwtDecode } from 'jwt-decode'
import { Suspense } from 'react'

interface OrderItem {
  _id?: string
  count?: number
  price?: number
  product?: {
    title?: string
    imageCover?: string
  }
}

interface Order {
  _id?: string
  id?: string
  createdAt?: string
  isPaid?: boolean
  isDelivered?: boolean
  paymentMethodType?: string
  totalOrderPrice?: number
  taxPrice?: number
  shippingPrice?: number
  cartItems?: OrderItem[]
  shippingAddress?: {
    city?: string
    phone?: string
    details?: string
  }
}

interface DecodedToken {
  id: string;
  [key: string]: unknown;
}

export default function Allorders() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <p className="text-sm text-slate-500">Loading your orders...</p>
        </div>
      }
    >
      <Orders />
    </Suspense>
  )
}

async function Orders() {
    const token = await getMyToken()
    
    if (!token) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-600 shadow-sm">
            <h2 className="text-lg font-bold">Unauthorized Session</h2>
            <p className="mt-1 text-sm">Please log in to view your orders.</p>
          </div>
        </div>
      )
    }

    let response: Order[] | undefined
    let loadFailed = false
    try {
      const decodedtoken = jwtDecode<DecodedToken>(token)
      response = await getUserOrders(decodedtoken.id)
    } catch (error) {
      console.error('Error loading orders:', error)
      loadFailed = true
    }

    if (loadFailed) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-600 shadow-sm">
            <h2 className="text-lg font-bold">Failed to Load Orders</h2>
            <p className="mt-1 text-sm">Please try again later.</p>
          </div>
        </div>
      )
    }

    if (!response || response.length === 0) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 rounded-full bg-slate-100 p-4">
            <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800">No Orders Yet</h2>
          <p className="mt-1 text-sm text-slate-500">When you place an order, it will appear here.</p>
        </div>
      )
    }

    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-green-600 sm:text-3xl">My Orders</h1>
          <p className="mt-1 text-xl font-semibold text-green-600 ">Total Orders: {response.length}</p>
        </header>

        <div className="space-y-6">
          {response.map((order, idx) => (
            <div 
              key={order._id || order.id || idx} 
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Head Section */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 p-4 sm:p-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-green-600">Order ID</span>
                  <p className="font-mono text-sm font-bold text-slate-800">
                    #{order._id ? order._id.slice(-8).toUpperCase() : `ORD-${idx + 1}`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    order.isPaid 
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20' 
                      : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Pending Payment'}
                  </span>

                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    order.isDelivered 
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20' 
                      : 'bg-slate-100 text-slate-600 ring-1 ring-slate-500/10'
                  }`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-3">
                {/* Order Details & Items */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-sm font-semibold text-green-600">Order Items</h3>
                  {order.cartItems && order.cartItems.length > 0 ? (
                    <div className="space-y-3">
                      {order.cartItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 rounded-lg border border-slate-100 p-3">
                          {item.product?.imageCover && (
                            <img 
                              src={item.product.imageCover} 
                              alt={item.product.title || 'Product'} 
                              className="h-16 w-16 rounded-md object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <p className="line-clamp-1 text-sm font-medium text-slate-800">{item.product?.title || 'Product'}</p>
                            <p className="mt-1 text-xs text-slate-500">Qty: {item.count || 1}</p>
                          </div>
                          <p className="text-sm font-bold text-green-600">{item.price} EGP</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Order details successfully registered.</p>
                  )}
                </div>

                {/* Summary & Shipping Info */}
                <div className="flex flex-col justify-between space-y-4 rounded-xl bg-slate-50 p-4">
                  <div className="space-y-3">
                    <h3 className="border-b border-slate-200 pb-2 text-sm font-semibold text-green-600">Shipping & Payment</h3>
                    
                    {order.shippingAddress && (
                      <div className="space-y-1 text-xs text-slate-600">
                        <p><span className="font-medium text-slate-800">City:</span> {order.shippingAddress.city || 'N/A'}</p>
                        <p><span className="font-medium text-slate-800">Details:</span> {order.shippingAddress.details || 'N/A'}</p>
                        <p><span className="font-medium text-slate-800">Phone:</span> {order.shippingAddress.phone || 'N/A'}</p>
                      </div>
                    )}

                    <div className="pt-2 text-xs text-slate-600">
                      <p><span className="font-medium text-slate-800">Payment Method:</span> {order.paymentMethodType === 'card' ? 'Credit Card' : 'Cash on Delivery'}</p>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Shipping:</span>
                      <span>{order.shippingPrice ? `${order.shippingPrice} EGP` : 'Free'}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                      <span>Total:</span>
                      <span className="text-emerald-600">{order.totalOrderPrice} EGP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}