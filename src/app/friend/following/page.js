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

function FollowingPeople() {
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
                'user/following',
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

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                id={collapsed ? 'collapesd' : 'extended'}
                className={'main_side_bar'}
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
                        title="Following"
                        onLeftClick={() => onLeftClick()}
                    />

                    <>
                        <div className={Style.profile_card_container}>
                            {loading ? (
                                skeletonArray.map(item => (
                                    <ProfileCardSkeleton
                                        className={Style.profile_card}
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
                                                        No people found
                                                    </Typography.Title>
                                                }
                                            />

                                            <Link
                                                block
                                                href="/friend/people-you-may-know"
                                                style={{
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                Follow people
                                            </Link>
                                        </div>
                                    ) : (
                                        peopleList.map((item, index) => (
                                            <ProfileCard
                                                className={Style.profile_card}
                                                onUnFollow={() =>
                                                    onUnFollow(item)
                                                }
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

export default FollowingPeople;
