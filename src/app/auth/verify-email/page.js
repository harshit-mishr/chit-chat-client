"use client";
import React from "react";
import { Button, Form, Input, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "../auth.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import apiService from "@/service/apiService";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

export default function VerifyEmail() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const router = useRouter();

	const [form] = Form.useForm();
	const onFinish = async (values) => {
		try {
			const data = {
				otp: values.otp,
				_id: id,
			};
			const response = await apiService.post(
				"/auth/verify-otp",
				data,
				false,
				false,
			);

			if (response.status === 200 || response.status === 201) {
				const data = response?.data && response?.data;
				console.log("Verify email successful!");
				form.resetFields();
				//use next js router to ssend user to login page
				router.push(`/auth/login`);
			}
		} catch (error) {
			console.error("Error:", error);
			// Handle error here
			const errorMessage =
				error?.response?.data?.message ||
				error?.message ||
				"Error verifying email";
			// Display error message to user
			// form.setFields([{ name: "otp", errors: [errorMessage] }]);
			// console.error("Error verifying email:", error);
		}
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
					layout={"vertical"}
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
