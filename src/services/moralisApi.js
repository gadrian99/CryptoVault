import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const moralisHeaders = {
   'x-api-key' : 'TV8SdJoU4NiVwlRFOPbAwhmSBU4b9JCqOy8cAt3nzClS9pD1ky5LsfcjeOGZ2tnN'
}

const baseUrl = "https://deep-index.moralis.io/api/v2"

const createRequest = (url) => ({ url, headers: moralisHeaders})

export  const moralisApi = createApi({
    reducerPath: 'moralisApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: ({ address, chain }) => createRequest(`/${address}?chain=${chain}`)
        }),
        getNativeBalance: builder.query({
            query: ({ address, chain }) => createRequest(`/${address}/balance?chain=${chain}`)
        }),
        getTokenBalances: builder.query({
            query: ({ address, chain }) => createRequest(`/${address}/erc20?chain=${chain}`)
        }),
        getTokenPrice: builder.query({
            query: ({ address, chain }) => createRequest(`/erc20/${address}/price?chain=${chain}`)
        }),
        getTokenTransactions: builder.query({
            query: ({ address, chain }) => createRequest(`/${address}/erc20/transfers?chain=${chain}`)
        }),
        getNFTs: builder.query({
            query: ({ address, chain }) => createRequest(`/${address}/nft?chain=${chain}&format=decimal`)
        }),
        getNFTsTransfer: builder.query({
            query: ({ address, chain }) => createRequest(`/${address}/nft/transfers?chain=${chain}&format=decimal&direction=both`)
        })
    })
})

export const {
    useGetTransactionsQuery,
    useGetNativeBalanceQuery,
    useGetTokenBalancesQuery,
    useGetTokenPriceQuery,
    useGetTokenTransactionsQuery,
    useGetNFTsQuery,
    useGetNFTsTransferQuery
} = moralisApi
