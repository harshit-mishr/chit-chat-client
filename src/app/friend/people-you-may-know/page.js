'use client';

import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import apiService from '@/service/apiService';
import withAuth from '@/utils/authentication/withAuth';
import { Button, Form, Input, Layout, message, theme } from 'antd';
import { useRouter } from 'next/navigation';
import Style from './style.module.css';

import React, { useEffect, useRef, useState } from 'react';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import CPagination from '@/components/CommonPagination/CPagination';
import ProfileCardSkeleton from '@/components/SkeletonLoader/ProfileCardSkeleton/ProfileCardSkeleton';
import { useSocketContext } from '@/lib/contexts/SocketContext';
import { connectSocket } from '@/utils/socket/socket';
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
    const { socket } = useSocketContext();
    const searchValueRef = useRef(searchValue);
    const currentPageRef = useRef(currentPage);

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
        console.log('Yahase call huwa..');
        getPeopleYouMayKnow(1, true);
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
            setSearchValue(value);
            searchValueRef.current = value;
            currentPageRef.current = page;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log('searchValue', searchValue);

    const onPageChange = page => {
        setCurrentPage(page);
        currentPageRef.current = page;

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
            if (
                response.status === 200 ||
                response.status === 201 ||
                response.statusText === 'OK'
            ) {
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
            if (
                response.statusText === 'OK' ||
                response.status === 200 ||
                response.status === 201
            ) {
                if (searchValue) {
                    console.log(
                        'searchValue should call handleSearch',
                        searchValue,
                    );
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

    const onFriendRequest = async (item, action) => {
        console.log('item on follow', item, 'action', action);
        const loading = message.loading('Sending friend request', 0);
        try {
            const response = await apiService.post('/user/friend-request', {
                targetUserId: item._id,
                action,
            });
            console.log('response', response);
            if (
                response.statusText === 'OK' ||
                response.status === 200 ||
                response.status === 201
            ) {
                if (searchValue) {
                    handleSearch(searchValue, currentPage);
                } else {
                    getPeopleYouMayKnow(currentPage, false);
                }

                message.success(
                    item.username + ' Friend request sent successfully',
                );
                loading();
            }
        } catch (error) {
            message.error('Something went wrong while sending friend request');
            loading();
            console.error('Error:', error);
        } finally {
            loading();
        }
    };

    console.log('searchVurrent', searchValueRef.current);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        console.log("socket" , socket)
        // if (!socket) {
        //     connectSocket(accessToken);
        // }
        const handleSocketEvents = (eventName, data) => {
            const { info, from, to } = data;
            console.log(eventName, data, info);

            message.success(`${from}    ${info}   ${to}`);
            // Refresh the people list
            if (searchValueRef.current) {
                console.log(
                    'searchValue should call handleSearch',
                    searchValueRef.current,
                );
                handleSearch(searchValueRef.current, currentPageRef.current);
            } else {
                console.log(
                    'searchValue empty should call getPeopleYouMayKnow',
                );
                getPeopleYouMayKnow(currentPageRef.current, false);
            }
        };

        const eventNames = [
            'friendRequestSent',
            'unfriend',
            'friendRequestAccepted',
            'friendRequestCancelled',
            'friendRequestDeclined',
        ];

        eventNames.forEach(eventName => {
            socket?.on(eventName, handleSocketEvents.bind(null, eventName));
        });

        return () => {
            eventNames.forEach(eventName => {
                socket?.off(eventName);
            });
        };
    }, []);

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                 id = {collapsed ? 'collapesd' : 'extended'}
                 className={"main_side_bar"}
            >
                <div
                    style={{
                        minHeight: '100vh',
                        maxHeight: 'max-content',
                        marginBottom: '5rem',
                        borderRadius: '0.2rem',
                        overflow: 'hidden',
                    }}
                    className={`xm-100 xm-p-10`}
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
                                handleSearch(value, 1);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div
                        className={Style.profile_card_container}
                    >
                        {loading ? (
                            skeletonArray.map(item => (
                                <ProfileCardSkeleton className={Style.profile_card} active={true} key={item} />
                            ))
                        ) : (
                            <>
                                {peopleList.map((item, index) => (
                                    <ProfileCard
                                        className={Style.profile_card}
                                        searchValue={searchValue}   
                                        onFollow={() =>
                                            onFollow(item, 'follow')
                                        }
                                        onRemove={() =>
                                            onFollow(item, 'remove')
                                        }
                                        onUnFollow={() => onUnFollow(item)}
                                        onFriendRequestSend={() =>
                                            onFriendRequest(item, 'send')
                                        }
                                        onFriendRequestCancel={() =>
                                            onFriendRequest(item, 'cancel')
                                        }
                                        onFriendRequestAccept={() =>
                                            onFriendRequest(item, 'accept')
                                        }
                                        onFriendRequestReject={() =>
                                            onFriendRequest(item, 'decline')
                                        }
                                        onUnFriend={() =>
                                            onFriendRequest(item, 'unfriend')
                                        }
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
