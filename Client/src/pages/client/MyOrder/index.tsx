import Table, { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../compoment/header";
import Footer from "../../../compoment/footer";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrder } from "../../../redux/Reducer/OrderSlice";
import { useAppSelector } from "../../../redux/hook";

interface DataType {
    _id: string;
    date: string;
    paymentStatus: number;
    totalMoney: number;
    status: string;
}
const MyOrder = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    // const [user, setUser] = useState(null)

    const user = JSON.parse(localStorage.getItem("user")!)
    const ordersData = useAppSelector((state) => state.Order.orders);

    const orders = ordersData.filter((order: any) => order.userId === user._id);

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllOrder());
    }, []);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <Link to={`/account/order/${text}`}
                className='uppercase'
            >
                #{text.slice(0, 10)}...
            </Link>,
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Trạng thái thanh toán',
            render: (value: any) => (
                (value.paymentStatus === 1 ? 'Đã thanh toán' : 'Chưa thanh toán')
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'status',
            render: (value: number) => {
                switch (value) {
                    case 0:
                        return 'Hủy';
                    case 1:
                        return 'Đang xử lý';
                    case 2:
                        return 'Đang chuẩn bị hàng';
                    case 3:
                        return 'Đang giao';
                    case 4:
                        return 'Hoàn thành';
                    default:
                        return 'Trạng thái không xác định';
                }
            }
        },

    ];
    const data: DataType[] = orders.map((order: any) => {
        const orderDate = new Date(order.createdAt);

        const day = orderDate.getDate();
        const month = orderDate.getMonth() + 1;
        const year = orderDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return {
            _id: order._id,
            totalMoney: order.totalMoney,
            date: formattedDate,
            paymentStatus: order.paymentStatus,
            status: order.status,
        };
    });
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid checkout-content">
                    <div className="row">
                        <div className="mx-14 mt-10 mb-16 w-full">
                            <h1 className='uppercase font-normal text-[20px] text-center mb-10 relative p-3'>
                                <span>Đơn hàng của tôi</span>
                                <span className='block w-20 h-1 bg-black absolute left-1/2 transform -translate-x-1/2 bottom-0'></span>
                            </h1>
                            <div className="row flex">

                                <div className="w-full">
                                    <h3 className='uppercase font-medium text-[17px] mb-3'>
                                        danh sách đơn hàng
                                    </h3>
                                    <Table columns={columns} dataSource={data} pagination={false} />
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
            <Footer />
        </div>



    </>
}

export default MyOrder