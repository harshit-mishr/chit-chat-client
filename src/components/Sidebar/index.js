import { Badge, Layout, Menu, Typography } from 'antd';
import React from 'react';
const { Sider } = Layout;
const { Title } = Typography;
import {
    MessageOutlined,
    FileOutlined,
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
    BellOutlined,
} from '@ant-design/icons';
import LogoSVG from '../../utils/assets/logo/logo.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const items = [
    {
        label: 'Home',
        key: '1',
        icon: <HomeOutlined style={{ fontSize: '1.2rem' }} />,
        path: '/home',
    },
    {
        label: 'Chats',
        key: '2',
        icon: <MessageOutlined style={{ fontSize: '1.2rem' }} />,
        path: '/messages',
    },
    {
        label: 'Notifications',
        key: '3',
        icon: <BellOutlined style={{ fontSize: '1.2rem' }} />,
        path: '/notifications',
    },
    {
        label: 'Profile',
        key: '4',
        icon: <UserOutlined style={{ fontSize: '1.2rem' }} />,
        path: '/profile',
    },
    {
        label: 'Settings',
        key: '5',
        icon: <SettingOutlined style={{ fontSize: '1.2rem' }} />,
        path: '/user-settings/setting',
    },
];

function SideBar({ collapsed, setCollapsed }) {
    const router = useRouter();
    const routeName = usePathname();

    // Get the current path and use it to set the selected key
    const selectedKey = items.find(item => item.path === routeName)?.key;

    const handleNavigation = e => {
        switch (e.key) {
            case '1':
                console.log('home');
                router.push('/home');
                break;
            case '2':
                console.log('messages');
                router.push('/messages');
                break;
            case '3':
                console.log('notifications');
                router.push('/notifications');
                break;
            case '4':
                console.log('profile');
                router.push('/profile');
                break;
            case '5':
                console.log('settings');
                router.push('/user-settings/setting');
            default:
                break;
        }
    };
    return (
        <Sider
            width={'20rem'}
            collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
            style={{ width: '20rem' }}
        >
            <div
                style={{
                    marginTop: '1rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '0.2rem',
                        // justifyContent: 'space-between',
                        padding: '0.5rem 1rem',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src={LogoSVG}
                        width={50}
                        height={50}
                        alt="logo"
                        style={{ overflow: 'hidden', borderRadius: '10%' }}
                    />

                    {!collapsed && (
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
                    )}
                </div>
                <Menu
                    style={{ marginTop: '1rem' }}
                    theme="dark"
                    selectedKeys={[selectedKey]}
                    mode="inline"
                    items={items}
                    onClick={handleNavigation}
                ></Menu>
            </div>
        </Sider>
    );
}

export default SideBar;
