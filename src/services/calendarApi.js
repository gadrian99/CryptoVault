import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const calendarApiHeaders = { 
    "Access-Control-Allow-Origin" : "*",
    "mode": "cors",
    'Accept': 'application/json',
    'Accept-Encoding': 'deflate, gzip',
    'x-api-key': 'ibJGtqSGmM4t1auoRrH7f3pC4Qc9hWGx8H3xX69b',
    
}

const baseUrl = "https://developers.coinmarketcal.com/v1"

const createRequest = (url) => ({ url, headers: calendarApiHeaders})

export const calendarEventsApi = createApi({
    reducerPath: 'calendarEventsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCalendarEvents: builder.query({
            query: () => createRequest(`/events`)
        })
    })
})

export const {
    useGetCalendarEventsQuery,
} = calendarEventsApi