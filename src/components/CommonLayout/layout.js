import React from 'react';
import Navbar from '../Navbar';
import { Layout } from 'antd';
import apiService from '@/service/apiService';
import { useRouter } from 'next/navigation';
import SideBar from '../Sidebar';

function MainLayout({ children, collapsed, setCollapsed, userData }) {
    const router = useRouter();

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
        <Layout>
            {
                // <Navbar
                //     collapsed={collapsed}
                //     setCollapsed={setCollapsed}
                //     userData={userData}
                //     logout={logout}
                // />
            }
            <Layout>
                {
                    //     <Sider
                    //     width={'20rem'}
                    //     style={{
                    //         overflow: 'auto',
                    //         height: '100vh',
                    //         position: 'fixed',
                    //         left: 0,
                    //         top: '5rem',
                    //         bottom: 0,
                    //         transition: 'margin-left 0.3s ease-in-out',
                    //     }}
                    //     // collapsible
                    //     collapsed={collapsed}
                    //     onCollapse={value => setCollapsed(value)}
                    // >
                    //     <Menu
                    //         theme="dark"
                    //         defaultSelectedKeys={['1']}
                    //         mode="inline"
                    //         items={items}
                    //     />
                    // </Sider>
                }
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

                {children}
            </Layout>
        </Layout>
    );
}

export default MainLayout;
