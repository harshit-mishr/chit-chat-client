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
				<h2>Welcom to Chit Chat</h2>
				<Form
					form={form}
					name='normal_login'
					className='login-form'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label='Username'
						name='username'
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' block>
							Sign Up
						</Button>
						Or <Link href='/auth/sign-up'>SignUp now!</Link>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}
