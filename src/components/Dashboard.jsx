import React, { useState }from 'react'
import {
    useGetNativeBalanceQuery,
    useGetTransactionsQuery,
    useGetTokenBalancesQuery,
    useGetNFTsQuery
} from '../services/moralisApi'
import millify from 'millify'
import CountUp from "react-countup"
import { Typography, Button, Card, Select, Tabs, Statistic, message  } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useMoralis } from "react-moralis"
import { Transactions, UserTokens, UserNFTs } from "../components/"
import loginImage from '../images/loginImage.png'
import metamask from '../images/metamask.png'
import walletconnect from '../images/walletconnect.png'
const { Title, Text } = Typography
const { Option } = Select
const { Meta } = Card
const { TabPane } = Tabs

const Dashboard = () => {
    const { 
        Moralis, 
        logout, 
        isAuthenticated, 
        authenticate, 
        user, 
        setUserData, 
        userError, 
        isUserUpdating, 
        refetchUserData, 
        isAuthenticating
    } = useMoralis()

    const [address, setAddress] = useState('')
    const [chain, setChain] = useState('0x1')
    const { data: walletBalance, isFetching} = useGetNativeBalanceQuery({ address, chain })
    const { data: transactions} = useGetTransactionsQuery({ address, chain })
    const { data: tokenBalances} = useGetTokenBalancesQuery({ address, chain })
    const { data: nfts} = useGetNFTsQuery({ address, chain })

    const moralisNetworks = [
        {id: '0x1', name: 'Ethereum'},
        {id: '0x3', name: 'Ropsten'},
        {id: '0x4', name: 'Rinkeby'},
        {id: '0x5', name: 'Goerli'},
        {id: '0x2a', name: 'Kovan'},
        {id: '0x38', name: 'Bsc'},
        {id: '0x61', name: 'Bsc Testnet'},
        {id: '0x89', name: 'Matic'},
        {id: '0x13881', name: 'Matic Testnet'},
        {id: '0xa86a', name: 'Avalanche'}
    ]

    const gasTotal = () => {
        let x = 0
        
        transactions?.result.forEach(({receipt_cumulative_gas_used}) => {
            x+= parseInt(receipt_cumulative_gas_used)
        })
        
        return x
    }

    // Monitor Account change
    Moralis.onAccountsChanged((data) => setAddress(data[0]))

    // Monitor Network Change
    Moralis.onChainChanged((chain) => setChain(chain))

    //Monitor Connection to site
    Moralis.onConnect((data) => message.success('connected to site', data))

    //Monitor Disconnection to site
    Moralis.onDisconnect((data) => message.warning('Disconnected From Site' , data))

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', marginBottom: '50px', height: '80vh', flexDirection: 'column' }}>
                <Title style={{ alignText: 'center' }} level={2}>Take control of your crypto</Title>
                <img src={loginImage} style={{ height: '15rem', marginBottom: '2rem'}} />
                <Text style={{ marginBottom: '60px' }}>Login with your wallet to access all your transactions and token history as well as more insight on your crypto wallet</Text>
                <Button style={{ marginBottom: '15px', width: '15rem'}} type="primary" onClick={() => {
                    authenticate({
                        signingMessage:"Hello from CryptoVault :) Sign this request free of charge to authenticate.",
                        onSuccess: (e) => message.success('Logged In Successfully'),
                        onError: (e) => message.error(e.message)
                    })
                
                }}>Login with Metamask <img src={metamask} style={{ marginLeft: '0.5rem', height: '1.5rem'}}/></Button>
                <Button style={{ width: '15rem'}} onClick={() => {
                    authenticate({
                        provider: 'walletconnect',
                        signingMessage:"Hello from CryptoVault :) Sign this request free of charge to authenticate.",
                        onSuccess: () => message.success('Logged In Successfully'),
                        onError: (e) => message.error(e.message)
                    })
                }}>Login with WalletConnect <img src={walletconnect} style={{ marginLeft: '0.5rem', height: '1rem'}}/></Button>
            </div>
        )
    }


    function greeting() {
        let today = new Date()
        let curHr = today.getHours()

        if (curHr < 12) {
            return <Title level={3}>Good morning, {user.get("username")}</Title>
        } else if (curHr < 18) {
            return <Title level={3}>Good afternoon, {user.get("username")}</Title>
        } else {
            return <Title level={3}>Good evening, {user.get("username")}</Title>
        }
    }



    return(
        <div style={{ minHeight: '80vh' }}>
            {userError && <p>{userError.message}</p>}
            {/* executes once user logs in */}
            {address == '' &&  setAddress(user.attributes.accounts[0])}

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0 30px 0', alignItems: 'center' }}>
                {greeting()}
                <div>
                <Text>Current chain: <Select defaultValue={chain} style={{ width: 120 }} onChange={(data) => setChain(data)}>
                    {moralisNetworks.map(({id, name}) => (
                        <Option value={id}>{name}</Option>
                    ))}
                </Select></Text>
                <Button style={{ marginLeft: '1rem' }} disabled={isAuthenticating} type="primary" onClick={() => {
                    logout()
                    message.success('Logged Out Successfully')
                }} danger>Logout <LogoutOutlined /></Button>
                </div>
            </div>

            {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '30px', width: '30rem' }}>
                <Text>Current address: <Select defaultValue={address} style={{ width: 150, marginBottom: '1rem' }} onChange={(data) => setAddress(data)}>
                    <Option value={address}>{address.substring(0,6) + "..." + address.substring(38)}</Option>
                </Select></Text>

                
            </div> */}

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <Statistic loading={isFetching} style={{ minWidth: '10rem', marginBottom: '1rem' }} title="💸 Wallet Balance" value={walletBalance?.balance / 1e18} precision={10} />
                <Statistic loading={isFetching} style={{ minWidth: '10rem', marginBottom: '1rem' }} title="🏷️ Total Transactions" value={transactions?.total}/>
                <Statistic loading={isFetching} style={{ minWidth: '10rem', marginBottom: '1rem' }} title="🔥 Total Gas Burned" value={gasTotal()} precision={0}/>
                <Statistic loading={isFetching} style={{ minWidth: '10rem', marginBottom: '1rem' }} title="💠 Total Tokens" value={tokenBalances?.length} precision={0}/>
                <Statistic loading={isFetching} style={{ minWidth: '10rem', marginBottom: '1rem' }} title="⚜️ Total NFTs" value={nfts?.length} precision={0}/>
            </div>

            {/* <CountUp end={walletBalance?.balance / 1e18} duration={2} decimals={10} useEasing={true} />
            <CountUp end={gasTotal()} duration={2}/>
            <CountUp end={transactions?.total} duration={2}/>
            <CountUp end={tokenBalances?.length} duration={2}/>
            <CountUp end={nfts?.length} duration={2}/> */}

            {/* Change Username */}
            {/* <Button disabled={isUserUpdating} onClick={() => { 
                setUserData({
                    username: 'DPR'
                })
            }}>Change username</Button> */}
            
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