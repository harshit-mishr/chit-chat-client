"use client";
import React from "react";
import { Button, Form, Input, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "../auth.module.css";
import Link from "next/link";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

export default function Login() {
	const [form] = Form.useForm();
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className={style.container}>
			<Card style={{ maxWidth: "400px", margin: "0 auto" }}>
				<h2>Verify your email</h2>
				<br />
				<Form
					form={form}
					name='normal_login'
					className='login-form'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label='Otp'
						name='otp'
						rules={[{ required: true, message: "Please input your OTP!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' block>
							Verify Email
						</Button>
						Or <Link href='/auth/sign-up'>SignUp now!</Link>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}
