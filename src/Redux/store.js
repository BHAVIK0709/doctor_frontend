import { configureStore } from '@reduxjs/toolkit'
import alerReducer from './features/alertSlice'

export const store = configureStore({
  reducer: {
    alerts:alerReducer,
  },
})