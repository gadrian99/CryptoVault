import React, { useState } from 'react'
import { Badge, Typography, Skeleton, Row, Col, Card, Select,Pagination } from 'antd';

import { useGetStatusUpdateQuery } from "../services/coinGeckoApi"
import moment from 'moment'
const { Title, Text } = Typography
const { Meta } = Card
const { Option } = Select

const Events = () => {
    const [projectType, setProjectType] = useState('')
    const [currentCategory, setCurrentCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    
    const { data, isFetching } = useGetStatusUpdateQuery({ projectType, currentCategory })

    const statusUpdates = data?.status_updates
    
    const filters = [
        { id: 'general', type: 'General'},
        { id: 'milestone', type: 'Milestone'},
        { id: 'partnership', type: 'Partnership'},
        { id: 'exchange_listing', type: 'Exchange listing'},
        { id: 'software_release', type: 'Software release'},
        { id: 'fund_movement', type: 'Fund movement'},
        { id: 'new_listings', type: 'New listings'},
    ]

    const projecttypes = [
        { id: 'coin', type: 'Coin'},
        { id: 'market', type: 'Market'}
    ]

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function renderEvents() {

        const lastIndex = currentPage * perPage
        const firstIndex = lastIndex - perPage
        const current = statusUpdates.slice(firstIndex, lastIndex)

        const colorGenerator = (x) => {
            switch(x) {
                case 'general':
                    return '#F68701'
                case 'partnership':
                    return '#2D4B8B'
                case 'software_release':
                    return '#7400B2'
                case 'milestone':
                    return '#00B347'
                case 'exchange_listing':
                    return '#B30000'
                default:
                    break
            }
        }
        return current?.map((x) => ((
            <>  
                <Badge.Ribbon
                    text={capitalize(x.category)}
                    color={colorGenerator(x.category)}
                >
                    <Card hoverable size="small" style={{ marginBottom: '10px', padding: '1rem', borderRadius: '1rem' }}>
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

    if (isFetching) return(
        <>  
            <Title level={2}>
                Events
            </Title>
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <Skeleton avatar paragraph={{ rows: 4 }} />
        </>
    )

    
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '40px' }}>

                <Col xs={24} sm={24} xl={24}>
                    <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Title level={2} >
                                Status Updates
                        </Title>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '25rem', marginBottom: '10px'}}>
                            <div>
                                <Text>Type: </Text>
                                <Select defaultValue={projectType} style={{ width: 150 }} onChange={(e) => setProjectType(e)}>
                                    <Option value=" ">All</Option>
                                    {projecttypes.map(x => ((
                                        <>
                                            <Option value={x.id}>{x.type}</Option>
                                        </>
                                    )))}
                                </Select>
                            </div>
                            
                            <div>
                                <Text>Filter: </Text>
                                <Select defaultValue={currentCategory} style={{ width: 150 }} onChange={(e) => setCurrentCategory(e)}>
                                    <Option value=" ">All</Option>
                                    {filters.map(x => ((
                                        <>
                                            <Option value={x.id}>{x.type}</Option>
                                        </>
                                    )))}
                                </Select>
                            </div>
                        </div>
                    </Row>
                    {renderEvents()}                
                    <Pagination style={{ display: 'flex', justifyContent: 'center' }} defaultCurrent={currentPage} total={statusUpdates.length} onChange={(e) => setCurrentPage(e)} />
                   
                </Col>
                
                
            </div>
        </>
    )
}

export default Events
