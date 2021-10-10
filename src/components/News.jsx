import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
    const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 18})
    const { data } = useGetCryptosQuery(100)


    if(!cryptoNews?.value) return <Loader />

    return (
        <div>
            {!simplified && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Title className="news-title" level={2}>News</Title>
                    <Col spam={24} style={{ marginBottom: '1rem' }}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a coin"
                            optionFilterProp="children"
                            onChange={(value) => setnewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0 }
                        >
                            <Option value="cryptocurrency">Cryptocurrency</Option>
                            {data?.data?.coins.map(coin => <Option value={coin.name}>{coin.name}</Option>)}
                        </Select>
                    </Col>
                </div>
                
            )}
            <Row gutter={[ 24, 24]}>
                {cryptoNews.value.map((news, i) => (
                    <Col xs={24} sm={24} lg={12} key={i}>
                        <Card hoverable className="news-card" style={{ borderRadius: '1rem' }}>
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{news.name}</Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                </div>
                                <p>
                                    {news.description > 100
                                        ? `${news.description.substring(0, 100)}...`
                                        : news.description
                                    }
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default News
