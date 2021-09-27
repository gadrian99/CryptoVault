import React from 'react'
import { Calendar, Typography, Skeleton } from 'antd';

import { useGetCalendarEventsQuery } from '../services/calendarApi';

import Loader from './Loader'

const { Title } = Typography


const Events = () => {
    const { data, isFetching } = useGetCalendarEventsQuery()
    function dateCellRender() {}
    function monthCellRender() {}
    if (isFetching) return <Loader />;

    return (
        <div>
            <Title level={2}>
                Events
            </Title>
            <Calendar />
            <Title level={2}>
                Upcoming Events
            </Title>
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <Skeleton avatar paragraph={{ rows: 4 }} />
            <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
    )
}

export default Events
