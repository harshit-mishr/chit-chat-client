"use client";
import React from "react";
import { Button, Form, Input, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "../auth.module.css";
import Link from "next/link";
import apiService from "../../../service/apiService";
import { useRouter } from "next/navigation";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

export default function Login() {
	const router = useRouter();
	const [form] = Form.useForm();
	const onFinish = async (values) => {
		try {
			const response = await apiService.post(
				"/auth/login",
				values,
				false,
				false,
			);
			if (response.status === 200 || response.status === 201) {
				const data = response?.data && response?.data;
				console.log("Login successful!");
				form.resetFields();
				console.log("REsponse from api", response.data);
				const { accessToken, refreshToken } = data;
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);
				console.log("redirecting to home");
				router.push(`/home`);
			}
		} catch (error) {
			console.error("Error:", error);
			// Handle error here
			const errorMessage =
				error?.response?.data?.message || error?.message || "Error logging in";
			console.error("Error logging in:", errorMessage);
			// Display error message to user
			// form.setFields([{ name: "username", errors: [errorMessage] }]);
			// console.error("Error logging in:", error);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className={style.container}>
			<Card style={{ maxWidth: "400px", margin: "0 auto" }}>
				<h2>Welcom to Chit Chat</h2>
				<Form
					layout={"vertical"}
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
							Log In
						</Button>
						Or <Link href='/auth/sign-up'>SignUp now!</Link>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}
