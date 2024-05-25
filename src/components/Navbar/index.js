import { Avatar, Badge, Input, Layout, Menu, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
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
import CustomPopover from '../CustomPopover';
import { setSelectedOption } from '@/lib/redux/features/navbar/navbarSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import { usePathname, useRouter } from 'next/navigation';

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

function Navbar({ collapsed, setCollapsed, userData, logout }) {
    const onSearch = (value, _e, info) => console.log(info?.source, value); //will update in future
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { selectedOption } = useAppSelector(state => state.navbar);
    const handleMenuClick = e => {
        dispatch(setSelectedOption(e.key));
        handleNavigation(e.key);
    };

    //get route name from router
    const routeName = usePathname();
    console.log('route name-->', routeName);
    useEffect(() => {
        if (routeName.includes(['/profile'])) {
            dispatch(setSelectedOption(null));
        }
    }, [routeName]);

    const handleNavigation = e => {
        //write switch and cases if e === 1 then navigate to home
        switch (e) {
            case '1':
                console.log('home');
                router.push('/home');
                break;
            case '2':
                console.log('profile');
                router.push('/profile/setting');
                break;
            case '3':
                console.log('contacts');
                router.push('/contacts');
                break;
            default:
                break;
        }
    };

    const navbarItems = [
        {
            key: '1',
            label: (
                <HomeOutlined
                    style={{
                        fontSize: '1.2rem',
                        color:
                            selectedOption === '1'
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
                            selectedOption === '2'
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
                            selectedOption === '3'
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

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '5rem',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                position: 'fixed',
                width: '100%',
                top: 0,
                zIndex: 1,
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
                                    item.key === selectedOption
                                        ? '2px solid #1668dc'
                                        : 'none',
                                backgroundColor:
                                    item.key === selectedOption
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
                                        item.key === selectedOption
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
