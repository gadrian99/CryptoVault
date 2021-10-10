import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const coinGeckoApiHeaders = {}

const baseUrl = "https://api.coingecko.com/api/v3"

const createRequest = (url) => ({ url, headers: coinGeckoApiHeaders})

export const coinGeckoApi = createApi({ 
    reducerPath: 'coinGeckoApi', 
    baseQuery: fetchBaseQuery({ baseUrl }), 
    endpoints: (builder) => ({
        getStatusUpdate: builder.query({
            query: ({ projectType, currentCategory }) => createRequest(`/status_updates?project_type=${projectType}&category=${currentCategory}`)
        }),
        getTokenData: builder.query({
            query: ({ geckoChain, contract_address  }) => createRequest(`/simple/token_price/${geckoChain}?contract_addresses=${contract_address}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
        }),
        getTrendingCoins: builder.query({
            query: () => createRequest(`/search/trending`)
        }), 
        getGlobalData: builder.query({
            query: () => createRequest(`/global`)
        }),
        getGlobalDefiData: builder.query({
            query: () => createRequest(`/global/decentralized_finance_defi`)
        })
    })
})  

export const {
    useGetStatusUpdateQuery,
    useGetTokenDataQuery,
    useGetTrendingCoinsQuery,
    useGetGlobalDataQuery,
    useGetGlobalDefiDataQuery
} = coinGeckoApi