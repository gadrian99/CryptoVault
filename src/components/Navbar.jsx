import React, { useEffect, useState } from 'react'
import { Button, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, UserOutlined, CalendarOutlined, DownOutlined } from '@ant-design/icons'

import icon from '../images/logo.png'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if(screenSize < 800) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    const menu = (
        <Menu theme="dark">
          <Menu.Item>
            <Link to="/account/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/account/transfer">Transfer</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/account/swap">Dex Swap</Link>
          </Menu.Item>
        </Menu>
      );

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Link to="/"><img src={icon} style={{ height: '100px' }}/></Link>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                    <Menu.Item icon={<CalendarOutlined />}>
                        <Link to="/events">Events</Link>
                    </Menu.Item>
                    <Dropdown overlay={menu}>
                        <Menu.Item icon={<UserOutlined />}>
                            Account <DownOutlined />
                        </Menu.Item>
                    </Dropdown>
                </Menu>
            )}
        </div>
    )
}

export default Navbar
