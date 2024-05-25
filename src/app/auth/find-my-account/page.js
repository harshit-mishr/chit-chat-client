'use client';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import { Button, Card, Form, Input, Spin, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import style from '../auth.module.css';
import apiService from '@/service/apiService';

function FindMyAccount() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async values => {
        const loading = message.loading('Finding your account...', 0);
        setIsLoading(true);

        try {
            const response = await apiService.post(
                '/auth/find-account',
                values,
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
                    'Account found successful! Redirecting to reset password...',
                );

                const queryParams = new URLSearchParams({
                    id: data?.data,
                }).toString();
                console.log('queryParams', queryParams);
                router.push(`/auth/reset-password?${queryParams}`);
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
            console.error('Error Finding in:', errorMessage);
            message.error(`Error Finding Account: ${errorMessage}`);
            errorMessage &&
                errorMessage === 'User not found' &&
                setTimeout(() => {
                    message.error(
                        'Make sure you have entered correct username or email',
                    );
                }, 1000);
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
                    <h2 style={{ textAlign: 'center' }}>Find My Account</h2>
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
                            label="Username/Email"
                            name="emailOrUsername"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your username or email!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your username or email" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Find
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

export default FindMyAccount;
