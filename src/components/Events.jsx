import React, { useState } from 'react'
import { Calendar, Badge, Typography, Skeleton, Row, Col, Card } from 'antd';
import { useGetStatusUpdateQuery } from "../services/coinGeckoApi"
import Loader from './Loader'
import moment from 'moment'
const { Title, Text, Paragraph } = Typography
const { Meta } = Card

const Events = () => {
    const { data, isFetching } = useGetStatusUpdateQuery()
    const [selectedEvents, setSelectedEvents] = useState([])
    const allEvents = data?.status_updates
    
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getListData = (list) => {
        let listData = []
        list?.status_updates.forEach(x => {
            listData.push({
                category: x.category,
                created_at: x.created_at,
                description: x.description
            })
        })
        
        return listData || []
    }

    function dateCellRender() {
        const listData = getListData(data)

        return(
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        )
    }
    function monthCellRender() {}

    function renderEvents() {

        const colorGenerator = (x) => {
            switch(x) {
                case 'general':
                    return '#F68701'
                    break;
                case 'partnership':
                    return '#2D4B8B'
                    break;
                case 'software_release':
                    return '#7400B2'
                    break;
                case 'milestone':
                    return '#00B347'
                    break;
                case 'exchange_listing':
                    return '#B30000'
                    break;
                default:
                    break
            }
        }
        return allEvents?.map((x) => ((
            <>  
                <Badge.Ribbon
                        text={capitalize(x.category)}
                        color={colorGenerator(x.category)}
                >
                    <Card hoverable size="small" style={{ marginBottom: '10px', padding: '1rem' }}>
                        <Meta 
                            avatar={<img alt="event" src={x.project.image.small} />} 
                            title={<h5>{x.project.name} - {moment(x.created_at, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow()}</h5>} 
                            description={x.description} 
                        />
                        <Text style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>{x.user} - {x.user_title}</Text>
                    </Card>
                </Badge.Ribbon>
            </>
        )))
    }


    if (isFetching) return(<Loader />)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            
            {/* <Col xs={24} sm={24} xl={20} >
                <Title level={2}>
                    Events
                </Title>
                <Calendar />
            </Col> */}

            <Col xs={24} sm={24} xl={24} style={{ marginTop: '50px' }}>
                <Title level={2}>
                        Recent Events
                </Title>
                {/* <Skeleton avatar paragraph={{ rows: 4 }} /> */}
                {renderEvents()}

            </Col>
            
            
        </div>
    )
}

export default Events
