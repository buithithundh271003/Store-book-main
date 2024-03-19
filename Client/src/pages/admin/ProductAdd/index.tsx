import React, { useEffect, useState } from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    message,
    Upload,
    Spin
} from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import ICategory from '../../../interface/category';
import { getAllCategory } from '../../../redux/Reducer/CategorySlice';
import { createProduct } from '../../../redux/Reducer/ProductSlice';
const { Dragger } = Upload;
const { TextArea } = Input;


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

const productAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.Category.categories);

    const selectOptions = categories
        ?.filter((cate: ICategory) => cate.name !== "Uncategorized") // Loại bỏ danh mục "Uncategorized"
        .map((cate: ICategory) => ({
            label: `${cate.name}`,
            value: `${cate._id!}`,
        }));
    useEffect(() => {
        void dispatch(getAllCategory());
    }, [dispatch]);
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (values: any) => {
        setIsLoading(true);
        let newImages;

        if (values?.images.file) {
            newImages = values.images.fileList.map(
                ({ response }: any) => response.urls[0].url
            );
        } else {
            newImages = values.images;
        }

        const newValues = { ...values, images: newImages };

        void dispatch(createProduct(newValues));
        await message.success(`Add product successfully!`);
        navigate("/admin/product");
    };

    const props: UploadProps = {
        listType: "picture",
        name: "image",
        multiple: true,
        action: "http://localhost:8080/api/images/upload",
    };
    return <>
        {isLoading ? (

            <div className="text-center ">
                <Spin size="large" className='mt-16' />
            </div>
        ) : (
            <div>
                <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
                    Create New Product
                </h3>
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="mx-auto max-w-[500px]"
                >
                    {/* Input Name */}
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!'
                            }
                        ]}>
                        <Input />
                    </Form.Item>

                    {/* Input Author */}
                    <Form.Item
                        name="author"
                        label="Author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Author!'
                            }
                        ]}>
                        <Input />
                    </Form.Item>

                    {/* Input Category */}
                    <Form.Item name="categoryId" label="Category" rules={[{ required: true, message: 'Please input your Category!' }]}>
                        <Select
                            placeholder="Select a category"
                            allowClear
                            options={selectOptions}
                        ></Select>
                    </Form.Item>

                    <Space>
                        {/* Input Price */}
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please input your Price!' }]}
                        >
                            <InputNumber
                                min={0}
                                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        {/* Input Quantity */}
                        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input your Quantity!' }]}>
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Space>

                    {/* Upload Images */}
                    <Form.Item label="Images" name="images" rules={[{ required: true, message: 'Please input your Image!' }]}>
                        <Dragger {...props}>
                            <Button icon={<UploadOutlined />}>Choose images</Button>
                        </Dragger>
                    </Form.Item>

                    {/* Input Desription */}
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true, message: 'Please input your Description!'
                            }
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <SubmitButton form={form} />
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        )
        }

    </>
}
export default productAdd;