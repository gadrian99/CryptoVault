import React from 'react'
import { PolarArea } from 'react-chartjs-2'

const PolarAreaChart = (coins) => {
    const coinList = coins?.coins?.data?.coins
    const data = () => {
        //coin names / string name
        let names = ['Bitcoin', 'Altcoins']
        let btcMc = 0
        let altMc = 0
        // coin marketcap / integer marketCap
        // coin color / colorCode
        let colors = ['#f7931A', '#3C3C3D']

        coinList.forEach(({color, marketCap, name}) => {
            if ( name == "Bitcoin" ) {
                console.log(color)
                colors.push(color)
                btcMc = marketCap
            } else {
                colors.push(color)
                altMc += marketCap
                console.log(color)
            }
        })
        let marketcaps = [btcMc, altMc]

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
        <div style={{ width: '500px', height: '500px' }}>
            <PolarArea data={data} height={100} width={100} />
        </div>
    )
}

export default PolarAreaChart
