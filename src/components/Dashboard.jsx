import React, { useState, useEffect }from 'react'
import { Typography, Button, Table } from 'antd'
import { useMoralis } from "react-moralis";

import Loader from './Loader'

const { Title } = Typography

const Dashboard = () => {
    const [txs, setTxs] = useState([])
    const [tokens, setTokens] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { Moralis, user } = useMoralis()
    useEffect(async () => {
        setLoading(true)
        try {
            await Moralis.Web3API.account.getTransactions()
                .then((data) => {setTxs(data.result)})
            await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc'})
                .then((data) => setTokens(data))
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }, [])
    console.log(tokens)

    // Transactions Table Data
    const transactionColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Hash',
            dataIndex: 'hash',
            key: 'hash',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
    ]

    const generateTxData = () => {
        let data = []
        
        txs.map((tx,  i = 0) => {
            data.push(
                {
                    date: tx.block_timestamp,
                    hash: tx.hash,
                    from: tx.from_address,
                    to: tx.to_address,
                }
            )
        })
        return data
    }
    const transactionData = generateTxData()

    
    //Token Info Table Data

    const tokenColumns = [
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
        }  
    ]

    const generateTokenData = () => {
        let data = []
        
        tokens.map((token,  i = 0) => {
            data.push(
                {
                    key: i++,
                    symbol: token.symbol,
                    name: token.name,
                    address: token.token_address,
                    balance: token.balance,
                }
            )
        })
        return data
    }
    const tokenData = generateTokenData()


    if (loading) { return( <Loader /> )}
    if (error) { return( <div>Error</div>)}
    return(
        <div>
            <Title level={2}>Dashboard</Title>

            <Title level={4}>Transaction History</Title>
            <Table dataSource={transactionData} columns={transactionColumns} />

            <Title level={4}>Tokens</Title>
            <Table dataSource={tokenData} columns={tokenColumns} />
        </div>
    )

}

export default Dashboard
