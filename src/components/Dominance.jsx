import React, { useState } from 'react'
import { Statistic, Row, Col } from 'antd'

import { Doughnut } from 'react-chartjs-2'

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
            <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                <Col xs={12} sm={12} lg={6}>
                    <Statistic title="BTC Dominance" value={dominance} suffix="%" precision={2}/>
                </Col>
                <div style={{ minWidth: '400px' }}>
                    <Doughnut data={data} height={100} width={100} />
                </div>
            </Row>
        </>
    )
}

export default Dominance
