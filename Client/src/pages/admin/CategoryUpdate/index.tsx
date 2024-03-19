import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hook';
import ICategory from '../../../interface/category';
import { updateCategory } from '../../../redux/Reducer/CategorySlice';
import axios from 'axios';


const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
            Submit
        </Button>
    );
};

const categoryUpdate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState(null);
    const { id } = useParams();
    form.setFieldsValue(category);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/categories/${id!}`)
            .then(({ data }) => setCategory(data.category))
            .catch((error) => console.log(error));
    }, [id])

    const onFinish = (values: ICategory) => {
        void dispatch(updateCategory(values));
        message.success(`Update category successfully!`);
        navigate("/admin/category");
    };
    return <>
        <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
            Update Category
        </h3>
        <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="mx-auto max-w-[500px]"
        >
            <Form.Item name="_id" style={{ display: "none" }}>
                <Input />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item>
                <Space>
                    <SubmitButton form={form} />
                    {/* <Button htmlType="reset">Reset</Button> */}
                </Space>
            </Form.Item>
        </Form>
    </>
}
export default categoryUpdate;