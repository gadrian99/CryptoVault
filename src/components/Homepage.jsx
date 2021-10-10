import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Card } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { useGetTrendingCoinsQuery, useGetGlobalDataQuery, useGetGlobalDefiDataQuery } from '../services/coinGeckoApi'

import { Cryptocurrencies, News, Events, Dominance } from '../components'
import Loader from './Loader'

const { Title, Text } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const { data: allData } = useGetCryptosQuery(100)
    const { data: xCoins } = useGetTrendingCoinsQuery()
    const { data: geckoGlobalData} = useGetGlobalDataQuery()
    const { data: geckoDefiData} = useGetGlobalDefiDataQuery()

    const dailyChange = geckoGlobalData?.data?.market_cap_change_percentage_24h_usd
    const globalDefiData = geckoDefiData?.data
    const trendingCoins = xCoins?.data
    const globalStats = data?.data?.stats
    console.log(geckoDefiData?.data)
    if (isFetching) return <Loader />;
    return (
        <>
            <Card style={{ marginBottom: '30px', borderRadius: '1rem'}} title={<h1>Global Crypto Stats</h1>} hoverable>
                <Row gutter={[32,32]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Col>
                        <Statistic title="📈 24h Market Change" value={dailyChange} prefix="~" suffix="%" precision={2}/>
                    </Col>
                    <Col>
                        <Statistic title="📊 Total 24h Volume"value={'$' + millify(globalStats.total24hVolume)}/>
                    </Col>
                    <Col>
                        <Statistic title="♾️ Total Market Cap" value={'$' + millify(globalStats.totalMarketCap)}/>
                    </Col>
                    <Col>
                        <Link to='/cryptocurrencies'>
                            <Statistic title="✨ Total Cryptocurrencies" value={globalStats.total}/>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/exchanges">
                            <Statistic title="💱 Total Exchanges" value={millify(globalStats.totalExchanges)}/>
                        </Link>
                    </Col>
                    <Col>
                        <Statistic title="🏛️ Total Markets" value={millify(globalStats.totalMarkets)}/>
                    </Col>
                </Row>
            </Card>

            <Card style={{ marginBottom: '30px', borderRadius: '1rem'}} hoverable>
                <Row gutter={[32,32]} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Dominance coins={allData} />
                    <iframe 
                    src={`https://lunarcrush.com/widgets/galaxyscore?symbol=BTC&interval=1 Week&animation=true&theme=light`}
                    id="galaxy-score" 
                    frameBorder="0" 
                    border="0" 
                    cellspacing="0" 
                    scrolling="no" 
                    style={{ width: '50%', height: '400px', marginTop: '50px', borderRadius: '1rem', }}>
                    </iframe>
                    <Text italic><InfoCircleOutlined /> The Galaxy Score™ indicates how healthy a coin is by looking at combined performance indicators across markets and social engagement. Display the real-time Galaxy Score™ of any coin.</Text>
                </Row>
            </Card>

            <Card style={{ marginBottom: '30px', borderRadius: '1rem'}} title={<h1>Global Defi Stats</h1>} hoverable>
                <Row gutter={[32,32]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <Col>
                        <Statistic title="DeFi Dominance" value={globalDefiData?.defi_dominance} prefix="~" suffix="%" precision={2}/>
                    </Col>
                    <Col>
                        <Statistic title="📊 Total 24h Volume" prefix="$" value={millify(globalDefiData?.trading_volume_24h)}/>
                    </Col>
                    <Col>
                        <Statistic title="♾️ DeFi Market Cap" prefix="$" value={millify(globalDefiData?.defi_market_cap)}/>
                    </Col>
                    <Col>
                        <Statistic title="Eth Market Cap" prefix="$" value={millify(globalDefiData?.eth_market_cap)} />
                    </Col>
                    <Col>
                        <Statistic title="DeFi / ETH Ratio" value={globalDefiData?.defi_to_eth_ratio} suffix="%" precision={2} />
                    </Col>
                    <Col>
                        <Statistic title="Top Coin Dominance" value={globalDefiData?.top_coin_defi_dominance} suffix="%" precision={2}/>
                    </Col>
                </Row>
            </Card>

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
