'use client';
import React, { useEffect, useState } from 'react';
import withAuth from '@/utils/authentication/withAuth';
import MainLayout from '@/components/CommonLayout/layout';
import { Input, Layout, message, theme } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import { fetchUserData } from '@/lib/features/user/userSlice';
import CreatePost from '@/components/CreatePost/CreatePost';
import apiService from '@/service/apiService';
import PostCard from '@/components/PostCard/PostCard';

const { Content } = Layout;

const Home = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [refresh, setRefresh] = useState(false);

    const [collapsed, setCollapsed] = useState(false);
    const [allPost, setAllPost] = useState([]);

    const getAllPosts = async () => {
        try {
            const response = await apiService.get('/post', {}, true);
            setAllPost(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log('allPost', allPost);
    useEffect(() => {
        getAllPosts();
    }, [refresh]);

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                style={{
                    margin: '0rem',
                    marginTop: '1rem',
                    marginLeft: '2rem',
                    transition: 'margin-left margin-right 0.9s ease-in-out',
                    maxWidth: '50vw',
                }}
            >
                <div
                    style={{
                        padding: 45,
                        minHeight: '100vh',
                        maxHeight: 'max-content',
                        // background: colorBgContainer,
                        // border: '1px solid #424242',
                    }}
                >
                    <CreatePost setRefresh={setRefresh} refresh={refresh} />
                    <div>
                        {allPost.map(post => (
                            <div key={post._id}>
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
};
export default withAuth(Home);
