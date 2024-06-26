'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MainLayout from '@/components/CommonLayout/layout';
import { Layout, Spin, message, theme } from 'antd';
import PostCard from '@/components/PostCard/PostCard';
import apiService from '@/service/apiService';
import { filter, isEmpty } from 'lodash';
import CreatePost from '@/components/CreatePost/CreatePost';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import { useInView } from 'react-intersection-observer';
import withAuth from '@/utils/authentication/withAuth';
import { useSocketContext } from '@/lib/contexts/SocketContext';

const Content = Layout;

function Post({}) {
    const { id } = useParams();
    const router = useRouter();
    const { socket } = useSocketContext();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [totalComment, setTotalComment] = useState(0);

    const getPost = async () => {
        try {
            const response = await apiService.get(
                '/post/' + id,
                { page: 1, limit: 10 },
                true,
            );
            console.log(response.data);
            setPost(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    const getAllComments = async (page = 1, append = false) => {
        try {
            const response = await apiService.get(
                '/comment',
                { page: page, limit: 10, filter: JSON.stringify({ post: id }) },
                true,
            );

            setTotalComment(response.data.total);
            setComments(prevPosts => {
                const newPosts = response.data.data;
                const combinedPosts = append
                    ? [...prevPosts, ...newPosts]
                    : newPosts;

                // Filter out duplicates
                const uniquePosts = combinedPosts.reduce((acc, post) => {
                    if (!acc.find(item => item._id === post._id)) {
                        acc.push(post);
                    }
                    return acc;
                }, []);

                return uniquePosts;
            });
            setLoadingNextPage(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getAllComments(currentPage, true);
    }, [id, refresh, currentPage]);

    const { ref, inView } = useInView({
        threshold: 0.5, // Observe when 50% of the element is visible
        disabled: totalComment === comments.length, // Disable when no more posts
    });

    useEffect(() => {
        if (inView && totalComment > comments.length) {
            setLoadingNextPage(true);
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, [inView]);

    const submitHandler = async data => {
        const response = await apiService.post(
            '/comment/create',
            data,
            true,
            true,
        );
        if (response.status === 200) {
            setCurrentPage(1); // Reset to page 1
            message.success('Comment created successfully');
            getAllComments(1, false); // Fetch the first page without appending
        }
        return response;
    };

    // Establish socket connection and listen for new comments
    useEffect(() => {
        socket?.emit('joinPost', id);

        socket?.on('newComment', newComment => {
            setComments(prevComments => {
                const commentExists = prevComments.some(
                    comment => comment._id === newComment._id,
                );
                console.log('commentExists', commentExists);
                return commentExists
                    ? prevComments
                    : [newComment, ...prevComments];
            });
            getPost();
        });

        return () => {
            socket?.emit('leavePost', id);
            socket?.off('newComment');
        };
    }, [id]);

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                id = {collapsed ? 'collapesd' : 'extended'}
                className={"main_side_bar"}
            >
                <div
                    style={{
                        paddingTop: 20,
                        minHeight: '100vh',
                        maxHeight: 'max-content',
                        // background: colorBgContainer,
                        border: '1px solid #424242',
                    }}
                    className={`xm-100 xm-p-10`}
                >
                    <CommonHeader
                        backgroundColor={'none'}
                        title={'Post'}
                        onLeftClick={() => {
                            router.back();
                        }}
                    />
                    {isEmpty(post) ? null : <PostCard post={post} />}
                    <div
                        style={{
                            marginTop: '1rem',
                            // background: colorBgContainer,
                        }}
                    >
                        <CreatePost
                            placeholder="Write a comment"
                            buttonText="Comment"
                            minRows={1}
                            submitHandler={submitHandler}
                            setRefresh={setRefresh}
                            refresh={refresh}
                            targetId={id}
                        />

                        <div
                            style={{
                                marginTop: '1rem',
                                minHeight: '100vh',
                                // paddingBottom: 100,
                            }}
                        >
                            {/* <Comments /> */}
                            {!isEmpty(comments) &&
                                comments &&
                                comments.map(comment => (
                                    <div key={comment._id}>
                                        <PostCard post={comment} />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            paddingBottom: 50,
                            paddingTop: 50,
                        }}
                        ref={ref}
                    >
                        {loadingNextPage && <Spin tip="Loading" size="large" />}
                        {totalComment === comments.length && (
                            <p style={{ color: 'gray' }}>No more comments</p>
                        )}
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
}

export default withAuth(Post);
