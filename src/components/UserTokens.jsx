import React from 'react'
import moment from 'moment'
import { Typography, Table } from 'antd'
import {
    useGetTokenBalancesQuery,
    useGetTokenTransactionsQuery
} from '../services/moralisApi'

const { Title } = Typography

const UserTokens = ({ address, chain }) => {
    const { data: tokens, isFetching } = useGetTokenBalancesQuery({ address, chain })
    const { data: transactions } = useGetTokenTransactionsQuery({ address, chain })
 
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
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        }
    ]

    const generateTokenData = () => {
        let data = []
        
        const exchange = (x) => {
            switch(x) {
                case '0x1':
                    return 'uniswap-v3' // ethereum dex
                case '0x38':
                    return 'pancakeswap-v2' // binance dex
                case '0x89': 
                    return 'quickswap' // polygon dex
            }
        }

        tokens?.map(async (token) => {
            // const options = {
            //     address: token.token_address,
            //     chain: chain,
            //     exchange: exchange(chain)
            // }

            // const price = await Moralis.Web3API.token.getTokenPrice(options);

            // const x = token.balance / Math.pow(10, token.decimals) * price.usdPrice

            data.push(
                {
                    symbol: token.symbol,
                    name: token.name,
                    address: token.token_address?.substring(0 , 6) + "..." + token.token_address?.substring(38),
                    amount: token.balance / Math.pow(10, token.decimals),
                    // balance: parseFloat(x.toFixed(2))
                }
            )
        })
        
        return data
    }
    const tokenChartData = generateTokenData()

    // Token Transactions
    const tokenTxColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Transaction hash',
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
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        },
    ]

    const generateTokenTxData = () => {
        let data = []

        transactions?.result?.map((tx) => {
            data.push(
                {
                    date: moment().format('MMMM Do YYYY', tx.block_timestamp),
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

    return (
        <div>
            <Title level={4}>Tokens</Title>
            <Table loading={isFetching} dataSource={tokenChartData} columns={tokenColumns} />
            <Title style={{ marginTop: '20px' }} level={4}>Token Transactions</Title>
            <Table loading={isFetching} dataSource={tokenTxData} columns={tokenTxColumns} />
        </div>
    )
}

export default UserTokens
