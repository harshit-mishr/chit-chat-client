'use client';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import apiService from '@/service/apiService';
import { Button, Image, Layout, Upload, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AimOutlined, UploadOutlined } from '@ant-design/icons';
import { setUserData } from '@/lib/features/user/userSlice';
import { useInView } from 'react-intersection-observer';
import PostCard from '@/components/PostCard/PostCard';
const { Content } = Layout;

function Profile() {
    const [collapsed, setCollapsed] = useState(false);
    const userData = useAppSelector(state => state.user.userData);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [totalPost, setTotalPost] = useState(0);
    const [allPost, setAllPost] = useState([]);

    async function getMyPosts(page) {
        const filter = {};

        try {
            const response = await apiService.get(
                '/user/posts',
                {
                    page: page,
                    limit: 10,
                    filter: JSON.stringify(filter) || null,
                },
                true,
            );
            console.log('response', response);
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
    }

    const { ref, inView } = useInView({
        threshold: 0.5, // Observe when 50% of the element is visible
        disabled: totalPost === allPost.length, // Disable when no more posts
    });

    useEffect(() => {
        getMyPosts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (inView && totalPost > allPost.length) {
            setLoadingNextPage(true);
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, [inView]);

    const [isPreviewVisible, setPreviewVisible] = useState(false);
    const handleChange = async info => {
        const loading = message.loading('Updating display picture ...', 0);
        console.log('info', info);
        const formData = new FormData(); 
        formData.append('file', info.file.originFileObj);

        try {
            const response = await apiService.put(
                '/user/update/display-picture',
                formData,
            );
            if (response.status === 200 || response.status === 201) {
                const data = response?.data && response?.data;
                dispatch(setUserData(data));
                console.log('data', data);
                console.log('Updated successful!');

                loading();
                message.success('Updated successfully...');
            } else {
                console.error('Update failed:', response);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
            loading();
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Error logging in';
            console.error('Error logging in:', errorMessage);
            message.error(`Error logging in: ${errorMessage}`);
        }
    };

    const props = {
        onChange: handleChange,
        multiple: false,
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
                        minHeight: 'max-content',
                        maxHeight: 'max-content',
                        // background: colorBgContainer,
                        // border: '1px solid #424242',
                        position: 'relative',
                    }}
                >
                    <CommonHeader
                        backgroundColor={'none'}
                        title={userData?.username?.toUpperCase()}
                        onLeftClick={() => {
                            router.back();
                        }}
                        right={true}
                        rightTitle={'Edit Profile'}
                        onRightClick={() => {
                            router.push('/user-settings/account-settings');
                        }}
                    />
                    {userData?.displayPicture ? (
                        <Image
                            src={userData?.displayPicture}
                            alt="Profile Picture"
                            style={{
                                height: '20rem',
                                width: '43vw',
                                objectFit: 'cover', // Ensures full width with aspect ratio preserved
                                borderRadius: 'inherit', // Inherit border radius from parent if needed
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                height: '20rem',
                                width: '43vw',
                                border: '3px solid grey',
                                // background: 'grey',
                                display: 'grid',
                                placeContent: 'center',
                            }}
                        >
                            <Upload {...props}>
                                <Button
                                    style={{ width: '100%' }}
                                    icon={<UploadOutlined />}
                                >
                                    Upload
                                </Button>
                            </Upload>
                        </div>
                    )}

                    <div
                        style={{
                            border: '3px solid black',
                            borderRadius: '50%',
                            position: 'absolute',
                            bottom: '0vh',
                            left: '5vw',
                        }}
                    >
                        <Image
                            style={{
                                borderRadius: '50%',
                                maxHeight: '20vh',
                                minHeight: '20vh',
                                minWidth: '20vh',
                                maxWidth: '20vh',
                            }}
                            src={userData?.profilePicture}
                            alt="Profile Picture"
                        />
                    </div>
                </div>

                <div
                    style={{
                        marginTop: '5rem',
                        padding: 45,
                        paddingTop: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <h3>{userData?.username?.toUpperCase()}</h3>
                        <p style={{ color: 'gray' }}>{userData?.email}</p>

                        <p style={{ marginTop: '1rem', color: 'gray' }}>
                            {userData?.about || 'No bio'}
                        </p>
                    </div>
                    <div
                        style={{
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <AimOutlined style={{ fontSize: '1.5rem' }} />
                        <p style={{ color: 'gray', fontSize: '1rem' }}>
                            {userData?.city || 'No city'} &nbsp; | &nbsp;{' '}
                            {userData?.country || 'No country'}
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        minHeight: '100vh',
                        padding: 45,
                        paddingBottom: 100,
                    }}
                >
                    {allPost.map(post => (
                        <div
                            key={post._id}
                            onClick={() => router.push(`/post/${post._id}`)}
                        >
                            <PostCard
                                // setCommentModalVisible={setCommentModalVisible}
                                // setCommentModalData={setCommentModalData}
                                post={post}
                            />
                        </div>
                    ))}
                </div>
            </Content>
        </MainLayout>
    );
}

export default Profile;
