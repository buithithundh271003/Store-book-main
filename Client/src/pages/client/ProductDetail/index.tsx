import { useEffect, useState } from "react";
import Footer from "../../../compoment/footer";
import Header from "../../../compoment/header";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProduct from "../../../interface/product";
import ICart from "../../../interface/cart";
import { createCart } from "../../../redux/Reducer/CartSlice";
import { FacebookShareButton, FacebookIcon } from 'react-share';

import { message } from "antd";
import Item from "antd/es/list/Item";

const productDetail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState()

    const products = useAppSelector((state) => state.Product.products);
    // const categories = useAppSelector((state) => state.Category.categories);

    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, []);
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, [dispatch]);

    const { id } = useParams();
    const product = products?.find((product: IProduct) => product._id === id);

    const increase = () => {
        setQuantity(quantity + 1)
    }

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    // if (product) {
    const cart: ICart = {
        userId: user?._id,
        productId: product._id,
        quantity: quantity,
        price: product.price,
        totalMoney: product.price * quantity
    }

    // }
    const addCart = (cart: ICart) => {
        dispatch(createCart(cart));
        message.success("Add to cart successfully!");
        navigate("/cart");
    }

    const addToCart = async (cart: ICart) => {
        await dispatch(createCart(cart));
        message.success("Add to cart successfully!");
        navigate(`/products/${id}`);
    }

    const cateProduct = products?.filter((newProduct: IProduct) => newProduct.categoryId?._id === product?.categoryId?._id);
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center">
                                    <h4 className="card-title mb-0">Thông tin</h4>
                                </div>
                                <div className="iq-card-body pb-0">
                                    <div className="description-contens align-items-top row">
                                        <div className="col-md-6">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <div className="row align-items-center">
                                                        <div className="col-3">
                                                            <ul id="description-slider-nav" className="list-inline p-0 m-0  d-flex align-items-center">
                                                                {product?.images.map((image) => {
                                                                    return <>
                                                                        <li>
                                                                            <Link to="#">
                                                                                <img src={image} className="img-fluid rounded w-100" alt="" />
                                                                            </Link>
                                                                        </li>

                                                                    </>
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className="col-9">
                                                            <ul id="description-slider" className="list-inline p-0 m-0  d-flex align-items-center">
                                                                <ul id="description-slider-nav" className="list-inline p-0 m-0  d-flex align-items-center">
                                                                    {product?.images.map((image) => {
                                                                        return <>
                                                                            <li>
                                                                                <Link to="#">
                                                                                    <img src={image} className="img-fluid rounded w-100" alt="" />
                                                                                </Link>
                                                                            </li>

                                                                        </>
                                                                    })}
                                                                </ul>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <h3 className="mb-3">{product?.name}</h3>
                                                    <div className="price d-flex align-items-center font-weight-500 mb-2">
                                                        {/* <span className="font-size-20 pr-2 old-price">{product?.price}</span> */}
                                                        <span className="font-size-24 text-dark">{product?.price}</span>
                                                    </div>
                                                    <div className="mb-3 d-block">
                                                        <span className="font-size-20 text-warning">
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                    <span className="text-dark mb-4 pb-4 iq-border-bottom d-block">{product?.description}</span>
                                                    <div className="text-primary mb-4">Tác giả: <span className="text-body">{product?.author}</span></div>
                                                    <div className="inline-flex mb-4 py-2 px-3 bg-white border border-gray-200 rounded-lg dark:border-gray-700" data-hs-input-number>
                                                        <div className="flex items-center gap-x-1.5">
                                                            <button onClick={() => decrease()} className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:focus:outline-none dark:focus:ring-1 " data-hs-input-number-decrement>
                                                                <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>
                                                            </button>
                                                            <input className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 " type="text" value={quantity} data-hs-input-number-input />
                                                            <button onClick={() => increase()} className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:focus:outline-none dark:focus:ring-1 " data-hs-input-number-increment>
                                                                <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {user ?
                                                        <div className="mb-4 d-flex align-items-center">
                                                            {/* <Link to={`/cart`} className="btn btn-primary view-more mr-2">Thêm vào giỏ hàng</Link>
                                                        <Link to={`/cart`} className="btn btn-primary view-more mr-2" onSubmit={addCart}>Mua ngay</Link> */}
                                                            <button className="btn btn-primary view-more mr-2" onClick={() => addToCart(cart)}>Thêm vào giỏ hàng</button>
                                                            <button className="btn btn-primary view-more mr-2" onClick={() => addCart(cart)}>Mua ngay</button>
                                                        </div>
                                                        :
                                                        <div className="mb-4 d-flex align-items-center">
                                                            {/* <Link to={`/cart`} className="btn btn-primary view-more mr-2">Thêm vào giỏ hàng</Link>
                                                        <Link to={`/cart`} className="btn btn-primary view-more mr-2" onSubmit={addCart}>Mua ngay</Link> */}
                                                            <button className="btn btn-primary view-more mr-2" onClick={() => navigate(`/signin`)}>Thêm vào giỏ hàng</button>
                                                            <button className="btn btn-primary view-more mr-2" onClick={() => navigate(`/signin`)}>Mua ngay</button>
                                                        </div>
                                                    }
                                                    <div className="mb-3">
                                                        <Link to="#" className="text-body text-center"><span className="avatar-30 rounded-circle bg-primary d-inline-block mr-2"><i className="ri-heart-fill"></i></span><span>Thêm vào danh sách yêu thích</span></Link>
                                                    </div>
                                                    <div className="iq-social d-flex align-items-center">
                                                        <h5 className="mr-2">Chia sẻ:</h5>
                                                        <ul className="list-inline d-flex p-0 mb-0 align-items-center">
                                                        <li>
                                                                <FacebookShareButton
                                                                    url={'https://www.example.com'}
                                                                    quote={'Dummy text!'}
                                                                    hashtag={'truyen hay'}
                                                                > 
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary mr-2 facebook"><i className="fa fa-facebook" aria-hidden="true"></i></Link>

                                                                </FacebookShareButton> 
                                                            </li>
                                                           
                                                            <li>
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary mr-2 twitter"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary mr-2 youtube"><i className="fa fa-youtube-play" aria-hidden="true"></i></Link>
                                                            </li>
                                                            <li >
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary pinterest"><i className="fa fa-pinterest-p" aria-hidden="true"></i></Link>
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
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Sản phẩm tương tự</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to={`/products`} className="btn btn-sm btn-primary view-more">Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body single-similar-contens">
                                    <ul id="single-similar-slider" className="list-inline p-0 mb-0 row">
                                        {cateProduct?.map(item => {
                                            return <>
                                                <li className="col-md-3">
                                                    <div className="row align-items-center">
                                                        <div className="col-5">
                                                            <div className="position-relative image-overlap-shadow">
                                                                <Link to={`/products/${item._id}`}><img className="img-fluid rounded w-100" src={item.images} alt="" /></Link>
                                                                <div className="view-book">
                                                                    <Link to={`/products/${item._id}`} className="btn btn-sm btn-white">Xem thêm</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 pl-0">
                                                            <h6 className="mb-2">{item.name}</h6>
                                                            <p className="text-body">Tác giả : {item.author}</p>
                                                            <Link to={`/products/${item._id}`} className="text-dark" >Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                        </div>
                                                    </div>
                                                </li>

                                            </>
                                        })}
                                        {/* <li className="col-md-3">
                                            <div className="row align-items-center">
                                                <div className="col-5">
                                                    <div className="position-relative image-overlap-shadow">
                                                        <Link to="#"><img className="img-fluid rounded w-100" src="images/similar-books/02.jpg" alt="" /></Link>
                                                        <div className="view-book">
                                                            <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-7 pl-0">
                                                    <h6 className="mb-2">Nhà Lãnh Đạo Không Chức Danh</h6>
                                                    <p className="text-body">Tác giả : NXB Trẻ</p>
                                                    <Link to="#" className="text-dark" >Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="row align-items-center">
                                                <div className="col-5">
                                                    <div className="position-relative image-overlap-shadow">
                                                        <Link to="#"><img className="img-fluid rounded w-100" src="images/similar-books/03.jpg" alt="" /></Link>
                                                        <div className="view-book">
                                                            <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-7 pl-0">
                                                    <h6 className="mb-2">Nghệ Thuật đầu tư Dhandho...</h6>
                                                    <p className="text-body">Tác giả : Bill Emia</p>
                                                    <Link to="#" className="text-dark" >Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="row align-items-center">
                                                <div className="col-5">
                                                    <div className="position-relative image-overlap-shadow">
                                                        <Link to="#"><img className="img-fluid rounded w-100" src="images/similar-books/04.jpg" alt="" /></Link>
                                                        <div className="view-book">
                                                            <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-7 pl-0">
                                                    <h6 className="mb-2">Từ Tốt Đến Vĩ Đại.</h6>
                                                    <p className="text-body">Tác giả : Hal Appeno</p>
                                                    <Link to="#" className="text-dark" >Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="row align-items-center">
                                                <div className="col-5">
                                                    <div className="position-relative image-overlap-shadow">
                                                        <Link to="#"><img className="img-fluid rounded w-100" src="images/similar-books/05.jpg" alt="" /></Link>
                                                        <div className="view-book">
                                                            <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-7 pl-0">
                                                    <h6 className="mb-2">D. Trump - Đừng Bao Giờ Bỏ Cuộc..</h6>
                                                    <p className="text-body">Tác giả : Zack Lee</p>
                                                    <Link to="#" className="text-dark" >Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative mb-0 trendy-detail">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Thịnh hành</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to={`/products`} className="btn btn-sm btn-primary view-more">Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body trendy-contens">
                                    <ul id="trendy-slider" className="list-inline p-0 mb-0 row">
                                        <li className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative image-overlap-shadow">
                                                    <Link to="#"><img className="img-fluid rounded w-100" src="images/trendy-books/01.jpg" alt="" /></Link>
                                                    <div className="view-book">
                                                        <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <div className="mb-2">
                                                        <h6 className="mb-1">Sinh Ra Để Trở Thành ..</h6>
                                                        <p className="font-size-13 line-height mb-1">Paul Molive</p>
                                                        <div className="d-block">
                                                            <span className="font-size-13 text-warning">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="price d-flex align-items-center">
                                                        <h6><b>107.900 ₫</b></h6>
                                                    </div>
                                                    <div className="iq-product-action">
                                                        <Link to="#"><i className="ri-shopping-cart-2-fill text-primary"></i></Link>
                                                        <Link to="#" className="ml-2"><i className="ri-heart-fill text-danger"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative image-overlap-shadow">
                                                    <Link to="#"><img className="img-fluid rounded w-100" src="images/trendy-books/02.jpg" alt="" /></Link>
                                                    <div className="view-book">
                                                        <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <div className="mb-2">
                                                        <h6 className="mb-1">Năng Lực Tìm Kiếm</h6>
                                                        <p className="font-size-13 line-height mb-1">Anna Sthesia</p>
                                                        <div className="d-block">
                                                            <span className="font-size-13 text-warning">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="price d-flex align-items-center">
                                                        <h6><b>45.500 ₫</b></h6>
                                                    </div>
                                                    <div className="iq-product-action">
                                                        <Link to="#"><i className="ri-shopping-cart-2-fill text-primary"></i></Link>
                                                        <Link to="#" className="ml-2"><i className="ri-heart-fill text-danger"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative image-overlap-shadow">
                                                    <Link to="#"><img className="img-fluid rounded w-100" src="images/trendy-books/03.jpg" alt="" /></Link>
                                                    <div className="view-book">
                                                        <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <div className="mb-2">
                                                        <h6 className="mb-1">Phân Tích Thị Trường...</h6>
                                                        <p className="font-size-13 line-height mb-1">Monty Carlo</p>
                                                        <div className="d-block">
                                                            <span className="font-size-13 text-warning">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="price d-flex align-items-center">
                                                        <h6><b>105.900 ₫</b></h6>
                                                    </div>
                                                    <div className="iq-product-action">
                                                        <Link to="#"><i className="ri-shopping-cart-2-fill text-primary"></i></Link>
                                                        <Link to="#" className="ml-2"><i className="ri-heart-fill text-danger"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative image-overlap-shadow">
                                                    <Link to="#"><img className="img-fluid rounded w-100" src="images/trendy-books/04.jpg" alt="" /></Link>
                                                    <div className="view-book">
                                                        <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <div className="mb-2">
                                                        <h6 className="mb-1">Siêu Cò – How To Be A Power...</h6>
                                                        <p className="font-size-13 line-height mb-1">Smith goal</p>
                                                        <div className="d-block">
                                                            <span className="font-size-13 text-warning">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="price d-flex align-items-center">
                                                        <h6><b>249.000 ₫</b></h6>
                                                    </div>
                                                    <div className="iq-product-action">
                                                        <Link to="#"><i className="ri-shopping-cart-2-fill text-primary"></i></Link>
                                                        <Link to="#" className="ml-2"><i className="ri-heart-fill text-danger"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative image-overlap-shadow">
                                                    <Link to="#"><img className="img-fluid rounded w-100" src="images/trendy-books/05.jpg" alt="" /></Link>
                                                    <div className="view-book">
                                                        <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <div className="mb-2">
                                                        <h6 className="mb-1">7 Thói Quen Của Bạn Trẻ... </h6>
                                                        <p className="font-size-13 line-height mb-1">Paige Turner</p>
                                                        <div className="d-block">
                                                            <span className="font-size-13 text-warning">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="price d-flex align-items-center">
                                                        <h6><b>95.900 ₫</b></h6>
                                                    </div>
                                                    <div className="iq-product-action">
                                                        <Link to="#"><i className="ri-shopping-cart-2-fill text-primary"></i></Link>
                                                        <Link to="#" className="ml-2"><i className="ri-heart-fill text-danger"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative image-overlap-shadow">
                                                    <Link to="#"><img className="img-fluid rounded w-100" src="images/trendy-books/06.jpg" alt="" /></Link>
                                                    <div className="view-book">
                                                        <Link to="book-page.html" className="btn btn-sm btn-white">Xem sách</Link>
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <div className="mb-2">
                                                        <h6 className="mb-1">Jeff Bezos Và Kỷ ..</h6>
                                                        <p className="font-size-13 line-height mb-1">Barb Ackue</p>
                                                        <div className="d-block">
                                                            <span className="font-size-13 text-warning">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="price d-flex align-items-center">
                                                        <h6><b>76.800 ₫</b></h6>
                                                    </div>
                                                    <div className="iq-product-action">
                                                        <Link to="#"><i className="ri-shopping-cart-2-fill text-primary"></i></Link>
                                                        <Link to="#" className="ml-2"><i className="ri-heart-fill text-danger"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Sách yêu thích</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to={`/products`} className="btn btn-sm btn-primary view-more">Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body favorites-contens">
                                    <ul id="favorites-slider" className="list-inline p-0 mb-0 row">
                                        <li className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative">
                                                    <Link to="#">
                                                        <img src="images/favorite/01.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">D. Trump - Nghệ Thuật Đàm Phán</h5>
                                                    <p className="mb-2">Tác giả : Pedro Araez</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">65</span>
                                                    </div>
                                                    <div className="iq-progress-bar-linear d-inline-block w-100">
                                                        <div className="iq-progress-bar iq-bg-primary">
                                                            <span className="bg-primary" data-percent="65"></span>
                                                        </div>
                                                    </div>
                                                    <Link to="#" className="text-dark">Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative">
                                                    <Link to="#">
                                                        <img src="images/favorite/02.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">Một Đời Quản Trị</h5>
                                                    <p className="mb-2">Tác giả : Michael klock</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">45</span>
                                                    </div>
                                                    <div className="iq-progress-bar-linear d-inline-block w-100">
                                                        <div className="iq-progress-bar iq-bg-danger">
                                                            <span className="bg-danger" data-percent="45"></span>
                                                        </div>
                                                    </div>
                                                    <Link to="#" className="text-dark">Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative">
                                                    <Link to="#">
                                                        <img src="images/favorite/03.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">Người Bán Hàng Vĩ Đại Nhất Thế Giới</h5>
                                                    <p className="mb-2">Tác giả : Daniel Ace</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">78</span>
                                                    </div>
                                                    <div className="iq-progress-bar-linear d-inline-block w-100">
                                                        <div className="iq-progress-bar iq-bg-info">
                                                            <span className="bg-info" data-percent="78"></span>
                                                        </div>
                                                    </div>
                                                    <Link to="#" className="text-dark">Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative">
                                                    <Link to="#">
                                                        <img src="images/favorite/04.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">Economix- Các Nền Kinh Tế Vận Hành</h5>
                                                    <p className="mb-2">Tác giả : Luka Afton</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">90</span>
                                                    </div>
                                                    <div className="iq-progress-bar-linear d-inline-block w-100">
                                                        <div className="iq-progress-bar iq-bg-success">
                                                            <span className="bg-success" data-percent="90"></span>
                                                        </div>
                                                    </div>
                                                    <Link to="#" className="text-dark">Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        </div >
        <Footer />
    </>
}
export default productDetail;