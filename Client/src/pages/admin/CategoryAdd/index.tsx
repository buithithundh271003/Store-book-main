import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hook';
import ICategory from '../../../interface/category';
import { createCatetgory } from '../../../redux/Reducer/CategorySlice';


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

const categoryAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onFinish = (values: ICategory) => {
        void dispatch(createCatetgory(values));
        message.success(`Add category successfully!`);
        navigate("/admin/category");
    };
    return <>
        <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
            Create New Category
        </h3>
        <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="mx-auto max-w-[500px]"
        >
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                <Input />
            </Form.Item>

            <Form.Item>
                <Space>
                    <SubmitButton form={form} />
                    <Button htmlType="reset">Reset</Button>
                </Space>
            </Form.Item>
        </Form>
    </>
}
export default categoryAdd;