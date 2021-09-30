import React, { useState, useEffect }from 'react'
import { Typography, Button, Table, Card, Statistic, Col } from 'antd'
import { useMoralis } from "react-moralis";
import moment from 'moment'
import Loader from './Loader'

const { Title } = Typography

const Dashboard = () => {
    // Setup state for network. Initialize to current established in wallet
    // Adjust wallet balance due to fiat currency selected
    const [address, setAddress] = useState('0x5d6c606ca2C0b8a78b71A53470f780F19c3822d4')
    const [txs, setTxs] = useState([])
    const [tokens, setTokens] = useState([])
    const [tokenTxs, setTokensTxs] = useState([])
    const [walletBalance, setWalletBalance] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { Moralis } = useMoralis()

    console.log(tokenTxs)
    useEffect(async () => {
        setLoading(true)
        try {
            await Moralis.Web3API.account.getTransactions()
                .then((data) => {setTxs(data.result)})
            await Moralis.Web3API.account.getTokenBalances({ chain: 'bsc'})
                .then((data) => setTokens(data))
            await Moralis.Web3API.account.getNativeBalance({ address: address})
                .then((data) => setWalletBalance(data.balance))
            await Moralis.Web3API.account.getTokenTransfers()
                .then((data) => setTokensTxs(data.result))
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }, [])

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
                    value: tx.value
                }
            )
        })
        return data
    }
    const transactionData = generateTxData()

    
    //Token Info Table Data

    const tokenColumns = [
        {
            dataIndex: 'logo',
            key: 'logo',
        },
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
                    balance: token.balance / 1e18 
                }
            )
        })
        return data
    }
    const tokenData = generateTokenData()

    // Token Transactions 
    const tokenTxColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Block hash',
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
        }    
    ]

    const generateTokenTxData = () => {
        let data = []
        
        tokenTxs.map((tx,  i = 0) => {
            data.push(
                {
                    date: tx.block_timestamp,
                    hash: tx.block_hash,
                    from: tx.from_address,
                    to: tx.to_address,
                    value: tx.value
                }
            )
        })
        return data
    }
    const tokenTxData = generateTokenTxData()


    if (loading) { return( <Loader /> )}
    if (error) { return( <div>Error</div>)}
    return(
        <div>
            <Title level={2}>Dashboard</Title>

            <Card title="Wallet Balance" bordered={false} style={{ width: 300 }}>
                <Statistic value={walletBalance}/>
            </Card>
            <Title level={4}>Transaction History</Title>
            <Table dataSource={transactionData} columns={transactionColumns} />
            
            <Title level={4}>Tokens</Title>
            <Table dataSource={tokenData} columns={tokenColumns} />

            <Title level={4}>Token Transactions</Title>
            <Table dataSource={tokenTxData} columns={tokenTxColumns} />
        </div>
    )

}

export default Dashboard
