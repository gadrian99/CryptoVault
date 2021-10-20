import React from 'react'
import moment from 'moment'
import { Typography, Table } from 'antd'
import {
    useGetNFTsQuery
} from '../services/moralisApi'

const { Title } = Typography

const UserNFTs = ({ address , chain }) => {
    const { data: NFTs, isFetching } = useGetNFTsQuery({ address, chain })

    const nftColumns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Owner',
            dataIndex: 'owner_of',
            key: 'owner_of',
        },
        {
            title: 'Address',
            dataIndex: 'token_address',
            key: 'token_address',
        },
        {
            title: 'Block minted',
            dataIndex: 'block_number_minted',
            key: 'block_number_minted',
        },
        {
            title: 'Block number',
            dataIndex: 'block_number',
            key: 'block_number',
        },
        {
            title: 'Synced at',
            dataIndex: 'synced_at',
            key: 'synced_at',
        }
    ]

    const generatenftData = () => {
        let data = []

        NFTs?.result?.map((nft) => {
            data.push(
                {
                    amount: nft?.amount,
                    block_number: nft?.block_number,
                    block_number_minted: nft?.block_number_minted,
                    name: nft?.name,
                    owner_of: nft?.owner_of.substring(0 , 6) + "..." + nft?.owner_of.substring(38),
                    synced_at: moment().format('MMM Do YYYY', nft?.synced_at),
                    token_address:nft?.token_address.substring(0 , 6) + "..." + nft?.token_address.substring(38),
                }
            )
        })
        return data
    }
    const nftData = generatenftData()

    return (
        <div>
            <Title level={4}>NFTs List</Title>
            <Table loading={isFetching} dataSource={nftData} columns={nftColumns} />
        </div>
    )
}

export default UserNFTs
