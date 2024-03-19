import { useEffect } from "react";
import Footer from "../../../compoment/footer"
import Header from "../../../compoment/header"
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllCart } from "../../../redux/Reducer/CartSlice";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { useForm } from "react-hook-form";
import IOrder from "../../../interface/order";
import { createOrder } from "../../../redux/Reducer/OrderSlice";
import { useNavigate } from "react-router-dom";
import IOrderDetail from "../../../interface/orderDetail";
import { message } from "antd";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const [messageApi, contextHolder] = message.useMessage();

    const carts = useAppSelector((state) => state.Cart.carts);
    const products = useAppSelector((state) => state.Product.products);

    const user = JSON.parse(localStorage.getItem("user")!)

    let totalMoney: number = 0;
    carts?.map(item => {
        totalMoney += item.totalMoney
    })

    let newCart: IOrderDetail[] = []

    carts?.map(item => {
        newCart.push({ productId: item.productId, price: item.price, quantity: item.quantity, totalMoney: item.totalMoney })
    })

    // const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllCart())
        dispatch(getAllProduct())
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IOrder>();

    const onSubmit = async (order: IOrder) => {
        try {

            const addNewOrder = { ...order, userId: user._id, totalMoney: totalMoney + 40000, vourcher_code: '', status: 1, carts: newCart };
            // console.log(addNewOrder);

            // await dispatch(createOrder(addNewOrder));
            const response = await dispatch(createOrder(addNewOrder));
            message.success("Thanh toán thành công");

            if (createOrder.fulfilled.match(response)) {
                const orderId = response.payload._id;
                console.log(orderId);

                setTimeout(() => {
                    navigate(`/billconfirm/${orderId}`);
                }, 2500);
            }


            // await dispatch(fetchOrderAction())
            // if (orderState.orders != undefined) {


            //     // console.log(orderState.orders);

            // alert("Thanh toán thành công");
            // navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    };
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid checkout-content">
                    <div className="row">
                        <div id="address" className="p-0 col-12">
                            <div className="row align-item-center">
                                <div className="col-lg-8">
                                    <div className="iq-card">
                                        <div className="iq-card-header d-flex justify-content-between">
                                            <div className="iq-header-title">
                                                <h4 className="card-title">Thêm địa chỉ mới</h4>
                                            </div>
                                        </div>
                                        <div className="iq-card-body">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Họ và tên: *</label>
                                                            <input type="text" {...register("fullName")} id="fullName" className="form-control" name="fullName" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Số điện thoại: *</label>
                                                            <input type="text" {...register("phoneNumber")} id="phoneNumber" className="form-control" name="phoneNumber" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Địa chỉ: *</label>
                                                            <input type="text" {...register("address")} id="address" className="form-control" name="address" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Ghi chú: *</label>
                                                            <textarea className="form-control" {...register("note")} id="note" name="note" > </textarea >
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="payment" className=" p-0 col-12">
                                                    <div className="row align-item-center">
                                                        <div className="col-lg-12">
                                                            <div className="iq-card">
                                                                <div className="iq-card-header d-flex justify-content-between">
                                                                    <div className="iq-header-title">
                                                                        <h4 className="card-title">Lựa chọn thanh toán</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="iq-card-body">
                                                                    {/* <form className="mt-3">
                                                                        <div className="d-flex align-items-center">
                                                                            <span>Mã giảm giá: </span>
                                                                            <div className="cvv-input ml-3 mr-3">
                                                                                <input type="text" className="form-control" required />
                                                                            </div>
                                                                            <button type="submit" className="btn btn-primary">Tiếp tục</button>
                                                                        </div>
                                                                    </form> */}
                                                                    <hr />
                                                                    <div className="card-lists">
                                                                        <div className="form-group">
                                                                            <div className="custom-control custom-radio">
                                                                                <input type="radio" id="credit" name="pay_method" value="ATM" className="custom-control-input" {...register("pay_method")} />
                                                                                <label className="custom-control-label" htmlFor="credit" > Thẻ Tín dụng / Ghi nợ / ATM</label>
                                                                            </div>
                                                                            <div className="custom-control custom-radio">
                                                                                <input type="radio" id="netbaking" name="pay_method" value="MOMO/ZALOPAY" className="custom-control-input" {...register("pay_method")} />
                                                                                <label className="custom-control-label" htmlFor="netbaking" > Momo/ZaloPay</label>
                                                                            </div>
                                                                            <div className="custom-control custom-radio">
                                                                                <input type="radio" id="cod" name="pay_method" value="COD" className="custom-control-input" {...register("pay_method")} />
                                                                                <label className="custom-control-label" htmlFor="cod" > Thanh toán khi giao hàng </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    {/* <a id="deliver-address" href="" className="btn btn-primary d-block mt-1 next">Thanh toán</a> */}
                                                                    <button id="deliver-address" className="btn btn-primary d-block mt-1 next">Thanh toán</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="iq-card">
                                        <div className="iq-card-body">
                                            <h4 className="mb-2">Chi tiết</h4>
                                            <div className="d-flex justify-content-between">
                                                <span>Giá 3 sản phẩm</span>
                                                <span><strong>{totalMoney}đ</strong></span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Phí vận chuyển</span>
                                                <span className="text-success">40000đ</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <span>Số tiền phải trả</span>
                                                <span><strong>{totalMoney + 40000}đ</strong></span>
                                            </div>
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
}

export default Checkout
