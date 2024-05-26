'use client';

import CommonHeader from '@/components/CommonHeader/CommonHeader';
import MainLayout from '@/components/CommonLayout/layout';
import apiService from '@/service/apiService';
import withAuth from '@/utils/authentication/withAuth';
import { Button, Form, Input, Layout, message, theme } from 'antd';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
const { Content } = Layout;

function UpdatePassword() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [form] = Form.useForm();

    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const onLeftClick = () => {
        router.back();
    };

    const onFinish = async values => {
        console.log('Received values of form: ', values);
        const loading = message.loading('Logging in...', 0);
        setIsLoading(true);

        try {
            const response = await apiService.put(
                '/user/update-password',
                values,
                true,
                false,
            );
            if (response.status === 200 || response.status === 201) {
                const data = response?.data && response?.data;
                console.log('Login successful!');
                form.resetFields();
                console.log('REsponse from api', response.data);

                // Hide loading message
                loading();
                // Show success message
                message.success('Password updated successfully...');
                // router.replace(`/home`);
            }
        } catch (error) {
            console.error('Error:', error);
            // Hide loading message
            loading();
            // Handle error here
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Error logging in';
            console.error('Error logging in:', errorMessage);
            message.error(`Error logging in: ${errorMessage}`);
            // Display error message to user
            // form.setFields([{ name: "username", errors: [errorMessage] }]);
            // console.error("Error logging in:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                    className={`xm-100 xm-p-10`}
                >
                    <CommonHeader
                        title="Update Password"
                        onLeftClick={() => onLeftClick()}
                    />
                    <div style={{ padding: '5rem' }}>
                        <Form
                            layout={'vertical'}
                            form={form}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Current Password"
                                name="currentPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your current password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your New password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Confirm New Password"
                                name="confirmNewPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your New password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Update Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
}

export default UpdatePassword;
