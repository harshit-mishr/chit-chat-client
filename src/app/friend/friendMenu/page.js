'use client';
import MainLayout from '@/components/CommonLayout/layout';
import {
    DoubleRightOutlined,
    UsergroupAddOutlined,
    UserAddOutlined,
    UserSwitchOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import withAuth from '@/utils/authentication/withAuth';
import { Card, Layout, theme } from 'antd';
import React, { useEffect, useState } from 'react';
const { Content } = Layout;
import styles from './style.module.css';
import { useRouter } from 'next/navigation';

function FriendMenu() {
    const [collapsed, setCollapsed] = useState(false);
    const [hover, setHover] = useState(false);
    const [hoverOption, setHoverOption] = useState(null);
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const friendOption = [
        {
            key: '1',
            label: 'People you may know',
            icon: <UsergroupAddOutlined style={{ fontSize: '1.5rem' }} />,
        },
        {
            key: '2',
            label: 'Friends requests',
            icon: <UserAddOutlined style={{ fontSize: '1.5rem' }} />,
        },
        {
            key: '3',
            label: 'My Friends',
            icon: <TeamOutlined style={{ fontSize: '1.5rem' }} />,
        },
        {
            key: '4',
            label: 'Following',
            icon: <UserSwitchOutlined style={{ fontSize: '1.5rem' }} />,
        },
    ];

    const handleNavigation = e => {
        switch (e) {
            case '1':
                console.log('people you may know');
                router.push('/friend/people-you-may-know');
                break;
            case '2':
                console.log('Friends requests');
                router.push('/friend/friends-requests');
                break;
            case '3':
                console.log('My Friends');
                router.push('/friend/my-friends');
                break;
            case '4':
                console.log('My Friends');
                router.push('/friend/following');
                break;
            default:
                break;
        }
    };

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                  id = {collapsed ? 'collapesd' : 'extended'}
                  className={"main_side_bar"}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: '100vh',
                        maxHeight: '100vh',
                        background: colorBgContainer,
                    }}
                    className={`xm-100`}
                >
                    <h1 style={{ textAlign: 'center' }}>Settings</h1>

                    <div style={{ marginTop: '2rem' }}>
                        {friendOption.map(item => (
                            <div
                                className={
                                    hover && item.key === hoverOption
                                        ? styles.cardHover
                                        : styles.card
                                }
                                onMouseOver={() => {
                                    setHover(true);
                                    setHoverOption(item.key);
                                }}
                                onMouseLeave={() => {
                                    setHover(false);
                                    setHoverOption(null);
                                }}
                                onClick={() => {
                                    handleNavigation(item.key);
                                }}
                                key={item.key}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: 'center',
                                    }}
                                >
                                    <p style={{ fontSize: '1.5rem' }}>
                                        {item.icon}
                                    </p>
                                    <p>{item.label}</p>
                                </div>
                                <DoubleRightOutlined />
                            </div>
                        ))}
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
}

export default withAuth(FriendMenu);
