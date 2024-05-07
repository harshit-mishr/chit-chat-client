import { Avatar, Badge, Input, Layout, Menu, Typography } from 'antd';
import React, { useState } from 'react';
import {
    UserOutlined,
    MenuUnfoldOutlined,
    AudioOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    ContactsOutlined,
    UsergroupAddOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import CustomPopover from '../CustomPopover';

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Item } = Menu;

function Navbar({ collapsed, setCollapsed, userData }) {
    const router = useRouter();

    const onSearch = (value, _e, info) => console.log(info?.source, value); //will update in future
    const [selectedKey, setSelectedKey] = useState('1');
    const handleMenuClick = e => {
        setSelectedKey(e.key);
    };

    const navbarItems = [
        {
            key: '1',
            label: (
                <HomeOutlined
                    style={{
                        fontSize: '1.2rem',
                        color:
                            selectedKey === '1'
                                ? '#1668dc'
                                : 'rgba(255, 236, 236, 0.726)',
                    }}
                />
            ),
        },
        {
            key: '2',
            label: (
                <UsergroupAddOutlined
                    style={{
                        fontSize: '1.2rem',
                        color:
                            selectedKey === '2'
                                ? '#1668dc'
                                : 'rgba(255, 236, 236, 0.726)',
                    }}
                />
            ),
        },
        {
            key: '3',
            label: (
                <ContactsOutlined
                    style={{
                        fontSize: '1.2rem',
                        color:
                            selectedKey === '3'
                                ? '#1668dc'
                                : 'rgba(255, 236, 236, 0.726)',
                    }}
                />
            ),
        },
    ];

    const navbarSecondaryItems = [
        {
            key: '4',
            label: (
                <UserOutlined
                    style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255, 236, 236, 0.726)',
                    }}
                />
            ),
        },
        {
            key: '5',
            label: (
                <BellOutlined
                    style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255, 236, 236, 0.726)',
                    }}
                />
            ),
        },
    ];

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

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '5rem',
                paddingLeft: '1.5rem',
                paddingRight: '1rem',
                position: 'fixed',
                width: '100%',
                top: 0,
                // border: '1px solid #fff',
            }}
        >
            <div
                style={{
                    // border: '1px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    // flex: 0.2,
                    width: '20%',
                }}
            >
                {collapsed ? (
                    <MenuUnfoldOutlined
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '1.5rem',
                            color: 'rgba(255, 236, 236, 0.726)',
                        }}
                    />
                ) : (
                    <MenuFoldOutlined
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '1.5rem',
                            color: 'rgba(255, 236, 236, 0.726)',
                        }}
                    />
                )}

                <Title
                    style={{
                        // flex: 0.3,
                        marginLeft: '3vh',
                        textDecoration: 'underline',
                    }}
                    level={4}
                >
                    ChitChat
                </Title>
            </div>
            <div
                style={{
                    // flex: 1,
                    width: '80%',
                    // border: '1px solid red',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="middle"
                    style={{ width: '25vw' }}
                    suffix={
                        <AudioOutlined
                            style={{
                                fontSize: 16,
                                color: '#1677ff',
                            }}
                        />
                    }
                    onSearch={onSearch}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20%',
                        // border: '1px solid red',
                        width: '15vw',
                    }}
                >
                    {navbarItems.map(item => (
                        <div
                            onClick={() => handleMenuClick(item)}
                            key={item.key}
                            style={{
                                borderBottom:
                                    item.key === selectedKey
                                        ? '2px solid #1668dc'
                                        : 'none',
                                backgroundColor:
                                    item.key === selectedKey
                                        ? 'transparent'
                                        : 'inherit',
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar
                                style={{
                                    backgroundColor: '#141414',
                                    border: '1px solid #424242',
                                    borderColor:
                                        item.key === selectedKey
                                            ? '#1668dc'
                                            : '#424242',
                                }}
                                shape="round"
                                size="large"
                            >
                                {item.label}
                            </Avatar>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        // border: '1px solid red',
                        width: '10vw',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        gap: '10%',
                    }}
                >
                    <Badge count={5}>
                        <Avatar
                            style={{
                                backgroundColor: '#141414',
                                border: '1px solid #424242',
                                borderColor: '#424242',
                            }}
                            shape="round"
                            size="large"
                        >
                            <BellOutlined
                                style={{
                                    fontSize: '1.2rem',
                                    color: 'rgba(255, 236, 236, 0.726)',
                                }}
                            />
                        </Avatar>
                    </Badge>
                    <CustomPopover userData={userData} logout={logout} />
                </div>
            </div>
        </Header>
    );
}

export default Navbar;
