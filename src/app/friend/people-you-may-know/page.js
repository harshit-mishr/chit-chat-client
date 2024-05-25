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
const { Content } = Layout;

function PeopleYouMayKnow() {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [peopleList, setPeopleList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const onLeftClick = () => {
        router.back();
    };

    async function getPeopleYouMayKnow(page = 1) {
        // const filter = { city: 'New York', country: 'USA' };
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
        }
    }

    useEffect(() => {
        getPeopleYouMayKnow();
    }, []);

    const onPageChange = page => {
        setCurrentPage(page);
        getPeopleYouMayKnow(page);
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
                        {peopleList.map((item, index) => (
                            <ProfileCard key={index} data={item} />
                        ))}
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
