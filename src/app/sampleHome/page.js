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
import styles from './styles.module.css';
import apiService from '@/service/apiService';
import { useRouter } from 'next/navigation';
import withAuth from '@/utils/authentication/withAuth';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Item } = Menu;

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

const SampleHome = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const [selectedKey, setSelectedKey] = useState('2');
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

    // ---------------------------------
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    const getUserData = async () => {
        try {
            const response = await apiService.get('/user', false);
            console.log('response', response);
            setUserData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // React.useEffect(() => {
    //     getUserData();
    // }, []);

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
    const content = (
        <div
            style={{
                height: '5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Button block>Profile</Button>
            <Button block onClick={logout}>
                Logout
            </Button>
        </div>
    );

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '5rem',
                    paddingLeft: '1.5rem',
                    position: 'fixed',
                    width: '100%',
                    top: 0,
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
                        flex: 0.3,
                        marginLeft: '2rem',
                        textDecoration: 'underline',
                    }}
                    level={4}
                >
                    ChitChat
                </Title>

                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="middle"
                    style={{ width: '20rem' }}
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

                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    style={{
                        flex: 0.5,
                        minWidth: 0,
                        // border: '1px solid red',
                        marginLeft: '5rem',
                    }}
                >
                    {navbarItems.map(item => (
                        <Item
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
                        </Item>
                    ))}
                </Menu>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    // selectedKeys={[selectedKey]}
                    // onClick={handleMenuClick}
                    style={{
                        flex: 0.3,
                        minWidth: 0,
                        // justifyContent: 'flex-end',
                        // border: '1px solid red',
                        marginLeft: '5rem',
                    }}
                >
                    {navbarSecondaryItems.map(item => (
                        <Item
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
                            }}
                        >
                            {item.key === '5' ? (
                                <Badge count={5}>
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
                                </Badge>
                            ) : (
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
                            )}
                        </Item>
                    ))}
                </Menu>

                <Popover
                    placement="leftBottom"
                    title={<span>{userData?.username?.toUpperCase()}</span>}
                    content={content}
                >
                    <Avatar
                        style={{
                            backgroundColor: '#141414',
                            border: '1px solid #424242',
                            borderColor: '#424242',
                        }}
                        shape="round"
                        size="large"
                        src={
                            userData?.profilePicture ||
                            'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
                        }
                    />
                </Popover>
            </Header>
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
};
export default withAuth(SampleHome);
