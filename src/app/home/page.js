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
import CustomModal from '@/components/CustomModal/CustomModal';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

const Home = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const router = useRouter();

    const [refresh, setRefresh] = useState(false);

    const [collapsed, setCollapsed] = useState(false);
    const [allPost, setAllPost] = useState([]);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [commentModalData, setCommentModalData] = useState({});

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

    const createPost = async data => {
        const response = await apiService.post(
            '/post/create',
            data,
            true,
            true,
        );
        if (response.status === 200) {
            message.success('Post created successfully');
        }
        return response;
    };
    const createComment = async data => {
        const response = await apiService.post(
            '/comment/create',
            data,
            true,
            true,
        );
        if (response.status === 200) {
            message.success('Comment created successfully');
            setCommentModalVisible(false);
            setCommentModalData({});
        }
        return response;
    };

    return (
        <>
            <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                <Content
                    style={{
                        margin: '0rem',
                        marginTop: '1rem',
                        marginLeft: collapsed ? '10vh' : '20rem',
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
                        <CreatePost
                            setRefresh={setRefresh}
                            refresh={refresh}
                            submitHandler={createPost}
                        />
                        <div>
                            {allPost.map(post => (
                                <div
                                    key={post._id}
                                    onClick={() =>
                                        router.push(`/post/${post._id}`)
                                    }
                                >
                                    <PostCard
                                        setCommentModalVisible={
                                            setCommentModalVisible
                                        }
                                        setCommentModalData={
                                            setCommentModalData
                                        }
                                        post={post}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Content>
            </MainLayout>
            <CustomModal
                title="Comment"
                setCommentModalVisible={setCommentModalVisible}
                commentModalVisible={commentModalVisible}
                modalData={commentModalData}
                submitHandler={createComment}
                setRefresh={setRefresh}
                refresh={refresh}
            />
        </>
    );
};
export default withAuth(Home);
