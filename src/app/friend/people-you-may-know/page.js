'use client';

import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import apiService from '@/service/apiService';
import withAuth from '@/utils/authentication/withAuth';
import { Button, Form, Input, Layout, message, theme } from 'antd';
import { useRouter } from 'next/navigation';
import Style from './style.module.css';

import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import CPagination from '@/components/CommonPagination/CPagination';
import ProfileCardSkeleton from '@/components/SkeletonLoader/ProfileCardSkeleton/ProfileCardSkeleton';
const { Content } = Layout;

function PeopleYouMayKnow() {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [peopleList, setPeopleList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const skeletonArray = Array.from({ length: 9 }, (_, i) => i);

    const onLeftClick = () => {
        router.back();
    };

    async function getPeopleYouMayKnow(page = 1, notShowLoader = false) {
        // const filter = { city: 'New York', country: 'USA' };
        if (!notShowLoader) {
            setLoading(false);
        } else {
            setLoading(true);
        }
        const filter = {};

        try {
            const response = await apiService.get(
                'user/people-you-may-know',
                {
                    page: page,
                    limit: 9,
                    filter: JSON.stringify(filter) || null,
                },
                true,
            );

            setPeopleList(response.data.data);
            setTotalCount(response.data.total);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPeopleYouMayKnow(currentPage, true);
    }, []);

    const handleSearch = async (value, page = 1) => {
        console.log('value', value, 'page', page);
        const filter = {};
        try {
            const response = await apiService.get(
                'user/search-people',
                {
                    page: page,
                    limit: 9,
                    search: value,
                    filter: JSON.stringify(filter) || null,
                },
                true,
            );
            console.log('response', response);
            setPeopleList(response.data.data);
            setTotalCount(response.data.total);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log('searchValue', searchValue);

    const onPageChange = page => {
        setCurrentPage(page);

        if (searchValue) {
            handleSearch(searchValue, page);
        } else {
            getPeopleYouMayKnow(page, true);
        }

        // Scroll to top smoothly
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, 500);
    };

    const onFollow = async (item, action) => {
        //for action remove we have to reset the userData removeSuggestion array of redux as it is buggy
        console.log('item on follow', item);
        const loading = message.loading(
            action === 'follow' ? 'Following ' : 'Removing ' + item.username,
            0,
        );
        try {
            const response = await apiService.post('/user/follow-user', {
                targetUserId: item._id,
                action: action,
            });
            console.log('response', response);
            if (response.statusText === 'OK') {
                if (searchValue) {
                    console.log(
                        'searchValue should call handleSearch',
                        searchValue,
                    );
                    handleSearch(searchValue, currentPage);
                } else {
                    console.log(
                        'searchValue empty should call getPeopleYouMayKnow',
                    );
                    getPeopleYouMayKnow(currentPage, false);
                }

                message.success(
                    `${item.username}  ${
                        action === 'follow'
                            ? 'Followed successfully'
                            : 'Removed'
                    }`,
                );
                loading();
            }
        } catch (error) {
            message.error(
                `Something went wrong while ${
                    action === 'follow' ? 'Following ' : 'Removing'
                } ` + item.username,
            );
            loading();
            console.error('Error:', error);
        } finally {
            loading();
        }
    };

    const onUnFollow = async item => {
        console.log('item on follow', item);
        const loading = message.loading('Un-Following ' + item.username, 0);
        try {
            const response = await apiService.post('/user/follow-user', {
                targetUserId: item._id,
                action: 'unfollow',
            });
            console.log('response', response);
            if (response.statusText === 'OK') {
                if (searchValue) {
                    handleSearch(searchValue, currentPage);
                } else {
                    getPeopleYouMayKnow(currentPage, false);
                }

                message.success(item.username + ' Un-Followed successfully');
                loading();
            }
        } catch (error) {
            message.error(
                'Something went wrong while Un-following ' + item.username,
            );
            loading();
            console.error('Error:', error);
        } finally {
            loading();
        }
    };

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                style={{
                    margin: '0rem',
                    // marginTop: '1rem',
                    marginLeft: collapsed ? '20vh' : '30rem',
                    transition: 'margin-left margin-right 0.9s ease-in-out',

                    maxWidth: '50vw',
                }}
            >
                <div
                    style={{
                        // padding: 10,
                        minHeight: '100vh',
                        maxHeight: 'max-content',
                        marginBottom: '5rem',
                        // background: colorBgContainer,
                        borderRadius: '0.2rem',
                        overflow: 'hidden',
                    }}
                >
                    <CommonHeader
                        className={Style.common_header}
                        backgroundColor="black"
                        title="People You May Know"
                        onLeftClick={() => onLeftClick()}
                    />

                    <div style={{ marginTop: '10vh', textAlign: 'center' }}>
                        <Input.Search
                            className={Style.search_input}
                            placeholder="Search People"
                            loading={false}
                            enterButton="Search"
                            allowClear
                            size="large"
                            onSearch={value => {
                                setSearchValue(value);
                                handleSearch(value, 1);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: '5vh',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        {loading ? (
                            skeletonArray.map(item => (
                                <ProfileCardSkeleton active={true} key={item} />
                            ))
                        ) : (
                            <>
                                {peopleList.map((item, index) => (
                                    <ProfileCard
                                        searchValue={searchValue}
                                        onFollow={() =>
                                            onFollow(item, 'follow')
                                        }
                                        onRemove={() =>
                                            onFollow(item, 'remove')
                                        }
                                        onUnFollow={() => onUnFollow(item)}
                                        key={item._id}
                                        data={item}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <div style={{ marginTop: '5vh', textAlign: 'center' }}>
                        <CPagination
                            totalCount={totalCount}
                            onPageChange={onPageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
}

export default PeopleYouMayKnow;
