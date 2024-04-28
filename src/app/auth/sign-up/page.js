"use client"
import React from "react";
import { Form, Input, Button, Upload, Card } from "antd";
import  style  from "../auth.module.css"

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
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

  return (
    <div className={style.container}>
        <Card style={{ maxWidth: "400px", margin: "0 auto" }}>
          <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed} >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
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
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: "Please input your password!",
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="file"
                label="Profile Picture"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                e.fileList.slice(-1).filter((file) => file.status === "done")
                }
                rules={[
                {
                    required: true,
                    message: "Please upload your profile picture!",
                },
                ]}
            >
                <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                >
                {form.getFieldValue("file")?.[0]?.url ? (
                    <img
                    src={form.getFieldValue("file")?.[0]?.url}
                    alt="avatar"
                    style={{ width: "100%" }}
                    />
                ) : (
                    <p>Upload</p>
                )}
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                Sign Up
                </Button>
                Or <a href="#">login now!</a>
            </Form.Item>
            </Form>
        </Card>
    </div> 
  );
};

export default SignUp;

