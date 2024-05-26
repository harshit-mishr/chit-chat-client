'use client';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import apiService from '@/service/apiService';
import { Button, Image, Layout, Upload, message } from 'antd';
import { useRouter } from 'next/navigation';
import Style from './profile.module.css'
import React, { useEffect, useRef, useState } from 'react';
import {
    AimOutlined,
    UploadOutlined,
    EditOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { setUserData } from '@/lib/redux/features/user/userSlice';
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
    const uploadRef = useRef(null);
    const [localFile, setLocalFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleFileChange = event => {
        const file = event.target.files[0];
        setLocalFile(file);

        // Read the file as a data URL
        const reader = new FileReader(); //one issue that when select one pic then after that unselect and again select then no change
        reader.onload = () => {
            // Set the result of FileReader as the selected file
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async () => {
        const loading = message.loading('Updating display picture ...', 0);
        setLoading(true);
        const formData = new FormData();

        if (localFile) {
            formData.append('file', localFile);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

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
                setSelectedFile(null);
                uploadRef.current.value = '';
                setLocalFile(null);
                setLoading(false);
                message.success('Updated successfully...');
            } else {
                console.error('Update failed:', response);
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Error creating post';

            console.error('Error creating post:', errorMessage);
            message.error(errorMessage);
            // setRefresh(!refresh);
            setLoading(false);
        } finally {
            // setRefresh(!refresh);
            setLoading(false);
        }
    };

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
               id = {collapsed ? 'collapesd' : 'extended'}
               className={"main_side_bar"}
            >
                <div
                    style={{
                        paddingTop: 20,
                        minHeight: 'max-content',
                        maxHeight: 'max-content',
                        // background: colorBgContainer,
                        // border: '1px solid #424242',
                        position: 'relative',
                    }}
                    className={`xm-100 xm-p-10`}
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
                    {userData?.displayPicture || selectedFile ? (
                        <div
                            style={{
                                position: 'relative',
                                textAlign: 'center',
                            }}
                        >
                            <Image
                                src={
                                    selectedFile
                                        ? selectedFile
                                        : userData?.displayPicture
                                }
                                alt="Cover Picture"
                                className={Style.coverPic}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    zIndex: 1,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginRight: '1rem',
                                }}
                            >
                                {selectedFile ? (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '0rem',
                                            right: '0rem',
                                            zIndex: '1',
                                            width: 'max-content',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                        }}
                                    >
                                        <Button
                                            style={{}}
                                            onClick={() => {
                                                setSelectedFile(null);
                                                setLocalFile(null);
                                                uploadRef.current.value = '';
                                            }}
                                            type="primary"
                                            shape="circle"
                                            icon={<CloseOutlined />}
                                        />
                                        <Button
                                            loading={loading}
                                            onClick={onSubmit}
                                            type="primary"
                                            shape="circle"
                                            icon={<UploadOutlined />}
                                        ></Button>
                                    </div>
                                ) : (
                                    <Button
                                        style={{}}
                                        icon={<EditOutlined />}
                                        onClick={() =>
                                            uploadRef.current.click()
                                        }
                                        type="primary"
                                        shape="circle"
                                    ></Button>
                                )}
                                <input
                                    ref={uploadRef}
                                    style={{ display: 'none' }}
                                    id="profilePic"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*" // Optionally restrict accepted file types
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                             
                            className={Style.CoverPic}
                        >
                            <Button
                                style={{ width: '100%' }}
                                icon={<UploadOutlined />}
                                onClick={() => uploadRef.current.click()}
                            >
                                Upload
                            </Button>
                            <input
                                ref={uploadRef}
                                style={{ display: 'none' }}
                                id="profilePic"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*" // Optionally restrict accepted file types
                            />
                        </div>
                    )}

                    <div
                        style={{
                            borderRadius: '50%',
                            position: 'absolute',
                            bottom: '0vh',
                            left: '5vw',
                        }}
                    >
                        <Image
                            
                            className={Style.profilePicture}
                            src={userData?.profilePicture}
                            alt="Profile Picture"
                        />
                    </div>
                </div>

                <div
                    style={{
                        paddingTop: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                    className={`xm-p-10 ${Style.user_data_container}`}
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
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <AimOutlined style={{ fontSize: '1.5rem' }} />
                        <div className={Style.address}>
                        <p style={{ color: 'gray', fontSize: '1rem' }}>
                            {userData?.city || 'No city'}  
                            
                        </p>
                        <p style={{ color: 'gray', fontSize: '1rem' }}>
                            
                            {userData?.country || 'No country'}
                        </p>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        minHeight: '100vh',
                        padding: 10,
                        marginBottom:100
                    }}
                    className={`xm-100`}
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
