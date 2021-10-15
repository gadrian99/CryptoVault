import { configureStore } from "@reduxjs/toolkit"

import { cryptoApi } from "../services/cryptoApi"
import { cryptoNewsApi } from "../services/cryptoNewsApi"
import { coinGeckoApi } from "../services/coinGeckoApi"
import { moralisApi } from '../services/moralisApi'

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
        [moralisApi.reducerPath]: moralisApi.reducer
    }
})