'use client';
import React, { Suspense, useState } from 'react';

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
import { useRouter, useSearchParams } from 'next/navigation';
import apiService from '@/service/apiService';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function VerifyEmailInner() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();
    const onFinish = async values => {
        const loading = message.loading('Verifying email...', 0);
        setIsLoading(true);
        try {
            const data = {
                otp: values.otp,
                _id: id,
            };
            const response = await apiService.post(
                '/auth/verify-otp',
                data,
                false,
                false,
            );

            if (response.status === 200 || response.status === 201) {
                const data = response?.data && response?.data;
                console.log('Verify email successful!');
                form.resetFields();
                loading();
                message.success('Email verified! Redirecting to login...');
                //use next js router to ssend user to login page
                router.push(`/auth/login`);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Error verifying email';

            loading();
            message.error(`Error verifying email: ${errorMessage}`);
            // Display error message to user
            // form.setFields([{ name: "otp", errors: [errorMessage] }]);
            // console.error("Error verifying email:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                components: {
                    Button: {
                        colorPrimary: '#00b96b',
                        algorithm: true, // Enable algorithm
                    },
                    Input: {
                        colorPrimary: '#eb2f96',
                        backgroundColor: '#fff',
                        algorithm: true, // Enable algorithm
                    },
                },
            }}
        >
            <Spin spinning={isLoading}>
                <div className={style.container}>
                    <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <h2>Verify your email</h2>
                        <br />
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
                                label="Otp"
                                name="otp"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your OTP!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Verify Email
                                </Button>
                                Or <Link className={style.signup_button} href="/auth/sign-up">SignUp now!</Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Spin>
        </ConfigProvider>
    );
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailInner />
        </Suspense>
    );
}
