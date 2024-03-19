import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getAllCategory } from "../redux/Reducer/CategorySlice";
import { Link, useNavigate } from "react-router-dom";
import { getAllCart, removeCart } from "../redux/Reducer/CartSlice";
import { getAllProduct } from "../redux/Reducer/ProductSlice";
import IProduct from "../interface/product";
import { message } from "antd";

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categories = useAppSelector((state) => state.Category.categories);
    const carts = useAppSelector((state) => state.Cart.carts);
    const user = JSON.parse(localStorage.getItem("user")!)

    const products = useAppSelector((state) => state.Product.products);
    const [result, setResult] = useState(products);

    let totalMoney: number = 0;
    carts?.map(item => {
        totalMoney += item.totalMoney
    })

    const confirm = async (id: string) => {
        const confirm = window.confirm("Bạn có muốn xóa không?")
        if (confirm) {
            await dispatch(removeCart(id));
            message.success("Xóa sản phẩm thành công");
        }
    }

    const logout = () => {
        localStorage.removeItem("myCat");
        localStorage.clear();
        message.success("Đăng xuất thành công");
        navigate('/')
    }

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllCategory())
        if (user) {
            dispatch(getAllProduct())
            dispatch(getAllCart(user._id))
        }
    }, [dispatch]);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllCategory())
        if (user) {
            dispatch(getAllCart(user._id))
            dispatch(getAllProduct())
        }
    }, []);
   
    return <>
        <div className="iq-sidebar">
            <div className="iq-sidebar-logo d-flex justify-content-between">
                <Link to={`/`} className="header-logo">
                    <img src="src/src/style/images/logo.png" className="img-fluid rounded-normal" alt="" />
                    <div className="logo-title">
                        <span className="text-primary text-uppercase">NHASACHTV</span>
                    </div>
                </Link>
            </div>
            <div id="sidebar-scrollbar">
                <nav className="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" className="iq-menu">
                        <li className="active active-menu">
                            <Link to={`/`} className="iq-waves-effect" data-toggle="collapse" aria-expanded="true"><span className="ripple rippleEffect"></span><i className="las la-home iq-arrow-left"></i><span>Trang Chủ</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Link>
                            <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                            </ul>
                        </li>
                        <li>
                            <Link to={`/products`} className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="lab la-elementor iq-arrow-left"></i><span>Danh mục sản phẩm</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Link>
                            <ul id="ui-elements" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                {categories.map(item => {
                                    return <>
                                        <li className="elements">
                                            <Link to={`/products`} className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-play-circle-line"></i><span>{item.name}</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Link>
                                        </li>

                                    </>
                                })}
                            </ul>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
        <div className="iq-top-navbar">
            <div className="iq-navbar-custom">
                <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <div className="iq-menu-bt d-flex align-items-center">
                        <div className="wrapper-menu">
                            <div className="main-circle"><i className="las la-bars"></i></div>
                        </div>
                        <div className="iq-navbar-logo d-flex justify-content-between">
                            <a href="index.html" className="header-logo">
                                <img src="src/src/style/images/logo.png" className="img-fluid rounded-normal" alt="" />
                                <div className="logo-title">
                                    <span className="text-primary text-uppercase">img01</span >
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="navbar-breadcrumb">
                        <h5 className="mb-0">Trang Chủ</h5>
                    </div>
                   
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                        <i className="ri-menu-3-line"></i>
                    </button>
                    <div className=" navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-list">
                            <li className="nav-item nav-icon search-content">
                                <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                    <i className="ri-search-line"></i>
                                </a>
                                <form action="#" className="search-box p-0">
                                    <input type="text" className="text search-input" placeholder="Type here to search..." />
                                    <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                </form>
                            </li>
                            <li className="nav-item nav-icon">
                                <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                    <i className="ri-notification-2-line"></i>
                                    <span className="bg-primary dots"></span>
                                </a>
                                <div className="iq-sub-dropdown">
                                    <div className="iq-card shadow-none m-0">
                                        <div className="iq-card-body p-0">
                                            <div className="bg-primary p-3">
                                                <h5 className="mb-0 text-white">Thông Báo<small className="badge  badge-light float-right pt-1">4</small></h5>
                                            </div>
                                            <a href="#" className="iq-sub-card" >
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/1.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">Đơn hàng giao thành công</h6>
                                                        <small className="float-right font-size-12">Just Now</small>
                                                        <p className="mb-0">95.000đ</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="iq-sub-card" >
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/02.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">Đơn hàng giao thành công</h6>
                                                        <small className="float-right font-size-12">5 days ago</small>
                                                        <p className="mb-0">255.000đ</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="iq-sub-card" >
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/03.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">Đơn hàng giao thành công</h6>
                                                        <small className="float-right font-size-12">2 days ago</small>
                                                        <p className="mb-0">79.000đ</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="iq-sub-card" >
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/04.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">Đơn hàng #7979 giao không thành công</h6>
                                                        <small className="float-right font-size-12">3 days ago</small>
                                                        <p className="mb-0">100.000đ</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item nav-icon dropdown">
                                <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                    <i className="ri-mail-line"></i>
                                    <span className="bg-primary dots"></span>
                                </a>
                                <div className="iq-sub-dropdown">
                                    <div className="iq-card shadow-none m-0">
                                        <div className="iq-card-body p-0 ">
                                            <div className="bg-primary p-3">
                                                <h5 className="mb-0 text-white">Tin Nhắn<small className="badge  badge-light float-right pt-1">5</small></h5>
                                            </div>
                                            <a href="#" className="iq-sub-card">
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/01.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">QT Shop</h6>
                                                        <small className="float-left font-size-12">13 Jun</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="iq-sub-card">
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/02.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">Tran Thuan Store</h6>
                                                        <small className="float-left font-size-12">20 Apr</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="iq-sub-card">
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/03.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">Hoang Vu Book</h6>
                                                        <small className="float-left font-size-12">30 Jun</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="iq-sub-card">
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/04.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">Quang Minh Book</h6>
                                                        <small className="float-left font-size-12">12 Sep</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="iq-sub-card">
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="avatar-40 rounded" src="src/style/images/user/05.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">TV Team</h6>
                                                        <small className="float-left font-size-12">5 Dec</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item nav-icon dropdown">
                                <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                    <i className="ri-shopping-cart-2-line"></i>
                                    <span className="badge badge-danger count-cart rounded-circle">{carts ? carts.length : 0}</span>
                                </a>
                                <div className="iq-sub-dropdown">
                                    <div className="iq-card shadow-none m-0">
                                        <div className="iq-card-body p-0 toggle-cart-info">
                                            <div className="bg-primary p-3">
                                                <h5 className="mb-0 text-white">Giỏ Hàng<small className="badge  badge-light float-right pt-1">{carts ? carts.length : 0}</small></h5>
                                            </div>
                                            {carts?.map(item => {
                                                const product = products.find((product: IProduct) => product._id === item.productId)
                                                return <>
                                                    <Link to={`/products/${product?._id}`} className="iq-sub-card">
                                                        <div className="iq-sub-card">

                                                            <div className="media align-items-center">
                                                                <div className="">
                                                                    <img className="rounded" src={product?.images} alt="" />
                                                                </div>
                                                                <div className="media-body ml-3">
                                                                    <h6 className="mb-0 ">{product?.name}</h6>
                                                                    <p className="mb-0">{product?.price}đ</p>
                                                                </div>
                                                                <div className="float-right font-size-24 text-danger" onClick={() => confirm(item._id)}><i className="ri-close-fill"></i></div>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </>
                                            })}
                                            {/* <a href="#" className="iq-sub-card">
                                                <div className="media align-items-center">
                                                    <div className="">
                                                        <img className="rounded" src="src/style/images/cart/02.jpg" alt="" />
                                                    </div>
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 ">The Sin Eater Book</h6>
                                                        <p className="mb-0">$40</p>
                                                    </div>
                                                    <div className="float-right font-size-24 text-danger"><i className="ri-close-fill"></i></div>
                                                </div>
                                            </a> */}
                                            <div className="d-flex align-items-center text-center p-3">
                                                <Link className="btn btn-primary mr-2 iq-sign-btn" to={`/cart`} role="button">Giỏ Hàng</Link>
                                                <Link className="btn btn-primary iq-sign-btn" to={`/checkout`} role="button">Thanh Toán</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {user ?
                                <li className="line-height pt-3">
                                    <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                        {/* <img src="src/style/images/user/1.jpg" className="img-fluid rounded-circle mr-3" alt="user" /> */}
                                        <div className="caption">
                                            <h6 className="mb-1 line-height">{user.fullname}</h6>
                                            <p className="mb-0 text-primary">Tài Khoản</p>
                                        </div>
                                    </a>
                                    <div className="iq-sub-dropdown iq-user-dropdown">
                                        <div className="iq-card shadow-none m-0">
                                            <div className="iq-card-body p-0 ">
                                                <div className="bg-primary p-3">
                                                    <h5 className="mb-0 text-white line-height">Xin Chào {user.fullname}</h5>
                                                </div>
                                                <a href="profile-edit.html" className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-file-user-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Tài khoản của tôi</h6>
                                                        </div>
                                                    </div>
                                                </a>
                                                <Link to={`/myorder`} className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-account-box-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Đơn hàng của tôi</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="d-inline-block w-100 text-center p-3">
                                                    <button className="bg-primary iq-sign-btn" onClick={() => logout()} role="button">Sign out<i className="ri-login-box-line ml-2"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                :
                                <li className="line-height pt-3">
                                    <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                        {/* <img src="src/style/images/user/1.jpg" className="img-fluid rounded-circle mr-3" alt="user" /> */}
                                        <div className="caption">
                                            <h6 className="mb-1 line-height">Tài khoản</h6>
                                            {/* <p className="mb-0 text-primary">Tài Khoản</p> */}
                                        </div>
                                    </a>
                                    <div className="iq-sub-dropdown iq-user-dropdown">
                                        <div className="iq-card shadow-none m-0">
                                            <div className="iq-card-body p-0 ">
                                                <div className="bg-primary p-3">
                                                    <h5 className="mb-0 text-white line-height">Xin Chào </h5>
                                                </div>
                                                <Link to={`/signup`} className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-file-user-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Đăng ký</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={`/signin`} className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-account-box-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Đăng nhập</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </>
}

export default Header