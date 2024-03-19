import Header from "../../../compoment/header.jsx";
import Footer from "../../../compoment/footer.tsx";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook.ts";
import { useEffect } from "react";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice.ts";

const homePage = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.Product.products);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
    }, [dispatch]);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
    }, []);
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Gợi ý cho bạn</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to={`/products`} className="btn btn-sm btn-primary view-more">Xem Thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <div className="row">
                                        {products.map((product) => {
                                            return <>
                                                <div className="col-sm-6 col-md-4 col-lg-3">
                                                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height browse-bookcontent">
                                                        <div className="iq-card-body p-0">
                                                            <div className="d-flex align-items-center">
                                                                <div className="col-6 p-0 position-relative image-overlap-shadow">
                                                                    <Link to=""><img className="img-fluid rounded w-100" src={product.images} alt="" /></Link >
                                                                    <div className="view-book">
                                                                        <Link to={`/products/${product._id}`} className="btn btn-sm btn-white">Mua Ngay</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="mb-2">
                                                                        <h6 className="mb-1">{product.name}</h6>
                                                                        <p className="font-size-13 line-height mb-1">{product.author}</p>
                                                                        <div className="d-block line-height">
                                                                            <span className="font-size-11 text-warning">
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price d-flex align-items-center">
                                                                        <h6><b>{product.price} đ</b></h6>
                                                                    </div>
                                                                    <div className="iq-product-action">
                                                                        <Link to="#"><i className="ri-shopping-cart-2-fill text-primary"></i></Link>
                                                                        <Link to="#" className="ml-2"><i className="ri-heart-fill text-danger"></i></Link>
                                                                    </div>
                                                                </div>
                                                            </div >
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-6">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between mb-0">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Best Seller</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                            <span className="dropdown-toggle p-0 text-body" id="dropdownMenuButton2" data-toggle="dropdown">
                                                Trong ngày<i className="ri-arrow-down-s-fill"></i>
                                            </span>
                                            <div className="dropdown-menu dropdown-menu-right shadow-none" aria-labelledby="dropdownMenuButton2">
                                                <Link className="dropdown-item" to="#">Ngày</Link>
                                                <Link className="dropdown-item" to="#">Tuần</Link>
                                                <Link className="dropdown-item" to="#">Tháng</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <div className="row align-items-center">
                                        <div className="col-sm-5 pr-0">
                                            <Link to="#"><img className="img-fluid rounded w-100" src="src/style/images/new_realeases/img01.jpg" alt="" /></Link >
                                        </div>
                                        <div className="col-sm-7 mt-3 mt-sm-0">
                                            <h4 className="mb-2">Payback Time <br /> Ngày Đòi Nợ</h4>
                                            <p className="mb-2">Tác Giả : Phill Town</p>
                                            <div className="mb-2 d-block">
                                                <span className="font-size-12 text-warning">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </span>
                                            </div>
                                            <span className="text-dark mb-3 d-block">NGÀY ĐÒI NỢ – Payback Time
                                                “Một cuộc sống hạnh phúc được bắt đầu từ những quyết định đầu tư khôn ngoan”</span>
                                            <button className="btn btn-primary learn-more">Xem thêm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between mb-0">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Nhà Sách TV</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                            <span className="dropdown-toggle p-0 text-body" id="dropdownMenuButton3" data-toggle="dropdown">
                                                Ngày<i className="ri-arrow-down-s-fill"></i>
                                            </span>
                                            <div className="dropdown-menu dropdown-menu-right shadow-none" aria-labelledby="dropdownMenuButton3">
                                                <Link className="dropdown-item" to="#">Tuần</Link>
                                                <Link className="dropdown-item" to="#">Theo Tháng</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <ul className="list-inline row mb-0 align-items-center iq-scrollable-block">
                                        <li className="col-sm-6 d-flex mb-3 align-items-center">
                                            <div className="icon iq-icon-box mr-3">
                                                <Link to="#"><img className="img-fluid avatar-60 rounded-circle" src="src/style/images/user/1.jpg" alt="" /></ Link>
                                            </div>
                                            <div className="mt-1">
                                                <h6>Kinh Tế</h6>
                                                <p className="mb-0 text-primary">Publish Books: <span className="text-body">2831</span></p>
                                            </div>
                                        </li>
                                        <li className="col-sm-6 d-flex mb-3 align-items-center">
                                            <div className="icon iq-icon-box mr-3">
                                                <Link to="#"><img className="img-fluid avatar-60 rounded-circle" src="src/style/images/user/1.jpg" alt="" /></ Link>
                                            </div>
                                            <div className="mt-1">
                                                <h6>Văn Học</h6>
                                                <p className="mb-0 text-primary">Publish Books: <span className="text-body">432</span></p>
                                            </div>
                                        </li>
                                        <li className="col-sm-6 d-flex mb-3 align-items-center">
                                            <div className="icon iq-icon-box mr-3">
                                                <Link to="#"><img className="img-fluid avatar-60 rounded-circle" src="src/style/images/user/1.jpg" alt="" /></ Link>
                                            </div>
                                            <div className="mt-1">
                                                <h6>Tâm Lý - Kĩ Năng Sống</h6>
                                                <p className="mb-0 text-primary">Publish Books: <span className="text-body">5471</span></p>
                                            </div>
                                        </li>
                                        <li className="col-sm-6 d-flex mb-3 align-items-center">
                                            <div className="icon iq-icon-box mr-3">
                                                <Link to="#"><img className="img-fluid avatar-60 rounded-circle" src="src/style/images/user/1.jpg" alt="" /></Link >
                                            </div>
                                            <div className="mt-1">
                                                <h6>Sách Giáo Khoa</h6>
                                                <p className="mb-0 text-primary">Publish Books: <span className="text-body">8764</span></p>
                                            </div>
                                        </li>
                                        <li className="col-sm-6 d-flex mb-3 align-items-center">
                                            <div className="icon iq-icon-box mr-3">
                                                <Link to="#"><img className="img-fluid avatar-60 rounded-circle" src="src/style/images/user/1.jpg" alt="" /></ Link>
                                            </div>
                                            <div className="mt-1">
                                                <h6>Chính trị – pháp luật</h6>
                                                <p className="mb-0 text-primary">Publish Books: <span className="text-body">8987</span></p>
                                            </div>
                                        </li>
                                        <li className="col-sm-6 d-flex mb-3 align-items-center">
                                            <div className="icon iq-icon-box mr-3">
                                                <Link to="#"><img className="img-fluid avatar-60 rounded-circle" src="src/style/images/user/1.jpg" alt="" /></ Link>
                                            </div>
                                            <div className="mt-1">
                                                <h6>Khoa Học - Công Nghệ </h6>
                                                <p className="mb-0 text-primary">Publish Books: <span className="text-body">2831</span></p>
                                            </div>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Sách yêu thích</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to="category.html" className="btn btn-sm btn-primary view-more">Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body favorites-contens">
                                    <ul id="favorites-slider" className="list-inline p-0 mb-0 row">
                                        <li className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <div className="col-5 p-0 position-relative">
                                                    <Link to="#">
                                                        <img src="src/style/images/favorite/01.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">D. Trump - Nghệ Thuật Đàm Phán</h5>
                                                    <p className="mb-2">Tác giả : Pedro Araez</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">69</span>
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
                                                        <img src="src/style/images/favorite/02.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">Một Đời Quản Trị</h5>
                                                    <p className="mb-2">Tác giả : Michael klock</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">450</span>
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
                                                        <img src="src/style/images/favorite/03.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">Người Bán Hàng Vĩ Đại Nhất Thế Giới</h5>
                                                    <p className="mb-2">Tác giả : Daniel Ace</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">79</span>
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
                                                        <img src="src/style/images/favorite/04.jpg" className="img-fluid rounded w-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="col-7">
                                                    <h5 className="mb-2">Economix- Các Nền Kinh Tế Vận Hành</h5>
                                                    <p className="mb-2">Tác giả : Luka Afton</p>
                                                    <div className="d-flex justify-content-between align-items-center text-dark font-size-13">
                                                        <span>Đã bán</span>
                                                        <span className="mr-4">900</span>
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
            <Footer />
        </div >

    </>
}
export default homePage;