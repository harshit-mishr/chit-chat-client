import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Layout, Menu, theme } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import apiService from '@/service/apiService';
const { Content, Sider } = Layout;

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

function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [userData, setUserData] = useState(null);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const getUserData = async () => {
        try {
            const response = await apiService.get('/user', false);
            console.log('response', response);
            setUserData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    React.useEffect(() => {
        getUserData();
    }, []);

    return (
        <Layout>
            <Navbar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                userData={userData}
            />
            <Layout>
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

                {
                    <Content
                        style={{
                            margin: '0rem',
                            marginTop: '5rem',
                            marginLeft: collapsed ? '4rem' : '20rem',
                            transition:
                                'margin-left margin-right 0.9s ease-in-out',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: '100vh',
                                maxHeight: '100vh',
                                background: colorBgContainer,
                                // borderRadius: borderRadiusLG,
                            }}
                        >
                            Bill is a cat.
                        </div>
                    </Content>
                }
            </Layout>
        </Layout>
    );
}

export default MainLayout;
