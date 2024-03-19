import { Button, Form, Input, message } from "antd";
import axios from "axios";
// import '../../../index.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FormDataType = {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const signup = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (data: FormDataType) => {
        try {
            await axios.post("http://localhost:8080/api/signup", data);
            message.success("Successfully registered");
            navigate("/signin");
        } catch (error: any) {
            if (error.response) {
                // Lỗi phản hồi từ máy chủ
                const serverErrorMessage = error.response.data.message; // Điều chỉnh dựa trên cấu trúc phản hồi thực tế từ máy chủ

                // Hiển thị thông báo lỗi trong trường "email" của Form.Item
                form.setFields([
                    {
                        name: 'email',
                        errors: [serverErrorMessage],
                    },
                ]);
            } else {
                // Xử lý lỗi khác (không phải lỗi phản hồi từ máy chủ)
                console.log(error);
            }
        }
    };
    return <>
        <div className="mx-auto h-[100vh]  px-4 pt-5 bg-blue-50">
            <div className="mx-auto max-w-lg">
                <Link to={'/'}>
                    <div className="flex justify-center">
                        {/* <img className="max-w-full h-auto w-[130px] md:w-[150px]" src="../../../public/image/logo.png" alt="" /> */}
                    </div>
                </Link>
                <Form
                    form={form}
                    onFinish={onFinish}
                    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                    style={{ maxWidth: 600 }}
                    className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
                    scrollToFirstError
                >
                    <p className="text-center text-gray-500 text-lg font-medium">Please sign Up in to continue</p>

                    <Form.Item
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Full Name!',
                                whitespace: true,
                            },
                        ]}

                    >
                        <Input
                            placeholder="Full Name"
                            className="p-3"
                            suffix={
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                        />
                                    </svg>
                                </span>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            }
                        ]}

                    >
                        <Input placeholder="E-mail"
                            className="p-3"
                            suffix={
                                <span className="">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-gray-500">
                                        <path
                                            strokeLinecap="round"
                                            d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                    </svg>
                                </span>
                            } />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters long.',
                            },
                        ]}
                    >

                        <Input.Password placeholder="Password"
                            className="p-3"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password"
                            className="p-3"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                            className="w-full h-[47px] bg-primary  text-white"
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                    <p className="text-center text-sm text-gray-500">
                        Already have an account?
                        <Link className="underline text-primary font-semibold ml-1"
                            to={`/signin`}
                        >
                            Sign in
                        </Link>
                    </p>
                </Form>
            </div >
        </div >
    </>
}
export default signup;