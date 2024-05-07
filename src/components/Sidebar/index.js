import { Layout, Menu } from 'antd';
import React from 'react';
const { Sider } = Layout;
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];

function SideBar({ collapsed, setCollapsed }) {
    return (
        <Sider
            width={'20rem'}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: '5rem',
                bottom: 0,
                transition: 'margin-left 0.3s ease-in-out',
            }}
            // collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
        >
            <Menu
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </Sider>
    );
}

export default SideBar;
