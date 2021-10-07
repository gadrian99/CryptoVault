import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const coinGeckoApiHeaders = {
    'x-rapidapi-host': 'coingecko.p.rapidapi.com',
    'x-rapidapi-key': 'cdcdfa6f8dmsh5757f9d36e648f6p1cbc92jsn66072d8cd192'
}

const baseUrl = "https://coingecko.p.rapidapi.com/"

const createRequest = (url) => ({ url, headers: coinGeckoApiHeaders})

export const coinGeckoApi = createApi({ 
    reducerPath: 'coinGeckoApi', 
    baseQuery: fetchBaseQuery({ baseUrl }), 
    endpoints: (builder) => ({
        getStatusUpdate: builder.query({
            query: ({ projectType, currentCategory }) => createRequest(`/status_updates?project_type=${projectType}&category=${currentCategory}`)
        })
    })
})

export const {
    useGetStatusUpdateQuery
} = coinGeckoApi