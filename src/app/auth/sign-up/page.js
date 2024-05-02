"use client";
import React, { useRef, useState } from "react";
import { Form, Input, Button, Upload, Card } from "antd";
import style from "../auth.module.css";
import Link from "next/link";
import Image from "next/image";
import apiService from "../../../service/apiService";
import { useRouter } from "next/navigation";

const SignUp = () => {
	const [form] = Form.useForm();
	const [selectedFile, setSelectedFile] = useState(null);
	const [localFile, setLocalFile] = useState(null);
	const router = useRouter();
	// console.log("uploadRef", uploadRef.current.value);

	const onFinish = async (values) => {
		try {
			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				formData.append(key, value);
			});
			formData.append("file", localFile);

			for (const [key, value] of formData.entries()) {
				console.log(`${key}: ${value}`);
			}

			const response = await apiService.post(
				"/auth/signup",
				formData,
				false,
				true,
			);
			console.log("REsponse from api", response.data);

			if (response.status === 200 || response.status === 201) {
				const data = response?.data && response?.data;
				const id = data?.data?._id;
				console.log("data", data);
				console.log("Signup successful!");
				form.resetFields();
				//use next js router to ssend user to login page
				const queryParams = new URLSearchParams({ id }).toString();
				console.log("queryParams", queryParams);
				router.push(`/auth/verify-email?${queryParams}`);
			} else {
				console.error("Signup failed:", response);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			console.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			console.error("Image must smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setLocalFile(file);

		// Read the file as a data URL
		const reader = new FileReader();
		reader.onload = () => {
			// Set the result of FileReader as the selected file
			setSelectedFile(reader.result);
		};
		reader.readAsDataURL(file);
	};

	// console.log("slectFile-->>", selectedFile);

	return (
		<div className={style.container}>
			<Card style={{ maxWidth: "400px", margin: "0 auto" }}>
				<h2>Welcome to Chit Chat</h2>
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
						label='Email'
						name='email'
						rules={[
							{
								type: "email",
								message: "The input is not valid E-mail!",
							},
							{
								required: true,
								message: "Please input your E-mail!",
							},
						]}
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

					<input
						// ref={uploadRef}
						id='profilePic'
						type='file'
						onChange={handleFileChange}
						accept='image/*' // Optionally restrict accepted file types
					/>
					{selectedFile && (
						<Image src={selectedFile} alt='avatar' width={200} height={200} />
					)}
					<Form.Item>
						<Button type='primary' htmlType='submit' block>
							Sign Up
						</Button>
						Or <Link href='/auth/login'>Login now!</Link> <br />
						Or <Link href='/auth/verify-email'>Verify Email</Link>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default SignUp;
