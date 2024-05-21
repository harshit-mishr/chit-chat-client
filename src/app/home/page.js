'use client';
import React, { useEffect, useState } from 'react';
import withAuth from '@/utils/authentication/withAuth';
import MainLayout from '@/components/CommonLayout/layout';
import { Layout, Spin, message, theme } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import { fetchUserData } from '@/lib/features/user/userSlice';
import CreatePost from '@/components/CreatePost/CreatePost';
import apiService from '@/service/apiService';
import PostCard from '@/components/PostCard/PostCard';
import CustomModal from '@/components/CustomModal/CustomModal';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import styles from './page.module.css';

const { Content } = Layout;

const Home = ({ socket }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const router = useRouter();

    const [refresh, setRefresh] = useState(false);

    const [collapsed, setCollapsed] = useState(false);
    const [allPost, setAllPost] = useState([]);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [commentModalData, setCommentModalData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [totalPost, setTotalPost] = useState(0);

    const getAllPosts = async (page = 1) => {
        // const filter = {  //if want to use filter in api
        //     //if want to use filter in api
        //     likes: { $gt: 100 },
        //     tags: { $in: ['tag1', 'tag2'] },
        // };

        const filter = {};

        try {
            const response = await apiService.get(
                '/post',
                {
                    page: page,
                    limit: 10,
                    filter: JSON.stringify(filter) || null,
                },
                true,
            );

            setTotalPost(response.data.total);
            setAllPost(
                page === 1
                    ? response.data.data
                    : [...allPost, ...response.data.data],
            );
            setLoadingNextPage(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const { ref, inView } = useInView({
        threshold: 0.5, // Observe when 50% of the element is visible
        disabled: totalPost === allPost.length, // Disable when no more posts
    });

    useEffect(() => {
        getAllPosts(currentPage);
    }, [refresh, currentPage]);

    useEffect(() => {
        if (inView && totalPost > allPost.length) {
            setLoadingNextPage(true);
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, [inView]);

    const createPost = async data => {
        const response = await apiService.post(
            '/post/create',
            data,
            true,
            true,
        );
        if (response.status === 200) {
            setCurrentPage(1);
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
                <Content className= {styles.Content}>
                    <div className={styles.ContentBox}
                    >
                        <CreatePost
                            setRefresh={setRefresh}
                            refresh={refresh}
                            submitHandler={createPost}
                        />
                        <div style={{ minHeight: '100vh', paddingBottom: 100 }}>
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

                        <div style={{ textAlign: 'center' }} ref={ref}>
                            {loadingNextPage && (
                                <Spin tip="Loading" size="large" />
                            )}
                            {totalPost === allPost.length && (
                                <p style={{ color: 'gray' }}>No more post</p>
                            )}
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
