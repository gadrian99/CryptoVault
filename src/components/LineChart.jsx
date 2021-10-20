import React from 'react'
import { Line } from 'react-chartjs-2'
import { Row, Typography, Statistic } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName, color }) => {
    const coinPrice = []
    const coinTimeStamp = []

    for(let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: 'transparent',
                borderColor: '#1890FF',
                tension: 0.4,
                borderCapStyle: 'round',
                pointRadius: 0,
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">Price Chart</Title>
                <Statistic title="Price Change" prefix={Math.sign(coinHistory?.data?.change) == -1 ? <ArrowDownOutlined /> : <ArrowUpOutlined /> } suffix="%" value={coinHistory?.data?.change} />
                <Statistic title={`Current ${coinName} price`} prefix='$' value={currentPrice} />
                <Line data={data} options={options} />

            </Row>
        </>
    )
}


export default LineChart
