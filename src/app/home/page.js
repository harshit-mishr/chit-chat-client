'use client';
import React, { useState } from 'react';
import withAuth from '@/utils/authentication/withAuth';
import MainLayout from '@/components/CommonLayout/layout';
import { Layout, theme } from 'antd';

const { Content } = Layout;

const Home = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                style={{
                    margin: '0rem',
                    marginTop: '5rem',
                    marginLeft: collapsed ? '4rem' : '20rem',
                    transition: 'margin-left margin-right 0.9s ease-in-out',
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
                    Bill is a cat.
                </div>
            </Content>
        </MainLayout>
    );
};
export default withAuth(Home);
