import React, { Dispatch, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { authLogout } from '../../../redux/Reducer/authSlice';
import IOrder from '../../../interface/order';
import axios from 'axios';
import { getAllOrder, getOrder, updateOrder } from '../../../redux/Reducer/OrderSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import Header from '../../../compoment/header';
import Footer from '../../../compoment/footer';
import { getAllProduct } from '../../../redux/Reducer/ProductSlice';
import IProduct from '../../../interface/product';
import IOrderDetail from '../../../interface/orderDetail';

interface DataType {
    _id: string;
    image: string;
    nameProduct: string;
    totalMoney: number;
    quantity: number;
    price: number;
    status: number
}

const orderDetail = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();

    const { id } = useParams();


    const orders = useAppSelector((state) => state.Order.orders);

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch]);

    // const order = orders?.find((order: IOrder) => order._id === id);

    // const listOrderDetails = order?.orderDetails
    // console.log(listOrderDetails);

    const order = useAppSelector((state) => state.Order.order);
    console.log(order);


    const products = useAppSelector((state) => state.Product.products);
    let orderDetailData: IProduct[] = []
    order?.orderDetails?.map((item: IOrderDetail) => {
        const product = products.find(p => p._id == item.productId)
        orderDetailData.push(
            {
                _id: product?._id,
                images: product?.images,
                nameProduct: product?.name,
                totalMoney: item.totalMoney,
                quantity: item.quantity,
                price: item.price,
                status: order?.status,
            }
        )
    })

    // const [orderDetailData, setOrderDetailData] = useState<any[]>([]);

    // useEffect(() => {
    //     dispatch(getAllProduct())
    //     dispatch(getOrder(id))
    //     setOrderDetailData(oneOrderDetail)
    // }, [])

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getOrder(id))
    }, [dispatch])

    const date = () => {
        const date = new Date(order?.createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Sản phẩm',
            render: (record: any) => (
                <div className='flex items-center'>
                    <div className='mr-2'>
                        <img src={record?.image} alt="" className='w-14 h-auto object-cover' />
                    </div>
                    <div className="py-2 ">
                        <span className='block'>{record?.nameProduct}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            key: 'totalMoney',
            title: 'Thành tiền',
            render: (record: any) => (record.price * record.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
    ];

    const data: DataType[] = orderDetailData.map((item: any) => ({
        _id: item._id,
        image: item.images,
        nameProduct: item.nameProduct,
        totalMoney: item.totalMoney,
        quantity: item.quantity,
        price: item.price,
        status: item.status,
    }));

    const handleCancel = () => {
        const value: any = {
            ...order,
            status: 0,
        };

        dispatch(updateOrder(value));
        message.error("Hủy đơn hàng thành công")

    };
    const handleConfirm = () => {
        const value: any = {
            ...order,
            status: 4,
        };

        dispatch(updateOrder(value));
        message.info("Xác nhận đã nhận hàng thành công")

    };
    return (
        <>


            <div className="wrapper">
                <Header />
                <div id="content-page" className="content-page">
                    <div className="container-fluid checkout-content">
                        <div className="row">
                            <div className="mx-14 mt-10 mb-16 w-full">
                                <h1 className='uppercase font-normal text-[20px] text-center mb-10 relative p-3'>
                                    <span>Chi tiết đơn hàng</span>
                                    <span className='block w-20 h-1 bg-black absolute left-1/2 transform -translate-x-1/2 bottom-0'></span>
                                </h1>
                                <div className="row flex">
                                    <div className="w-full">
                                        <h3 className='uppercase text-[17px] mb-2'>
                                            Đơn hàng : #{order?._id?.slice(0, 10)}
                                        </h3>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="">
                                                <span className='block mb-2'>Đặt lúc - {date()}</span>
                                                <span className={`block font-bold text-xl ${order?.status === 4 ? 'hidden' : ''}`}>
                                                    {(() => {
                                                        switch (order?.status) {
                                                            case 1:
                                                                return 'Đang xử lý';
                                                            case 2:
                                                                return 'Đang chuẩn bị hàng';
                                                            case 3:
                                                                return 'Đang giao';
                                                            case 0:
                                                                return 'Hủy';
                                                            default:
                                                                return 'Trạng thái không xác định';
                                                        }
                                                    })()}
                                                </span>
                                            </div>
                                            <div className="">
                                                <button
                                                    className={`border px-10 py-2 bg-red-500 text-white hover:bg-red-400 rounded-md ${order?.status === 1 || order?.status === 2 ? '' : 'hidden'}`}
                                                    onClick={handleCancel}
                                                >
                                                    Hủy đơn hàng
                                                </button>
                                                <button className={`border px-10 py-2 bg-blue-500 text-white hover:bg-blue-400 rounded-md  ${order?.status === 3 ? '' : 'hidden'}`}
                                                    onClick={handleConfirm}
                                                >
                                                    Đã nhận được hàng
                                                </button>
                                                <span className={`border px-10 py-2 bg-green-500 text-white rounded-md  ${order?.status === 4 ? '' : 'hidden'}`} >
                                                    Hoàn thành
                                                </span>
                                            </div>
                                        </div>
                                        <Table
                                            columns={columns}
                                            dataSource={data}
                                            pagination={false}
                                            className='mb-10'
                                            summary={(pageData) => {
                                                let total = 0;

                                                pageData.forEach((record) => {
                                                    total += record.price * record.quantity;
                                                });

                                                return (
                                                    <>
                                                        <Table.Summary.Row className='font-bold'>
                                                            <Table.Summary.Cell index={0} colSpan={3}>Tổng sản phẩm</Table.Summary.Cell>
                                                            <Table.Summary.Cell index={1}>
                                                                {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                            </Table.Summary.Cell>
                                                        </Table.Summary.Row>
                                                        <Table.Summary.Row className='font-bold'>
                                                            <Table.Summary.Cell index={0} colSpan={3}>Giao hàng tận nơi</Table.Summary.Cell>
                                                            <Table.Summary.Cell index={1}>
                                                                40,000đ
                                                            </Table.Summary.Cell>
                                                        </Table.Summary.Row>
                                                        <Table.Summary.Row className='font-bold'>
                                                            <Table.Summary.Cell index={0} colSpan={3}>Tổng tiền</Table.Summary.Cell>
                                                            <Table.Summary.Cell index={1}>
                                                                {(total + 40000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                            </Table.Summary.Cell>
                                                        </Table.Summary.Row>
                                                    </>
                                                );
                                            }}
                                        />
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="">
                                                <h3 className='text-xl font-medium mb-3'>Thông tin gửi hàng</h3>
                                                <div className="flex">
                                                    <div className="space-y-2 text-base mr-20">
                                                        <span className='block '>Người nhận:</span>
                                                        <span className='block '>Số điện thoại:</span>
                                                        <span className='block '>Địa chỉ giao hàng:</span>
                                                    </div>
                                                    <div className="space-y-2 text-base">
                                                        <span className='block font-medium'>{order?.fullName}</span>
                                                        <span className='block font-medium'>{order?.phoneNumber}</span>
                                                        <span className='block font-medium'>{order?.address}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <h3 className='font-medium mb-3'>Ghi chú:</h3>
                                                <TextArea rows={5} value={order?.note} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}

export default orderDetail;