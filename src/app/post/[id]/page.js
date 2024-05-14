'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MainLayout from '@/components/CommonLayout/layout';
import { Layout, message, theme } from 'antd';
import PostCard from '@/components/PostCard/PostCard';
import apiService from '@/service/apiService';
import { isEmpty } from 'lodash';
import CreatePost from '@/components/CreatePost/CreatePost';
import CommonHeader from '@/components/CommonHeader/CommonHeader';

const Content = Layout;

export default function Post() {
    const { id } = useParams();
    const router = useRouter();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            const response = await apiService.get(
                '/post/' + id,
                { page: 1, limit: 10 },
                true,
            );
            setPost(response.data.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getPost();
    }, [refresh]);

    const submitHandler = async data => {
        const response = await apiService.post(
            '/comment/create',
            data,
            true,
            true,
        );
        if (response.status === 200) {
            message.success('Comment created successfully');
        }
        return response;
    };

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                style={{
                    margin: '0rem',
                    // marginTop: '1rem',
                    marginLeft: collapsed ? '10vh' : '20rem',
                    transition: 'margin-left margin-right 0.9s ease-in-out',
                    maxWidth: '50vw',
                }}
            >
                <div
                    style={{
                        padding: 45,
                        paddingTop: 20,
                        minHeight: '100vh',
                        maxHeight: 'max-content',
                        // background: colorBgContainer,
                        border: '1px solid #424242',
                    }}
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
                            background: colorBgContainer,
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

                        <div style={{ marginTop: '1rem' }}>
                            {/* <Comments /> */}
                            {!isEmpty(post) &&
                                post.comments &&
                                post.comments.map(comment => (
                                    <div key={comment._id}>
                                        <PostCard post={comment} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
}
