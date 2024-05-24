'use client';
import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Card,
    ConfigProvider,
    theme,
    message,
    Spin,
} from 'antd';
import style from '../auth.module.css';
import Link from 'next/link';
import apiService from '../../../service/apiService';
import { useRouter } from 'next/navigation';
import { setUserData } from '@/lib/redux/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';

export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async values => {
        const loading = message.loading('Logging in...', 0);
        setIsLoading(true);

        try {
            const response = await apiService.post(
                '/auth/login',
                values,
                false,
                false,
            );
            if (response.status === 200 || response.status === 201) {
                const data = response?.data && response?.data;
                console.log('Login successful!', data);
                form.resetFields();
                console.log('REsponse from api', response.data);
                const { accessToken, refreshToken } = data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                console.log('redirecting to home');
                dispatch(setUserData(data));
                // Hide loading message
                loading();
                // Show success message
                message.success('Login successful! Redirecting to home...');
                router.replace(`/home`);
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
        <Spin spinning={isLoading}>
            <div className={style.container}>
                <Card
                    style={{
                        maxWidth: '400px',
                        minWidth: '300px',
                        margin: '0 auto',
                    }}
                >
                    <h2>Welcome to Chit Chat</h2>
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
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Log In
                            </Button>
                            Or <Link href="/auth/sign-up">SignUp now!</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    );
}
