import React, { useEffect, useState } from 'react'
import { Button, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons'

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
        if(screenSize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Link style={{ display: 'flex' }} to="/"><p className="font-face-at">CRYPTO</p><p className="font-face-at orange">VAULT</p></Link>  
                <Button className="menu-control-container" type="text" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
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
                    <Menu.Item icon={<UserOutlined />}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    )
}

export default Navbar
