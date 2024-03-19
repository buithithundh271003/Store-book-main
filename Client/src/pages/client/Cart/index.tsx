import { useEffect, useState } from "react";
import Footer from "../../../compoment/footer";
import Header from "../../../compoment/header";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllCart, removeCart, updateCart } from "../../../redux/Reducer/CartSlice";
import { getAllProduct, removeProduct } from "../../../redux/Reducer/ProductSlice";
import IProduct from "../../../interface/product";
import { message } from "antd";
import { Link } from "react-router-dom";
import ICart from "../../../interface/cart";


const cart = () => {
    const dispatch = useAppDispatch();
    // const [user, setUser] = useState()
    const user = JSON.parse(localStorage.getItem("user")!)


    // const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const carts = useAppSelector((state) => state.Cart.carts);
    // console.log(Allcarts);

    // const carts = Allcarts?.filter(u => u._id === user._id)

    const products = useAppSelector((state) => state.Product.products);
    let totalMoney: number = 0;
    carts?.map(item => {
        totalMoney += item.totalMoney
    })

    // const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        dispatch(getAllCart(user._id))
        dispatch(getAllProduct())
    }, [])
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllCart(user._id))
        dispatch(getAllProduct())
        // const userStore = JSON.parse(localStorage.getItem("user")!)
        // if (userStore) {
        //     setUser(userStore)
        // }
    }, [dispatch]);

    const confirm = async (id: string) => {
        const confirm = window.confirm("Bạn có muốn xóa không?")
        if (confirm) {
            await dispatch(removeCart(id));
            message.success("Xóa sản phẩm thành công");
        }
    }

    const handleQuantityChange = async (id: string, productId: string, newQuantity: number, updatedTotalMoney: number, price: number) => {
        try {
            const cart: ICart = {
                _id: id,
                productId: productId,
                quantity: newQuantity,
                totalMoney: updatedTotalMoney,
                price: price
            }
            await dispatch(updateCart(cart));
            // Update local state
            // const updatedCarts = carts.map((item) =>
            //     item._id === productId ? { ...item, quantity: newQuantity, totalMoney: updatedTotalMoney } : item
            // );
            dispatch(getAllCart(user._id));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid checkout-content">
                    <div className="row">
                        <div id="cart" className="card-block show p-0 col-12">
                            <div className="row align-item-center">
                                <div className="col-lg-8">
                                    <div className="iq-card">
                                        <div className="iq-card-header d-flex justify-content-between iq-border-bottom mb-0">
                                            <div className="iq-header-title">
                                                <h4 className="card-title">Giỏ hàng</h4>
                                            </div>
                                        </div>
                                        <div className="iq-card-body">
                                            <ul className="list-inline p-0 m-0">
                                                {carts?.map(item => {
                                                    const product = products.find((product: IProduct) => product._id === item.productId)
                                                    return <>
                                                        <li className="checkout-product">
                                                            <div className="row align-items-center">
                                                                <div className="col-sm-2">
                                                                    <span className="checkout-product-img">
                                                                        <a href="javascript:void();"><img className="img-fluid rounded" src={product?.images} alt="" /></a>
                                                                    </span>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="checkout-product-details">
                                                                        <h5>{product?.name}</h5>
                                                                        <p className="text-success">Còn hàng</p>
                                                                        <div className="price">
                                                                            <h5>{product?.price} ₫</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="row">
                                                                        <div className="col-sm-10">
                                                                            <div className="row align-items-center mt-2">
                                                                                <div className="col-sm-7 col-md-6">
                                                                                    <button type="button" onClick={() => handleQuantityChange(item._id, item.productId, item?.quantity - 1, (item?.quantity - 1) * item?.price, item.price)} className="fa fa-minus qty-btn" id="btn-minus"></button>
                                                                                    <input type="text" id="quantity" value={item.quantity} />
                                                                                    <button type="button" onClick={() => handleQuantityChange(item._id, item.productId, item?.quantity + 1, (item?.quantity + 1) * item?.price, item.price)} className="fa fa-plus qty-btn" id="btn-plus"></button>
                                                                                </div>
                                                                                <div className="col-sm-5 col-md-6">
                                                                                    <span className="product-price">{item.totalMoney}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <button type="button" onClick={() => confirm(item._id)} className="text-dark font-size-20 border-none"><i className="ri-delete-bin-7-fill"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="iq-card">
                                        <div className="iq-card-body">
                                            <p>Tùy chọn</p>
                                            <div className="d-flex justify-content-between">
                                                <span>Phiếu giảm giá</span>
                                                <span><a href="#"><strong>Áp dụng</strong></a></span>
                                            </div>
                                            <hr />
                                            <p><b>Chi tiết</b></p>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>Tổng</span>
                                                <span>{totalMoney}đ</span>
                                            </div>
                                            {/* <div className="d-flex justify-content-between mb-1">
                                                <span>Giảm giá</span>
                                                <span className="text-success">19.900đ</span>
                                            </div> */}
                                            {/* <div className="d-flex justify-content-between mb-1">
                                                <span>Thuế VAT</span>
                                                <span>16.900đ</span>
                                            </div> */}
                                            <div className="d-flex justify-content-between">
                                                <span>Phí vận chuyển</span>
                                                <span className="text-success">40000đ</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <span className="text-dark"><strong>Tổng</strong></span>
                                                <span className="text-dark"><strong>{totalMoney + 40000}đ</strong></span>
                                            </div>
                                            <Link id="place-order" to={`/checkout`} className="btn btn-primary d-block mt-3 next">Đặt hàng</Link>
                                        </div>
                                    </div>
                                    <div className="iq-card ">
                                        <div className="card-body iq-card-body p-0 iq-checkout-policy">
                                            <ul className="p-0 m-0">
                                                <li className="d-flex align-items-center">
                                                    <div className="iq-checkout-icon">
                                                        <i className="ri-checkbox-line"></i>
                                                    </div>
                                                    <h6>Chính sách bảo mật (Thanh toán an toàn và bảo mật.)</h6>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <div className="iq-checkout-icon">
                                                        <i className="ri-truck-line"></i>
                                                    </div>
                                                    <h6>Chính sách giao hàng (Giao hàng tận nhà.)</h6>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <div className="iq-checkout-icon">
                                                        <i className="ri-arrow-go-back-line"></i>
                                                    </div>
                                                    <h6>Chính sách hoàn trả</h6>
                                                </li>
                                            </ul>
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
export default cart;