import React, { useState } from 'react'
import { Typography, Statistic, Row, Col } from 'antd'

import { PolarArea, Doughnut, Pie } from 'react-chartjs-2'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Title } = Typography

const Dominance = (coins) => {
    const [dominance, setDominance] = useState(0)
    const coinList = coins?.coins?.data?.coins

    //calculate percentage of dominance
    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    const data = () => {
        //coin names / string name
        let names = ['Bitcoin MC ($)', 'Altcoins MC ($)']
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
            <Col xs={12} sm={12} lg={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                <Statistic value={dominance} prefix="~" suffix="%" precision={2}/>
                {/* <PolarArea data={data} height={100} width={100} /> */}
                <Doughnut data={data} height={100} width={100} />
            </Col>
        </>
    )
}

export default Dominance
