import { Avatar, Badge, Layout, Menu, Typography } from 'antd';
import React,{ useEffect } from 'react';
import Style from "./Sider.module.css"
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
import CustomPopover from '../CustomPopover';
import { useAppSelector } from '@/lib/hooks';

const items = [
    {
        label: 'Home',
        key: '1',
        icon: <HomeOutlined className={Style.menuLogo}  />,
        path: '/home',
    },
    {
        label: 'Chats',
        key: '2',
        icon: <MessageOutlined className={Style.menuLogo} />,
        path: '/messages',
    },
    {
        label: 'Notifications',
        key: '3',
        icon: <BellOutlined className={Style.menuLogo} />,
        path: '/notifications',
    },
    {
        label: 'Profile',
        key: '4',
        icon: <UserOutlined className={Style.menuLogo} />,
        path: '/profile',
    },
    {
        label: 'Settings',
        key: '5',
        icon: <SettingOutlined className={Style.menuLogo} />,
        path: '/user-settings/setting',
    },
];

function SideBar({ collapsed, setCollapsed, logout }) {
    const router = useRouter();
    const routeName = usePathname();
    const userData = useAppSelector(state => state.user.userData);
    
    
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

    const closeCollapse = () => {
        const hideTrigerbtn = document.querySelector(".ant-layout-sider-trigger")
        console.log(hideTrigerbtn,"asdasd")
        if (window.innerWidth <= 768) {
          console.log(window.innerWidth, "asdasd");
          setCollapsed(true);
          hideTrigerbtn.classList.add('hide')
        } else {
          console.log(window.innerWidth, "asdasd");
          setCollapsed(false);
          hideTrigerbtn.classList.remove('hide')
        }
      };
    
      useEffect(() => {
        const handleResize = () => {
          closeCollapse();
        };
        window.addEventListener('resize', handleResize);
        closeCollapse();
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <Sider
            width={'20rem'}
            collapsible 
            collapsed={collapsed}
            className={Style.mainContainer}
            onCollapse={value => setCollapsed(value)}
        >
            <div
                className={Style.container}
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
                        className={Style.mainLogo}
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

                <div
                    className={Style.sidebar_popover}
                >
                    <CustomPopover
                        collapsed={collapsed}
                        userData={userData}
                        logout={logout}
                    />
                </div>
            </div>
        </Sider>
    );
}

export default SideBar;
