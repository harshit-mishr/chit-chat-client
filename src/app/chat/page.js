'use client';

import React, { useRef, useState } from 'react';
import MainLayout from '@/components/CommonLayout/layout';
import { Input, Layout } from 'antd';
import styles from './style.module.css';
import UserListCard from '@/components/UserListCard/UserListCard';
import apiService from '@/service/apiService';
import { values } from 'lodash';
import ChatLayout from '@/components/ChatLayout/ChatLayout';

const { Content } = Layout;

function Chat() {
    const [collapsed, setCollapsed] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const searchValueRef = useRef('');
    const currentPageRef = useRef(currentPage);
    const [friendList, setFriendList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async (value, page = 1) => {
        // Only fetch data if the search value is not empty
        if (value) {
            console.log('value', value, 'page', page);
            const filter = {};
            try {
                const response = await apiService.get(
                    'user/search-friend',
                    {
                        page,
                        limit: 9,
                        search: value,
                        filter: JSON.stringify(filter) || null,
                    },
                    true,
                );
                console.log('response', response);
                setFriendList(response.data.data);
                setTotalCount(response.data.total);
                searchValueRef.current = value;
                currentPageRef.current = page;
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // Clear data when the search value is empty
            setFriendList([]); // Reset friend list to empty array
            setTotalCount(0); // Reset total count
        }
    };

    return (
        <MainLayout
            collapsed={true}
            setCollapsed={setCollapsed}
            style={{ border: '1px solid red' }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    marginLeft: '8rem',
                    marginTop: '1rem',
                    width: '100%',
                }}
            >
                <div className={styles.left_container}>
                    <div
                        style={{
                            textAlign: 'center',
                            maxWidth: '20vw',
                            minWidth: '20vw',
                        }}
                    >
                        <Input.Search
                            className={styles.search_input}
                            placeholder="Search your friend"
                            loading={false}
                            enterButton
                            allowClear
                            size="large"
                            onChange={value => setSearchValue(value)}
                            onSearch={value => {
                                handleSearch(value, 1);
                                setCurrentPage(1);
                                // setSearchValue(value);
                            }}
                        />
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                        {friendList.length > 0 &&
                            friendList.map(item => (
                                <UserListCard key={item._id} data={item} />
                            ))}
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <ChatLayout />
                </div>
            </div>
        </MainLayout>
    );
}

export default Chat;
