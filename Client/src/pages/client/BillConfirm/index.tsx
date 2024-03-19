import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../compoment/footer"
import Header from "../../../compoment/header"
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import IOrder from "../../../interface/order";
import { useEffect, useState } from "react";
import { getAllOrder, getOrder } from "../../../redux/Reducer/OrderSlice";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import IProduct from "../../../interface/product";

const BillConfirm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState()


    const { id } = useParams();

    const order = useAppSelector((state) => state.Order.order);

    const products = useAppSelector((state) => state.Product.products);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getOrder(id))
        dispatch(getAllProduct())
        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, []);
    // useEffect(() => {
    //     // setIsLoading(true);
    //     dispatch(getOrder(id))
    //     dispatch(getAllProduct())
    //     const userStore = JSON.parse(localStorage.getItem("user")!)
    //     if (userStore) {
    //         setUser(userStore)
    //     }
    // }, [dispatch]);


    // const order = orders?.find((order: IOrder) => order._id === id);

    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                {/* <div className="container-fluid">
                    <div className="row"> */}
                <div className="flex justify-center pt-10">
                    <div className="w-[800px] rounded-lg shadow-md p-7 border">
                        <div className="flex justify-between">
                            <div className="">
                                <span className="text-2xl font-bold">Invoice #0472</span>
                            </div>
                            <div className="text-end">
                                <div className="flex justify-end pb-3">
                                    <img className="w-24 object-cover" src="../../../public/Image/logo.webp" alt="" />
                                </div>
                                <span className="block font-semibold text-lg p-1">
                                    NHASACHTV
                                </span>
                                <span className="block p-1">
                                    13 Trinh Van Bo,Phuong Canh, Nam Tu Lien, HN
                                </span>
                                <span className="block p-1">
                                    0123 456 789
                                </span>
                                <span className="block p-1">
                                    August 1, 2023
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <span className="block font-semibold text-lg">
                                Bill to
                            </span>
                            <span className="block p-1">
                                {order?.fullName}
                            </span>
                            <span className="block p-1">
                                {order?.address}
                            </span>
                            <span className="block p-1">
                                {order?.phoneNumber}
                            </span>
                        </div>

                        <div className="relative overflow-x-auto mt-3">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Item
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.orderDetails?.map(item => {
                                        const product = products.find((product: IProduct) => product._id === item.productId)
                                        return <>

                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex w-4/5 items-center">
                                                        <div className="">
                                                            <img className="w-14 object-cover rounded-full" src={product?.images} alt="" />
                                                        </div>
                                                        <div className="flex flex-col  ml-3 flex-grow">
                                                            <span className="font-bold text-sm">
                                                                {product?.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.price}đ
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.totalMoney}đ
                                                </td>
                                            </tr>
                                        </>
                                    })}

                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end mt-5">
                            <div className="w-3/5 ">
                                <div className="flex justify-between py-1">
                                    <span>SUBTOTAL</span>
                                    <span>{order?.totalMoney - 40000}đ</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span>PAYMENT METHODS</span>
                                    <span>{order?.pay_method}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span>SHIPPING</span>
                                    <span>40000đ</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-bold">TOTAL</span>
                                    <span className="font-bold">{order?.totalMoney}đ</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* </div>
                </div> */}
                <Link to="/" className="flex font-semibold text-indigo-600 text-sm px-10">
                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                        <path
                            d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                </Link>
            </div>
            <Footer />
        </div>
    </>
}
export default BillConfirm