'use client';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import withAuth from '@/utils/authentication/withAuth';
import { Button, Form, Image, Input, Layout, message, theme } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import {
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import {
    setUserData,
    updateUserData,
} from '@/lib/redux/features/user/userSlice';
import apiService from '@/service/apiService';

function AccountSetting() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const edit = {
        profilePicture: false,
        username: false,
        email: false,
        about: false,
        country: false,
        city: false,
    };
    const { Content } = Layout;
    const userData = useAppSelector(state => state.user.userData);
    const [collapsed, setCollapsed] = useState(false);
    const [editData, setEditData] = useState(edit);
    const [userFilledData, setUserFilledData] = useState(userData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [localFile, setLocalFile] = useState(null);
    const uploadRef = useRef(null);
    const dispatch = useAppDispatch();

    console.log('userdata', userData);

    const router = useRouter();

    const onLeftClick = () => {
        router.back();
    };

    const handleFileChange = event => {
        setEditData({ ...editData, profilePicture: true });
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

    const onSubmit = async type => {
        const loading = message.loading('Updating data up...', 0);

        const validTypes = [
            'profilePicture',
            'username',
            'email',
            'about',
            'country',
            'city',
        ];
        const formData = new FormData();
        if (validTypes.includes(type)) {
            if (type === 'profilePicture') {
                formData.append('file', localFile);
            } else {
                formData.append(type, userFilledData[type]);
            }
        }

        try {
            const response = await apiService.put('/user/update', formData);
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

    return (
        <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            <Content
                 id = {collapsed ? 'collapesd' : 'extended'}
                 className={"main_side_bar"}
            >
                <div
                    style={{
                        // padding: 10,
                        minHeight: '120vh',
                        maxHeight: '120vh',
                        marginBottom: '5rem',
                        background: colorBgContainer,
                        borderRadius: '0.2rem',
                        overflow: 'hidden',
                    }}
                    className={`main_layout`}
                >
                    <CommonHeader
                        title="Account Settings"
                        onLeftClick={() => onLeftClick()}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: '2rem',
                        }}
                    >
                        <Image
                            src={selectedFile || userData?.profilePicture}
                            alt="profile picture"
                            height={150}
                            width={150}
                            style={{ borderRadius: '5%' }}
                        />
                        <div style={{ marginTop: '1rem' }}>
                            <input
                                ref={uploadRef}
                                style={{ display: 'none' }}
                                id="profilePic"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*" // Optionally restrict accepted file types
                            />
                            {editData.profilePicture ? (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button
                                        type="primary"
                                        style={{
                                            backgroundColor: 'red',
                                        }}
                                        icon={<CloseOutlined />}
                                        // loading={loadings[2]}
                                        onClick={() => {
                                            setEditData({
                                                ...editData,
                                                profilePicture: false,
                                            });
                                            setSelectedFile(null);
                                            setLocalFile(null);
                                        }}
                                    />
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        // loading={loadings[2]}
                                        onClick={() => {
                                            setEditData({
                                                ...editData,
                                                profilePicture: false,
                                            });

                                            onSubmit('profilePicture');
                                            setSelectedFile(null);
                                            setLocalFile(null);
                                        }}
                                    />
                                </div>
                            ) : (
                                <Button
                                    type="primary"
                                    // loading={loadings[2]}
                                    onClick={() => uploadRef.current.click()}
                                    icon={<UploadOutlined />}
                                >
                                    Update
                                </Button>
                            )}
                        </div>
                        <h2 style={{ marginTop: '1rem' }}>
                            {userData?.username?.toUpperCase()}
                        </h2>
                        <h4>Country/City</h4>
                    </div>

                    <div style={{ padding: '0.5rem 5rem' }}>
                        <Form
                            layout={'vertical'}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                        >
                            <div>
                                <label>Username</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '0.5rem',
                                        gap: '0.5rem',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Input
                                        disabled={!editData.username}
                                        placeholder="Enter your username"
                                        style={{
                                            width: '80%',
                                            color: '#c9c9c9',
                                        }}
                                        value={userFilledData?.username}
                                        onChange={e =>
                                            setUserFilledData({
                                                ...userFilledData,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                    {editData.username ? (
                                        <>
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                icon={<CloseOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() =>
                                                    setEditData({
                                                        ...editData,
                                                        username: false,
                                                    })
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                icon={<CheckOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() => {
                                                    setEditData({
                                                        ...editData,
                                                        username: false,
                                                    });
                                                    onSubmit('username');
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                type="primary"
                                                icon={<EditOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() =>
                                                    setEditData({
                                                        ...editData,
                                                        username: true,
                                                    })
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <label>Email</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '0.5rem',
                                        gap: '0.5rem',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Input
                                        placeholder="Enter your email"
                                        disabled={!editData.email}
                                        style={{
                                            width: '80%',
                                            color: '#c9c9c9',
                                        }}
                                        value={userFilledData?.email}
                                        onChange={e =>
                                            setUserFilledData({
                                                ...userFilledData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    {editData.email ? (
                                        <>
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                icon={<CloseOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() =>
                                                    setEditData({
                                                        ...editData,
                                                        email: false,
                                                    })
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                icon={<CheckOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() => {
                                                    setEditData({
                                                        ...editData,
                                                        email: false,
                                                    });
                                                    onSubmit('email');
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            // loading={loadings[2]}
                                            onClick={() =>
                                                setEditData({
                                                    ...editData,
                                                    email: true,
                                                })
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <label>About</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '0.5rem',
                                        gap: '0.5rem',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Input.TextArea
                                        placeholder="About yourself"
                                        disabled={!editData.about}
                                        style={{
                                            width: '80%',
                                            color: '#c9c9c9',
                                        }}
                                        autoSize={{
                                            minRows: 2,
                                            maxRows: 6,
                                        }}
                                        value={userFilledData?.about || ''}
                                        onChange={e => {
                                            setUserFilledData({
                                                ...userFilledData,
                                                about: e.target.value,
                                            });
                                        }}
                                    />
                                    {editData.about ? (
                                        <>
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                icon={<CloseOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() =>
                                                    setEditData({
                                                        ...editData,
                                                        about: false,
                                                    })
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                icon={<CheckOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() => {
                                                    setEditData({
                                                        ...editData,
                                                        about: false,
                                                    });
                                                    onSubmit('about');
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            // loading={loadings[2]}
                                            onClick={() => {
                                                setEditData({
                                                    ...editData,
                                                    about: true,
                                                });
                                                onSubmit('about');
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <label>Country</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '0.5rem',
                                        gap: '0.5rem',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Input
                                        placeholder="Country name"
                                        disabled={!editData.country}
                                        style={{
                                            width: '80%',
                                            color: '#c9c9c9',
                                        }}
                                        value={userFilledData?.country || ''}
                                        onChange={e =>
                                            setUserFilledData({
                                                ...userFilledData,
                                                country: e.target.value,
                                            })
                                        }
                                    />
                                    {editData.country ? (
                                        <>
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                icon={<CloseOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() =>
                                                    setEditData({
                                                        ...editData,
                                                        country: false,
                                                    })
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                icon={<CheckOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() => {
                                                    setEditData({
                                                        ...editData,
                                                        country: false,
                                                    });
                                                    onSubmit('country');
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            // loading={loadings[2]}
                                            onClick={() =>
                                                setEditData({
                                                    ...editData,
                                                    country: true,
                                                })
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <label>City</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '0.5rem',
                                        gap: '0.5rem',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Input
                                        placeholder="City name"
                                        disabled={!editData.city}
                                        style={{
                                            width: '80%',
                                            color: '#c9c9c9',
                                        }}
                                        value={userFilledData?.city || ''}
                                        onChange={e =>
                                            setUserFilledData({
                                                ...userFilledData,
                                                city: e.target.value,
                                            })
                                        }
                                    />
                                    {editData.city ? (
                                        <>
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                icon={<CloseOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() =>
                                                    setEditData({
                                                        ...editData,
                                                        city: false,
                                                    })
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                icon={<CheckOutlined />}
                                                // loading={loadings[2]}
                                                onClick={() => {
                                                    setEditData({
                                                        ...editData,
                                                        city: false,
                                                    });
                                                    onSubmit('city');
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            // loading={loadings[2]}
                                            onClick={() =>
                                                setEditData({
                                                    ...editData,
                                                    city: true,
                                                })
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
}

export default withAuth(AccountSetting);
