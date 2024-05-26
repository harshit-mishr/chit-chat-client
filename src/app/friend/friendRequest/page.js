'use client';

import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import apiService from '@/service/apiService';
import withAuth from '@/utils/authentication/withAuth';
import {
    Button,
    Empty,
    Form,
    Input,
    Layout,
    Typography,
    message,
    theme,
} from 'antd';
import { useRouter } from 'next/navigation';
import Style from './style.module.css';

import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import CPagination from '@/components/CommonPagination/CPagination';
import ProfileCardSkeleton from '@/components/SkeletonLoader/ProfileCardSkeleton/ProfileCardSkeleton';
import Link from 'next/link';
const { Content } = Layout;

function FriendRequest() {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [peopleList, setPeopleList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
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
                'user/friend-requests/friendRequestsReceived', //here we will add tad value friendRequestsReceived or friendRequestsSent
                {
                    page: page,
                    limit: 9,
                    filter: JSON.stringify(filter) || null,
                },
                true,
            );

            console.log('response', response.data);

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

    const onPageChange = page => {
        setCurrentPage(page);
        getPeopleYouMayKnow(page, true);

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
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
                getPeopleYouMayKnow(currentPage, false);
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
                getPeopleYouMayKnow(currentPage, false);

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
                        title="Friend Requests"
                        onLeftClick={() => onLeftClick()}
                    />

                    <>
                        <div
                            style={{
                                marginTop: '15vh',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            {loading ? (
                                skeletonArray.map(item => (
                                    <ProfileCardSkeleton
                                        active={true}
                                        key={item}
                                    />
                                ))
                            ) : (
                                <>
                                    {peopleList.length === 0 ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <Empty
                                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                imageStyle={{
                                                    height: 120,
                                                }}
                                                description={
                                                    <Typography.Title level={3}>
                                                        Not received any new
                                                        friend requests
                                                    </Typography.Title>
                                                }
                                            />
                                        </div>
                                    ) : (
                                        peopleList.map((item, index) => (
                                            <ProfileCard
                                                onFollow={() =>
                                                    onFollow(item, 'follow')
                                                }
                                                onRemove={() =>
                                                    onFollow(item, 'remove')
                                                }
                                                onUnFollow={() =>
                                                    onUnFollow(item)
                                                }
                                                onFriendRequestSend={() =>
                                                    onFriendRequest(
                                                        item,
                                                        'send',
                                                    )
                                                }
                                                onFriendRequestCancel={() =>
                                                    onFriendRequest(
                                                        item,
                                                        'cancel',
                                                    )
                                                }
                                                onFriendRequestAccept={() =>
                                                    onFriendRequest(
                                                        item,
                                                        'accept',
                                                    )
                                                }
                                                onFriendRequestReject={() =>
                                                    onFriendRequest(
                                                        item,
                                                        'decline',
                                                    )
                                                }
                                                onUnFriend={() =>
                                                    onFriendRequest(
                                                        item,
                                                        'unfriend',
                                                    )
                                                }
                                                hideRemoveButton={true}
                                                hideFollowUnFollowButton={true}
                                                key={item._id}
                                                data={item}
                                            />
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                        <div
                            style={{
                                marginTop: '5vh',
                                textAlign: 'center',
                            }}
                        >
                            {peopleList.length > 0 && (
                                <CPagination
                                    totalCount={totalCount}
                                    onPageChange={onPageChange}
                                    currentPage={currentPage}
                                />
                            )}
                        </div>
                    </>
                </div>
            </Content>
        </MainLayout>
    );
}

export default withAuth(FriendRequest);
