import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Card } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services/cryptoApi'


import { Cryptocurrencies, News, Events } from '../components'
import Loader from './Loader'

const { Title } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats
    if (isFetching) return <Loader />;
    return (
        <>
         <Title level={2}>
            Global Crypto Stats
         </Title>
         <Row gutter={[32,32]}>
             <Col xs={12} sm={12} lg={6}>
                 <Link to='/cryptocurrencies'>
                    <Card title="Total Cryptocurrencies" hoverable>
                        <Statistic value={globalStats.total}/>
                    </Card>
                 </Link>
            </Col>
            <Col xs={12} sm={12} lg={6}>
                 <Link to="/exchanges">
                    <Card title="Total Exchanges" hoverable>
                        <Statistic value={millify(globalStats.totalExchanges)}/>
                    </Card>
                 </Link>
            </Col>
            <Col xs={12} sm={12} lg={6}>
                 <Card title="Total Market Cap">
                    <Statistic value={'$' + millify(globalStats.totalMarketCap)}/>
                 </Card>
            </Col>
            <Col xs={12} sm={12} lg={6}>
                 <Card title="Total 24h Volume">
                    <Statistic value={'$' + millify(globalStats.total24hVolume)}/>
                 </Card>
            </Col>
            <Col xs={12} sm={12} lg={6}>
                 <Card title="Total Markets">
                    <Statistic value={millify(globalStats.totalMarkets)}/>
                 </Card>
            </Col>
         </Row>

         <div className="home-heading-container">
             <Title level={2} className="home-title">Top 10 Coins</Title>
             <Title level={4} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
         </div>
         <Cryptocurrencies simplified/>

         <div className="home-heading-container">
             <Title level={2} className="home-title">Latest Crypto News</Title>
             <Title level={4} className="show-more"><Link to="/news">Show more</Link></Title>
         </div>
         <News simplified/>

         <Events />
        </>
    )
}

export default Homepage
