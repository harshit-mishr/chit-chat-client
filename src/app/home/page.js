'use client';
import React, { useEffect, useState } from 'react';
import withAuth from '@/utils/authentication/withAuth';
import MainLayout from '@/components/CommonLayout/layout';
import { Layout, message, theme } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUserData } from '@/lib/features/user/userSlice';

const { Content } = Layout;

const Home = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();

    // Select the user data and loading state from the store
    const loading = useAppSelector(state => state.user.loading);
    const error = useAppSelector(state => state.user.error);

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    useEffect(() => {
        if (error) {
            message.error(`Error: ${error}`);
        }
    }, []);

    if (loading === 'loading') return <div>Loading...</div>;

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
                ></div>
            </Content>
        </MainLayout>
    );
};
export default withAuth(Home);
