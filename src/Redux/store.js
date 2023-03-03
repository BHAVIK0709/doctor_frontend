import { configureStore } from '@reduxjs/toolkit'
import alerReducer from './features/alertSlice'
import userReducer from './features/userSlice'
 
export const store = configureStore({
  reducer: {
    alerts:alerReducer,
    user : userReducer,
  },
})