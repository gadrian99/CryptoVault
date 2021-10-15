import React from 'react'
import millify from 'millify'
import axios from 'axios'
import { Typography, Row, Col, Statistic, Card } from 'antd'
import { InfoCircleOutlined, SwapRightOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { 
    useGetTrendingCoinsQuery, 
    useGetGlobalDataQuery, 
    useGetGlobalDefiDataQuery,
    useGetCoinPriceQuery 
} from '../services/coinGeckoApi'

import { Cryptocurrencies, News, Events, Dominance } from '../components'
import Loader from './Loader'

const { Title, Text } = Typography

const Homepage = () => {
    const getPrice = async (id) => {
        let x
        
        await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
            .then((res) => {
                const key = Object.keys(res.data)[0]
                const coin = res.data[key]
                x = coin
            })
        
        return x.usd
        
    }
    const { data, isFetching } = useGetCryptosQuery(10)
    const { data: allData } = useGetCryptosQuery(100)
    const { data: xCoins } = useGetTrendingCoinsQuery()
    const { data: geckoGlobalData} = useGetGlobalDataQuery()
    const { data: geckoDefiData} = useGetGlobalDefiDataQuery()

    const dailyChange = geckoGlobalData?.data?.market_cap_change_percentage_24h_usd
    const globalDefiData = geckoDefiData?.data
    const trendingCoins = xCoins?.coins

    const fetchCoinPrice = async (id) => {
        const res = await getPrice(id)
        return res
    }

    
    const globalStats = data?.data?.stats
       
    if (isFetching) return <Loader />
    return (
        <>
            <Card style={{ marginBottom: '30px', borderRadius: '1rem'}} title={<h1>Global Crypto Stats</h1>} hoverable>
                <Row gutter={[32,32]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Col>
                        <Statistic title="📈 24h Change" value={dailyChange} prefix={Math.sign(dailyChange) == -1 ? <ArrowDownOutlined /> : <ArrowUpOutlined /> } suffix="%" precision={2}/>
                    </Col>
                    <Col>
                        <Statistic title="📊 24h Volume"value={'$' + millify(globalStats.total24hVolume)}/>
                    </Col>
                    <Col>
                        <Statistic title="♾️ Total Market Cap" value={'$' + millify(globalStats.totalMarketCap)}/>
                    </Col>
                    <Col>
                        <Statistic title="✨ Coins/ Tokens" value={globalStats.total}/>
                    </Col>
                    <Col>
                        <Statistic title="💱 Total Exchanges" value={millify(globalStats.totalExchanges)}/>
                    </Col>
                    <Col>
                        <Statistic title="🏛️ Total Markets" value={millify(globalStats.totalMarkets)}/>
                    </Col>
                </Row>
            </Card>

            <Card style={{ marginBottom: '30px', borderRadius: '1rem'}} hoverable>
                <Row className="dominance-container" gutter={[32,32]} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
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

            {/* <Card style={{ marginBottom: '30px', borderRadius: '1rem'}} title={<h1>Global Defi Stats</h1>} hoverable>
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
                </Row>
            </Card> */}

            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Coins</Title>
                <Title level={4} className="show-more"><Link to="/cryptocurrencies">Show more <SwapRightOutlined /></Link></Title>
            </div>
            <Cryptocurrencies simplified/>

            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={4} className="show-more"><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified/>
            
            <Events simplified/>
        </>
    )
}

export default Homepage
