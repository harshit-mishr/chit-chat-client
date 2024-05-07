'use client';
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    AudioOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    ContactsOutlined,
    UsergroupAddOutlined,
    BellOutlined,
} from '@ant-design/icons';
import {
    Layout,
    Menu,
    theme,
    Input,
    Avatar,
    Badge,
    Popover,
    Button,
} from 'antd';
import { Typography } from 'antd';
import apiService from '@/service/apiService';
import { useRouter } from 'next/navigation';
import withAuth from '@/utils/authentication/withAuth';
import Navbar from '@/components/Navbar';
import MainLayout from '@/components/MainLayout';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Item } = Menu;

const Home = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const [selectedKey, setSelectedKey] = useState('2');
    const handleMenuClick = e => {
        setSelectedKey(e.key);
    };

    // ---------------------------------

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await apiService.post(
                '/auth/logout',
                { refreshToken },
                false,
            );
            console.log('response', response);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push('/auth/login');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //-------------------------------------

    return <MainLayout />;
};
export default withAuth(Home);
