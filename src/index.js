import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MoralisProvider } from "react-moralis";
import './fonts/Anurati-Regular.otf'

import App from './App'
import store from './app/store'
import 'antd/dist/antd.css'

const APPID = "CTfnLNeusWw9VQbfdBjCaCnCw7isXNYF6o01HQKO"
const SERVER_URL = "https://2gquprlo3ixl.moralishost.com:2053/server"

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <MoralisProvider appId={APPID} serverUrl={SERVER_URL}>
                <App />
            </MoralisProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
)