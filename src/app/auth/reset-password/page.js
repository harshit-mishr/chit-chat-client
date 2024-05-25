'use client';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import { Button, Card, Form, Input, Spin, message } from 'antd';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import style from '../auth.module.css';
import apiService from '@/service/apiService';

function ForgetPasswordInner() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async values => {
        const loading = message.loading('Updating your password...', 0);
        setIsLoading(true);

        try {
            const response = await apiService.post(
                '/auth/reset-password',
                { ...values, _id: id },
                false,
                false,
            );
            if (response.status === 200 || response.status === 201) {
                const data = response?.data && response?.data;
                console.log('User found successful!', data);
                form.resetFields();
                // Hide loading message
                loading();
                // Show success message
                message.success(
                    'Password reset successful! Redirecting to Login page...',
                );

                router.push(`/auth/login`);
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
            console.error('Error Reset Password in:', errorMessage);
            message.error(`Error Reset Password: ${errorMessage}`);
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
        <Spin spinning={isLoading}>
            <div className={style.container}>
                <Card
                    style={{
                        maxWidth: '400px',
                        minWidth: '300px',
                        margin: '0 auto',
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>Reset My Password</h2>
                    <br />
                    <Form
                        layout={'vertical'}
                        form={form}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your new password" />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmNewPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                            ]}
                        >
                            <Input placeholder="Confirm your new password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>

                        <div>
                            Or <Link href="/auth/login">Login now!</Link>
                        </div>
                    </Form>
                </Card>
            </div>
        </Spin>
    );
}

export default function ForgetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgetPasswordInner />
        </Suspense>
    );
}
