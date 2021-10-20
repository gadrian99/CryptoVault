import React, { useState, useEffect }from 'react'
import { Typography, Button, Table, Card, Statistic, Select, Skeleton, Tabs  } from 'antd'
import { DownloadOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useMoralis } from "react-moralis";
import { Transactions, UserTokens, UserNFTs } from "../components/"
const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { Meta } = Card
const { TabPane } = Tabs

const Dashboard = () => {
    const { Moralis, logout, isAuthenticated, authenticate, user, setUserData } = useMoralis()

    // Moralis.onDisconnect((data) => alert('disconnected from site' , data))
    // Moralis.onConnect((data) => alert('connected to site', data))
    // Setup state for network. Initialize to current established in wallet
    // Adjust wallet balance due to fiat currency selected
    const [address, setAddress] = useState('')
    const [chain, setChain] = useState('0x1')
    const [totalGas, setTotalGas] = useState(0)
    const [walletBalance, setWalletBalance] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [updatedUsername, setUpdatedUsername] = useState('')
    const moralisNetworks = [
        {id: '0x1', name: 'Ethereum', gecko: 'ethereum'},
        {id: '0x3', name: 'Ropsten',},
        {id: '0x4', name: 'Rinkeby'},
        {id: '0x5', name: 'Goerli'},
        {id: '0x2a', name: 'Kovan'},
        {id: '0x38', name: 'Bsc', gecko: 'binance-smart-chain'},
        {id: '0x61', name: 'Bsc Testnet'},
        {id: '0x89', name: 'Matic', gecko: 'polygon-pos'},
        {id: '0x13881', name: 'Matic Testnet'},
        {id: '0xa86a', name: 'Avalanche', gecko: 'avalanche'}
    ]

    const fetchData = async () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 3000)
        const gasTotal = async (txs) => {
            setTotalGas(0)
            let x = 0
            await txs.forEach(({receipt_cumulative_gas_used}) => {
                x+= parseInt(receipt_cumulative_gas_used)
            })
            setTotalGas(x)
        }

        const options = {
            chain: chain,
            address: address,
        }

        // try {
        //     await Moralis.Web3API.account.getTransactions(options)
        //         .then((data) => setTxs(data.result))
        //     await Moralis.Web3API.account.getTokenBalances(options)
        //         .then((data) => setTokens(data))
        //     await Moralis.Web3API.account.getNativeBalance({ address })
        //         .then((data) => setWalletBalance(data.balance))
        //     await Moralis.Web3API.account.getTokenTransfers(options)
        //         .then((data) => setTokensTxs(data.result))
        //     await Moralis.Web3API.account.getNFTs(options)
        //         .then((data) => setNfts(data.result))
        //     await gasTotal(txs)
        // } catch (err) {
        //     setError(err)
        //     console.log(err)
        // }
    }

     // Monitor Account change
     Moralis.onAccountsChanged((data) => setAddress(data[0]))

     // Monitor Network Change
     Moralis.onChainChanged((chain) => setChain(chain))

    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', marginBottom: '50px', height: '80vh', flexDirection: 'column' }}>
                <Title level={2}>Account dashboard</Title>
                <Text style={{ marginBottom: '60px' }}>Login with your wallet to access all your transactions and token history as well as more insight on your crypto wallet</Text>
                <Button type="primary" onClick={() => authenticate({signingMessage:"Hello from CryptoVault :) Sign this request free of charge to authenticate."})}>Login with Metamask <LoginOutlined /></Button>
                <Button type="primary" onClick={async () => {
                    try {
                        await Moralis.Web3.authenticate({ provider: 'walletconnect' })
                        await Moralis.Web3.enable({ provider: 'walletconnect' })
                    } catch (e) {
                        alert(`Authentication Failed: ${e}`)
                    }
                }}>Login with WalletConnect <LoginOutlined /></Button>
            </div>
        )
    }


    function greeting() {
        let today = new Date()
        let curHr = today.getHours()

        if (curHr < 12) {
            return <Title level={3}>Good morning {user.get("username")} </Title>
        } else if (curHr < 18) {
            return <Title level={3}>Good afternoon {user.get("username")} </Title>
        } else {
            return <Title level={3}>Good evening {user.get("username")}</Title>
        }
    }



    return(
        <div style={{ minHeight: '80vh' }}>
            {/* executes once user logs in */}
            {address == '' &&  setAddress(user.attributes.accounts[0])}

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0 30px 0', alignItems: 'center' }}>
                {greeting()}
                <Button type="primary" onClick={() => {
                    logout()
                    //test once deployed
                }} danger>Logout <LogoutOutlined /></Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', width: '30rem' }}>
                <Text>Current address: <Select defaultValue={address} style={{ width: 150 }} onChange={(data) => setAddress(data)}>
                    <Option value={address}>{address.substring(0,6) + "..." + address.substring(38)}</Option>
                </Select></Text>

                <Text>Current chain: <Select defaultValue={'0x1'} style={{ width: 120 }} onChange={(data) => setChain(data)}>
                    {moralisNetworks.map(({id, name}) => (
                        <Option value={id}>{name}</Option>
                    ))}
                </Select></Text>
            </div>


            {/* {view && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '50px' }}>
                        <Card title="💸 Wallet Balance" bordered={true} style={{ width: 300 }}>
                            {loading ? <Skeleton paragraph={{ rows: 0 }} /> : <Statistic value={walletBalance / 1e18} precision={10} />}
                        </Card>
                        <Card title="🏷️ Total Transactions" bordered={true} style={{ width: 300 }}>
                            {loading ? <Skeleton paragraph={{ rows: 0 }} /> : <Statistic value={txs.length}/>}
                        </Card>
                        <Card title="🔥 Total Gas Burned" bordered={true} style={{ width: 300 }}>
                            {loading ? <Skeleton paragraph={{ rows: 0 }} /> : <Statistic value={millify(totalGas)} precision={0}/>}
                        </Card>
                        <Card title="💠 Total Tokens" bordered={true} style={{ width: 300 }}>
                            {loading ? <Skeleton paragraph={{ rows: 0 }} /> : <Statistic value={tokens.length} precision={0}/>}
                        </Card>
                        <Card title="⚜️ Total NFTs" bordered={true} style={{ width: 300 }}>
                            {loading ? <Skeleton paragraph={{ rows: 0 }} /> : <Statistic value={nfts.length} precision={0}/>}
                        </Card>
                    </div>
                    <Title level={4}>Transaction History</Title>
                    <Table loading={loading} dataSource={transactionData} columns={transactionColumns} />

                    <Title level={4}>Tokens</Title>
                    <Table loading={loading} dataSource={tokenChartData} columns={tokenColumns} />

                    <Title level={4}>Token Transactions</Title>
                    <Table loading={loading} dataSource={tokenTxData} columns={tokenTxColumns} />

                    <Title level={4}>NFTs List</Title>
                    <Table loading={loading} dataSource={nftData} columns={nftColumns} />
                </>
            )} */}
             <Tabs defaultActiveKey="1">
                <TabPane tab="Transactions" key="1">
                    <Transactions address={address} chain={chain} />
                </TabPane>
                <TabPane tab="Tokens" key="2">
                    <UserTokens address={address} chain={chain}/>
                </TabPane>
                <TabPane tab="NFTs" key="3">
                    <UserNFTs address={address} chain={chain}/>
                </TabPane>
            </Tabs>

        </div>
    )

}

export default Dashboard