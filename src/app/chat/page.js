'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/CommonLayout/layout';
import { Layout } from 'antd';
import styles from './style.module.css';
import UserListCard from '@/components/UserListCard/UserListCard';

const { Content } = Layout;

function Chat() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <MainLayout collapsed={true} setCollapsed={setCollapsed}>
            <Content id={'collapesd'} className={'main_side_bar'}>
                <div className={styles.left_container}>
                    <UserListCard />
                </div>
            </Content>
        </MainLayout>
    );
}

export default Chat;
