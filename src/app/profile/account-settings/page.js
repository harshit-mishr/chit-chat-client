'use client';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import withAuth from '@/utils/authentication/withAuth';
import { Layout, theme } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function AccountSetting() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const onLeftClick = () => {
        router.back();
    };
    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                style={{
                    margin: '0rem',
                    marginTop: '6rem',
                    marginLeft: collapsed ? '20rem' : '30rem',
                    transition: 'margin-left margin-right 0.9s ease-in-out',
                    marginRight: '20rem',
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
                    <CommonHeader
                        title="Account Settings"
                        onLeftClick={() => onLeftClick()}
                    />
                </div>
            </Content>
        </MainLayout>
    );
}

export default withAuth(AccountSetting);
