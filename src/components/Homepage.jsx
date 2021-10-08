import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Card } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services/cryptoApi'

import { Cryptocurrencies, News, Events, Dominance } from '../components'
import Loader from './Loader'

const { Title, Text } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const { data: allData } = useGetCryptosQuery(100)
    const globalStats = data?.data?.stats
    if (isFetching) return <Loader />;
    return (
        <>
         <Title level={2}>
            Global Crypto Stats
         </Title>
         <Row gutter={[32,32]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
             <Col xs={12} sm={12} lg={8}>
                 <Link to='/cryptocurrencies'>
                    <Statistic title="₿ Total Cryptocurrencies" value={globalStats.total}/>
                 </Link>
            </Col>
            <Col xs={12} sm={12} lg={8}>
                 <Link to="/exchanges">
                    <Statistic title="💱 Total Exchanges" value={millify(globalStats.totalExchanges)}/>
                 </Link>
            </Col>
            <Col xs={12} sm={12} lg={8}>
                <Statistic title="♾️ Total Market Cap" value={'$' + millify(globalStats.totalMarketCap)}/>
            </Col>
            <Col xs={12} sm={12} lg={8}>
                <Statistic title="📈 Total 24h Volume"value={'$' + millify(globalStats.total24hVolume)}/>
            </Col>
            <Col xs={12} sm={12} lg={8}>
                <Statistic title="🏛️ Total Markets" value={millify(globalStats.totalMarkets)}/>
            </Col>
            <Col xs={12} sm={12} lg={8}>
                <Statistic title="🏛️ Total Markets" value={millify(globalStats.totalMarkets)}/>
            </Col>
         </Row>

         <Row gutter={[32,32]} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Dominance coins={allData} />
            <iframe 
            src={`https://lunarcrush.com/widgets/galaxyscore?symbol=BTC&interval=1 Week&animation=true&theme=light`}
            id="galaxy-score" 
            frameBorder="0" 
            border="0" 
            cellspacing="0" 
            scrolling="no" 
            style={{ width: '50%', height: '400px', marginTop: '50px'}}>
          </iframe>
          <Text italic><InfoCircleOutlined /> The Galaxy Score™ indicates how healthy a coin is by looking at combined performance indicators across markets and social engagement. Display the real-time Galaxy Score™ of any coin.</Text>
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
         
         <Events simplified/>
         {/* <iframe
         style={{ width: '100%', height: "700px"}}
            id="onramper-widget"
            title="Onramper widget"
            frameborder="no"
            allow="accelerometer; autoplay; camera; gyroscope; payment;"
            src="https://widget.onramper.com?color=266678&apiKey=pk_test_jWCXCkJiKkFktEIitty3O160jc7OHEj2l0Hq93ngofw0">
        </iframe> */}

        </>
        
    )
}

export default Homepage
