import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import stock from "./api/stock";

interface stockState {
    data: Array<{price: number, market_cap: number, h24_vol: number, h24_change: number, last_updated_at: Date, coin_id: string,_id: string}>,
    coins: Array<{_id: string, coin_id: string, name: string, symbol: string, thumbnail: string}>,
    selectedCoin: string
}

export interface coinInterface {
    _id: string,
    coin_id: string, 
    name: string, 
    symbol: string, 
    thumbnail: string
}

const initialState: stockState = {
    data: [],
    coins: [],
    selectedCoin: ''
}

const stockSlice = createSlice({
    name:'stock',
    initialState,
    reducers: {
        setData: (state, {payload}) => {
            const updatedData = [...payload, ...state.data]
            state.data = updatedData.slice(0, 20);
        },
        setSelectedCoin: (state, {payload}) => {
            state.selectedCoin = payload
        }
    },
    extraReducers:(builder) => {
        builder.addMatcher(
            stock.endpoints.getCoin.matchFulfilled,
            (state, {payload}) => {
                state.coins = payload
            }
        ),
        builder.addMatcher(
            stock.endpoints.getPrice.matchFulfilled,
            (state, {payload}) => {
                state.data = payload
            }
        )
    }
})

export const { setData, setSelectedCoin } = stockSlice.actions

export default stockSlice.reducer;