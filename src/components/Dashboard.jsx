import React, { useState, useEffect }from 'react'
import { Typography, Button, Table } from 'antd'
import { useMoralis } from "react-moralis";

import Loader from './Loader'

const { Title } = Typography

const Dashboard = () => {
    const [txs, setTxs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { Moralis, user } = useMoralis()
    // console.log(txs)
    useEffect(async () => {
        setLoading(true)
        try {
            await Moralis.Web3API.account.getTransactions()
                .then((data) => {setTxs(data.result)})
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }, [])
    
    // Table Data
    const columns = [
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

    const generateData = () => {
        let sourceData = []
        
        txs.map((tx,  i = 0) => {
            sourceData.push(
                {
                    date: tx.block_timestamp,
                    hash: tx.hash,
                    from: tx.from_address,
                    to: tx.to_address,
                }
            )
        })
        return sourceData
    }
    const dataSource = generateData()


    if (loading) { return( <Loader /> )}
    if (error) { return( <div>Error</div>)}
    return(
        <div>
            <Button onClick={() => console.log(dataSource)}>Get</Button>
            <Title level={2}>Dashboard</Title>
            <Table dataSource={dataSource} columns={columns} />
            {/* {txs.length != 0 && (
                txs.map((tx) => (
                    <p>{tx.hash}</p>
                ))
            )} */}
        </div>
    )

}

export default Dashboard
