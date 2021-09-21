import { configreStore } from "@reduxjs/toolkit"

import { cryptoApi } from "../services/cryptoApi"

export default configreStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    }
})