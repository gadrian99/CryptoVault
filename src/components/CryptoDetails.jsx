import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Card } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader'
import LineChart from './LineChart'

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
    const cryptoDetails = data?.data?.coin
    if (isFetching) return <Loader />;

    const time = ['24h', '7d', '30d', '1y', '5y']

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ]

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ]

    return (
        <Col className="coin-detail-container">
          <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
              {data?.data?.coin.name} ({data?.data?.coin.slug.split('-')[1].toUpperCase()}) Price
            </Title>
            <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
          </Col>
          <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
            {time.map((date) => <Option key={date}>{date}</Option>)}
          </Select>
          <Card style={{ marginTop: '10px' }}>
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} color={cryptoDetails.color}/>
          </Card>
          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
                <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
              </Col>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
            <Col className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
              </Col>
              {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
          </Col>
          <iframe 
            src={`https://lunarcrush.com/widgets/galaxyscore?symbol=${cryptoDetails.symbol}&interval=1 Week&animation=true&theme=light`}
            id="galaxy-score" 
            frameBorder="0" 
            border="0" 
            cellspacing="0" 
            scrolling="no" 
            style={{ width: '100%', height: '400px', marginTop: '50px', borderRadius: '1rem' }}>
          </iframe>
          <Text italic><InfoCircleOutlined /> The Galaxy Score™ indicates how healthy a coin is by looking at combined performance indicators across markets and social engagement. Display the real-time Galaxy Score™ of any coin.</Text>
          
          <iframe   
            src={`https://lunarcrush.com/widgets/altrank?symbol=${cryptoDetails.symbol}&interval=1 Week&animation=true&theme=light`} 
            id="altRank" 
            frameBorder="0" 
            border="0" 
            cellspacing="0" 
            scrolling="no" 
            style={{ width: '100%', height: '400px', marginTop: '50px', borderRadius: '1rem' }}>
          </iframe>
          <Text italic><InfoCircleOutlined /> AltRank™ measures a coin's performance VS. all other coins that we actively support. In general it is a unique measurement that combines ALT coin price performance relative to Bitcoin and other social activity indicators across the entire crypto market. A coin can have a high AltRank of 1 even in a bear market situation.</Text>

          <Col className="coin-desc-link">
            <Row className="coin-desc">
              <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
              {HTMLReactParser(cryptoDetails.description)}
            </Row>
            <Col className="coin-links">
              <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
              {cryptoDetails.links?.map((link) => (
                <Row className="coin-link" key={link.name}>
                  <Title level={5} className="link-name">{link.type}</Title>
                  <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                </Row>
              ))}
            </Col>
          </Col>
        </Col>
      );
}

export default CryptoDetails
