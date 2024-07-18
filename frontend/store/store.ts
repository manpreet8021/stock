'use client'

import { configureStore } from "@reduxjs/toolkit"
import stockReducer from "./slice/stockSlice"
import { apiSlice } from "./slice/api/apiSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        stock: stockReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;