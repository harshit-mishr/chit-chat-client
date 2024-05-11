'use client';
import MainLayout from '@/components/CommonLayout/layout';
import {
    AccountBookOutlined,
    LockOutlined,
    TwitterOutlined,
    DoubleRightOutlined,
} from '@ant-design/icons';
import withAuth from '@/utils/authentication/withAuth';
import { Card, Layout, theme } from 'antd';
import React, { useEffect, useState } from 'react';
const { Content } = Layout;
import styles from './style.module.css';
import { useRouter } from 'next/navigation';

function Profile() {
    const [collapsed, setCollapsed] = useState(false);
    const [hover, setHover] = useState(false);
    const [hoverOption, setHoverOption] = useState(null);
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const profileOption = [
        {
            key: '1',
            label: 'Account Settings',
            icon: <AccountBookOutlined style={{ fontSize: '1.5rem' }} />,
        },
        {
            key: '2',
            label: 'Social Accounts',
            icon: <TwitterOutlined style={{ fontSize: '1.5rem' }} />,
        },
        {
            key: '3',
            label: 'Password',
            icon: <LockOutlined style={{ fontSize: '1.5rem' }} />,
        },
    ];

    const handleNavigation = e => {
        switch (e) {
            case '1':
                console.log('account settings');
                router.push('/user-settings/account-settings');
                break;
            case '2':
                console.log('social accounts');
                break;
            case '3':
                console.log('password');
                break;
            default:
                break;
        }
    };

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                style={{
                    margin: '0rem',
                    marginTop: '1rem',
                    marginLeft: '2rem',
                    transition: 'margin-left margin-right 0.9s ease-in-out',

                    maxWidth: '50vw',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: '100vh',
                        maxHeight: '100vh',
                        background: colorBgContainer,
                    }}
                >
                    <h1 style={{ textAlign: 'center' }}>Settings</h1>

                    <div style={{ marginTop: '2rem' }}>
                        {profileOption.map(item => (
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

export default withAuth(Profile);
