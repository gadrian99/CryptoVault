import React, { useState, useEffect }from 'react'
import { Typography, Button, Table, Card, Statistic, Select } from 'antd'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useMoralis } from "react-moralis";
import moment from 'moment'
import Loader from './Loader'
const Web3 = require('web3')

const { Title } = Typography
const { Option } = Select
const Dashboard = () => {
    // Setup state for network. Initialize to current established in wallet
    // Adjust wallet balance due to fiat currency selected
    const [address, setAddress] = useState('0x5d6c606ca2C0b8a78b71A53470f780F19c3822d4')
    const [chain, setChain] = useState('eth')
    const [txs, setTxs] = useState([])
    const [tokens, setTokens] = useState([])
    const [tokenTxs, setTokensTxs] = useState([])
    const [nfts, setNfts] = useState([])
    const [walletBalance, setWalletBalance] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { Moralis, logout, isAuthenticated, authenticate } = useMoralis()

    console.log(walletBalance)
    useEffect(async () => {
        setLoading(true)
        if (!isAuthenticated) {
            console.log('nun to do')
        } else {
            try {
                await Moralis.Web3API.account.getTransactions()
                    .then((data) => {setTxs(data.result)})
                await Moralis.Web3API.account.getTokenBalances({ chain: '0x38'})
                    .then((data) => setTokens(data))
                await Moralis.Web3API.account.getNativeBalance({ address: address})
                    .then((data) => setWalletBalance(data.balance))
                await Moralis.Web3API.account.getTokenTransfers()
                    .then((data) => setTokensTxs(data.result))
                await Moralis.Web3API.account.getNFTs()
                    .then((data) => setNfts(data))
            } catch (err) {
                setError(true)
            }
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

    const generateTxData = () => {
        let data = []
        
        txs.map((tx) => {
            data.push(
                {
                    date: tx.block_timestamp,
                    hash: tx.hash.substring(20),
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
        
        tokens.map((token) => {
            data.push(
                {
                    symbol: token.symbol,
                    name: token.name,
                    address: token.token_address,
                    balance: token.balance / Math.pow(10, token.decimals)
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
        
        tokenTxs.map((tx) => {
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
    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px'}}>
                <Title level={2}>Dashboard</Title>
                <Button type="primary" onClick={() => authenticate()}>Login <LoginOutlined /></Button>
            </div>
        )
    }

    return(
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px'}}>
                <Title level={2}>Dashboard</Title>
                <Button type="primary" onClick={() => logout()} danger>Logout <LogoutOutlined /></Button>
            </div>
            
            {/* <Select
                showSearch
                placeholder="Select network"
                optionFilterProp="children"
                onChange={(value) => setChain(value)}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0 }
            >
                <Option value="cryptocurrency">Cryptocurrency</Option>
                {data?.data?.coins.map(coin => <Option value={coin.name}>{coin.name}</Option>)}
            </Select> */}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px'}}>
                <Card title="💸 Wallet Balance" bordered={true} style={{ width: 300 }}>
                    <Statistic value={walletBalance / 1e18}/>
                </Card>
                <Card title="🏷️ Total Transactions" bordered={true} style={{ width: 300 }}>
                    <Statistic value={txs.length}/>
                </Card>
                <Card title="🔥 Gas Burned" bordered={true} style={{ width: 300 }}>
                    <Statistic value={250032}/>
                </Card>
            </div>
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
