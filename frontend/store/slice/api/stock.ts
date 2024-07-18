import { apiSlice } from "./apiSlice";

const stock = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoin: builder.query({
            query: () => ({
                url: 'getCoin',
            })
        }),
        getPrice: builder.query({
            query: (id) => ({
                url: `getPrice/${id}`
            })
        })
    })
})

export const { useGetCoinQuery, useGetPriceQuery } = stock

export default stock