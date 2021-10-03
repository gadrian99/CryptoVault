import React, { useState, useEffect }from 'react'
import { Typography, Button, Table, Card, Statistic, Select } from 'antd'
import { DownloadOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useMoralis } from "react-moralis";
import Loader from './Loader'

const { Title, Text } = Typography
const { Option } = Select

const Dashboard = () => {
    const { Moralis, logout, isAuthenticated, authenticate, user } = useMoralis()

    // Moralis.onDisconnect((data) => alert('disconnected from site' , data))
    // Moralis.onConnect((data) => alert('connected to site', data))
    // Setup state for network. Initialize to current established in wallet
    // Adjust wallet balance due to fiat currency selected
    
    const [address, setAddress] = useState('')
    const [chain, setChain] = useState('')
    const [txs, setTxs] = useState([])
    const [tokens, setTokens] = useState([])
    const [tokenTxs, setTokensTxs] = useState([])
    const [nfts, setNfts] = useState([])
    const [totalGas, setTotalGas] = useState(242)
    const [walletBalance, setWalletBalance] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})

    const clearState = () => {
        setAddress('')
        setChain('')
        setTxs([])
        setTokens([])
        setTokensTxs([])
        setNfts([])
        setTotalGas('')
        setWalletBalance('')
    }

    useEffect(async () => {
        setLoading(true)
        // fetchData()
        setLoading(false)
    })

    const fetchData = async () => {
        const options = {
            chain: chain,
            address: address,
        }
        try {
            await Moralis.Web3API.account.getTransactions(options)
                .then((data) => setTxs(data.result))
            await Moralis.Web3API.account.getTokenBalances(options)
                .then((data) => setTokens(data))
            await Moralis.Web3API.account.getNativeBalance({ address })
                .then((data) => setWalletBalance(data.balance))
            await Moralis.Web3API.account.getTokenTransfers(options)
                .then((data) => setTokensTxs(data.result))
            await Moralis.Web3API.account.getNFTs(options)
                .then((data) => console.log(data)) 
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }
    
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
                    date: tx.block_timestamp?.substring(0 , 10),
                    hash: tx.hash?.substring(0 , 6) + "..." + tx.hash?.substring(62),
                    from: tx.from_address?.substring(0 , 6) + "..." + tx.from_address?.substring(38),
                    to: tx.to_address?.substring(0 , 6) + "..." + tx.to_address?.substring(38),
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
                    address: token.token_address?.substring(0 , 6) + "..." + token.token_address?.substring(38),
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
                    date: tx.block_timestamp?.substring(0 , 10),
                    hash: tx.block_hash?.substring(0 , 6) + "..." + tx.block_hash?.substring(62),
                    from: tx.from_address?.substring(0 , 6) + "..." + tx.from_address?.substring(38),
                    to: tx.to_address?.substring(0 , 6) + "..." + tx.to_address?.substring(38),
                    value: tx.value
                }
            )
        })
        return data
    }
    const tokenTxData = generateTokenTxData()

    const availableNetworks = [
        { 
            id: '0x1',
            name: 'Eth',
        },
        { 
            id: '0x3',
            name: 'Ropsten',
        },
        { 
            id: '0x4',
            name: 'Rinkeby',
        },
        { 
            id: '0x5',
            name: 'Goerli',
        },
        { 
            id: '0x2a',
            name: 'Kovan',
        },
        { 
            id: '0x38',
            name: 'Bsc',
        },
        { 
            id: '0x61',
            name: 'Bsc testnet',
        },
        { 
            id: '0x89',
            name: 'Matic',
        },
        { 
            id: '0x13881',
            name: 'Matic testnet',
        },
        { 
            id: '0xa86a',
            name: 'Avalanche',
        }
    ]

    

    

     // Monitor Account change
     Moralis.onAccountsChanged((data) => setAddress(data[0]))

     // Monitor Network Change
     Moralis.onChainChanged((chain) => setChain(chain))

     
     
    if (loading) { return( <Loader /> )}
    
    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', marginBottom: '50px', height: '80vh', flexDirection: 'column' }}>
                <Title level={2}>Account dashboard</Title>
                <Text style={{ marginBottom: '60px' }}>Login with your wallet to access all your transactions and token history as well as more insight on your crypto wallet</Text>
                <Button type="primary" onClick={() => authenticate()}>Login with Metamask <LoginOutlined /></Button>
            </div>
        )
    }

    return(
        <div>
            {address == '' &&  setAddress(user.attributes.accounts[0])}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px'}}>
                <Title level={2}>Dashboard</Title>
                <Button type="primary" onClick={() => fetchData()}>Get Data <DownloadOutlined /></Button>
                <Button type="primary" onClick={() => {
                    logout()
                    //test once deployed
                    clearState()
                }} danger>Logout <LogoutOutlined /></Button>
            </div>
            <Title level={4}>Current address: {address.substring(0 , 6) + "..." + address.substring(38)}</Title>
            <Select defaultValue={'0x1'} style={{ width: 120 }} onChange={(data) => setChain(data)}>
                {availableNetworks.map(({id, name}) => (
                    <Option value={id}>{name}</Option>
                ))}
            </Select>
            <Title level={4}>Current network: {chain}</Title>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px'}}>
                <Card title="💸 Wallet Balance" bordered={true} style={{ width: 300 }}>
                    <Statistic value={walletBalance / 1e18} precision={10} />
                </Card>
                <Card title="🏷️ Total Transactions" bordered={true} style={{ width: 300 }}>
                    <Statistic value={txs.length}/>
                </Card>
                <Card title="🔥 Average Gas Burned" bordered={true} style={{ width: 300 }}>
                    <Statistic value={totalGas} precision={10}/>
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
