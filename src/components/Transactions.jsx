import React, { useState } from 'react'
import { Typography, Table, Spin, Card, Button } from 'antd'
import {
    useGetTransactionsQuery
} from '../services/moralisApi'

import moment from 'moment'

const { Title } = Typography

const Transactions = ({ address , chain }) => {
    const { data: transactions, isFetching } = useGetTransactionsQuery({ address, chain })

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
        },
        {
            title: 'Value (eth)',
            dataIndex: 'value',
            key: 'value'
        },
        {
            title: 'Gas used',
            dataIndex: 'receipt_cumulative_gas_used',
            key: 'receipt_cumulative_gas_used'
        },
        {
            title: 'Nonce',
            dataIndex: 'nonce',
            key: 'nonce'
        },

    ]

    const generateTxData = () => {
        let data = []

        transactions?.result?.map((tx) => {
            data.push(
                {
                    date: moment().format('MMM Do YYYY', tx.block_timestamp),
                    hash: tx.hash?.substring(0 , 6) + "..." + tx.hash?.substring(62),
                    from: tx.from_address?.substring(0 , 6) + "..." + tx.from_address?.substring(38),
                    to: tx.to_address?.substring(0 , 6) + "..." + tx.to_address?.substring(38),
                    value: tx.value / 1e18,
                    receipt_cumulative_gas_used: tx.receipt_cumulative_gas_used,
                    nonce: tx.nonce
                }
            )
        })

        return data
    }

    const transactionData = generateTxData()

    return (
        <div>
            <Title level={4}>Transaction History</Title>
            <Table loading={isFetching} dataSource={transactionData} columns={transactionColumns} />
        </div>
    )
}

export default Transactions
