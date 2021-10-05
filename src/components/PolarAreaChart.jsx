import React, { useState } from 'react'
import { Typography, Statistic, Row, Col } from 'antd'

import { PolarArea } from 'react-chartjs-2'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Title } = Typography

const PolarAreaChart = (coins) => {
    const [dominant, setDominant] = useState(false)
    const [dominance, setDominance] = useState(0)
    const coinList = coins?.coins?.data?.coins

    //calculate percentage of dominance
    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    const data = () => {
        //coin names / string name
        let names = ['Bitcoin', 'Altcoins']
        let btcMc = 0
        let altMc = 0
        // coin marketcap / integer marketCap
        // coin color / colorCode
        let colors = ['#f7931A', '#3C3C3D']

        coinList?.forEach(({color, marketCap, name}) => {
            if ( name == "Bitcoin" ) {
                colors.push(color)
                btcMc = marketCap
            } else {
                colors.push(color)
                altMc += marketCap
            }
        })
        let marketcaps = [btcMc, altMc]
        let totalMc = btcMc + altMc
        setDominance(percentage(btcMc, totalMc))
        dominance >= 50 && setDominant(true)

        return ({
            labels: names,
            datasets: [{
                label: 'Market Cap Dataset',
                data: marketcaps,
                backgroundColor: colors
              }]
        })
    }


    return (
        <>
            <Col xs={12} sm={12} lg={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Statistic title="BTC Market Dominance" value={dominance} prefix={dominant ? <ArrowUpOutlined /> : <ArrowDownOutlined />} suffix="%" precision={2}/>
                <PolarArea data={data} height={100} width={100} />
            </Col>
            {/* <Title level={4}>BTC Market Dominance</Title> */}
        </>
    )
}

export default PolarAreaChart
