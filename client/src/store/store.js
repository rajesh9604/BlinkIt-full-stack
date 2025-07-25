import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartProductSlice'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'
export const store = configureStore({
  reducer: {
    user: useReducer,
    product: productReducer,
    cartItem:cartReducer,
    addresses: addressReducer,
    orders: orderReducer
  },
})