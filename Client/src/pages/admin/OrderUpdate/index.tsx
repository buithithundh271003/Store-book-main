import React, { Dispatch, useEffect, useState } from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Button,
    Form,
    Input,
    Select,
    Space,
    message,
    Spin,
    Row,
    Col,
    Breadcrumb,
    Table
} from 'antd';
import {
    UploadOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/hook';
import { getAllOrder, getOrder, updateOrder } from '../../../redux/Reducer/OrderSlice';
import IOrder from '../../../interface/order';
import IProduct from '../../../interface/product';
import IOrderDetail from '../../../interface/orderDetail';
import { getAllProduct } from '../../../redux/Reducer/ProductSlice';

interface DataType {
    _id: string;
    image: string;
    nameProduct: string;
    totalMoney: number;
    quantity: number;
    price: number;
}

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

const orderUpdate = () => {
    const [form] = Form.useForm();
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();

    const { id } = useParams();

    const order = useAppSelector((state) => state.Order.order);

    const products = useAppSelector((state) => state.Product.products);

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getOrder(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getOrder(id))
    }, [])
    let orderDetailData: any[] = []
    order?.orderDetails?.map((item: IOrderDetail) => {
        const product = products.find(p => p._id == item.productId)
        orderDetailData.push(
            {
                _id: product?._id,
                image: product?.images,
                nameProduct: product?.name,
                totalMoney: item.totalMoney,
                quantity: item.quantity,
                price: item.price,
                status: order?.status,
            }
        )
    })

    const date = () => {
        const date = new Date(order?.createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    form.setFieldsValue({
        _id: order?._id,
        fullName: order?.fullName,
        address: order?.address,
        phoneNumber: order?.phoneNumber,
        date: date(),
        paymentStatus: order?.paymentStatus && order?.paymentStatus,
        status: order?.status && order?.status,
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Items',
            render: (record: any) => (
                <div className='flex items-center'>
                    <div className='mr-3'>
                        <img src={record?.image} alt="" className='w-14 h-20 object-cover' />
                    </div>
                    <div className="">
                        <span className='block'>{record?.nameProduct}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Quanttity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            key: 'total',
            title: 'Total',
            render: (record: any) => (record.price * record.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
    ];
    let data: DataType[] = [];

    if (orderDetailData) {
        data = orderDetailData.map((order: any) => ({
            _id: order._id,
            image: order.image,
            nameProduct: order.nameProduct,
            quantity: order.quantity,
            price: order.price,
            totalMoney: order.totalMoney,
        }));
    }

    // const [onUpdate] = useUpdateProductMutation()
    const onFinish = async (values: any) => {
        try {
            await dispatch(updateOrder({ _id: order?._id, ...values }));
            console.log(values);

            message.success(`Update order successfully`);
            navigate("/admin/order");
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <Breadcrumb className='pb-3'
            items={[

                {
                    title: <Link to={`/admin/order`}>Order</Link>,
                },
                {
                    title: 'Update Order',
                },
            ]}
        />
        <div className='border p-10 rounded-lg  bg-white'>
            <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
                Update Order
            </h3>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="mx-auto"
            >
                <Form.Item style={{ display: "none" }}>
                    <Input name="_id" />
                </Form.Item>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                    <Col className="gutter-row" span={8}>


                        <Form.Item
                            name="fullName"
                            label="Customer name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Title Product!'
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>

                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please input your Address!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            name="date"
                            label="Date"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            name="paymentStatus"
                            label="Payment"
                        >
                            <Select
                                allowClear
                                options={[
                                    { value: 0, label: 'Unpaid', disabled: true },
                                    { value: 1, label: 'Paid', },
                                ]}
                                disabled={form.getFieldValue('paymentStatus') === 1}

                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form.Item name="status" label="Status">
                            <Select
                                allowClear
                                options={[
                                    { value: 0, label: 'Canceled' },
                                    { value: 1, label: 'Peding' },
                                    { value: 2, label: 'Packing' },
                                    { value: 3, label: 'Shipping' },
                                    { value: 4, label: 'Completed', disabled: true },
                                ].filter(option => form.getFieldValue('status') <= option.value)}
                                disabled={form.getFieldValue('status') === 0}
                            ></Select>
                        </Form.Item>

                    </Col>
                </Row>

                <div className="">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        className='mb-10'
                        summary={(pageData) => {
                            let total = 0;
                            let totalMoney = 0;
                            pageData.forEach((record) => {
                                total += record.price * record.quantity;
                            });
                            totalMoney = total + 40000
                            return (
                                <>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Total</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Shipping</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            40,000
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Total Money</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            {order?.totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </>
                            );
                        }}
                    />
                </div>
                <Form.Item className='my-5'>
                    <Space>
                        <SubmitButton form={form} />
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form >
        </div >

    </>
}

export default orderUpdate;