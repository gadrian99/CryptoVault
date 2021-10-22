import React, { useState, useEffect } from 'react'
import millify from 'millify'
import moment from 'moment'
import { TagsTwoTone, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

import { Typography, Table } from 'antd'
import {
    useGetTransactionsQuery
} from '../services/moralisApi'

const { Title } = Typography

const Transactions = ({ address , chain }) => {
    const { data: transactions, isFetching } = useGetTransactionsQuery({ address, chain })
    const [mobileView, setMobileView] = useState(true)
    const [tabletView, setTabletView] = useState(false)
    const [screenSize, setScreenSize] = useState(null)
    console.log(transactions)
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if(screenSize <= 500) {
            setMobileView(true)
            setTabletView(false)
        } else if (screenSize >= 500 && screenSize < 1000) {
            setMobileView(false)
            setTabletView(true)
        } else {
            setMobileView(false)
            setTabletView(false)
        }
    }, [screenSize])

    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Tx Hash',
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
    
    const mobileColumns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
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
        }
    ]

    const tabletColumns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Tx Hash',
            dataIndex: 'hash',
            key: 'hash',
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
        }
    ]

    function renderTypeOf(add) {
        if(add === address ) {
            return <ArrowUpOutlined style={{ color: 'red' }} />
        } else {
            return <ArrowDownOutlined style={{ color: 'green'}}/>
        }
    }

    const tableData = () => {
        let data = []

        transactions?.result?.map((tx) => {
            data.push(
                {   
                    type: renderTypeOf(tx.from_address),
                    date: moment().format('MMM/D/YY', tx.block_timestamp),
                    hash: tx.hash?.substring(0 , 6) + "..." + tx.hash?.substring(62),
                    from: tx.from_address?.substring(0 , 6) + "..." + tx.from_address?.substring(38),
                    to: tx.to_address?.substring(0 , 6) + "..." + tx.to_address?.substring(38),
                    value: tx.value / 1e18,
                    receipt_cumulative_gas_used: millify(tx.receipt_cumulative_gas_used),
                    nonce: tx.nonce
                }
            )
        })

        return data
    }

    function renderColumns() {
        if(screenSize <= 470) {
            return mobileColumns
        } else if (screenSize >= 470 && screenSize <= 710) {
            return tabletColumns
        } else {
            return columns
        }
    }

    function renderTypeOf(add) {
        if(add === address ) {
            return <ArrowUpOutlined style={{ color: 'red' }} />
        } else {
            return <ArrowDownOutlined style={{ color: 'green'}}/>
        }
    }

    return (
        <div>
            <Title level={4}>History</Title>
            <Table loading={isFetching} dataSource={tableData()} columns={renderColumns()} />
        </div>
    )
}

export default Transactions
