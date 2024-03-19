import {
    Space,
    Table,
    message,
    Popconfirm,
    Spin,
    Image,
    Button,
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAllProduct, removeProduct } from '../../../redux/Reducer/ProductSlice';
import ICategory from '../../../interface/category';
import { useForm } from 'react-hook-form';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    _id: string,
    name: string,
    images: any[],
    price: number,
    quantity: number,
    discount: number,
    categoryId: string,
}

const productPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useAppSelector((state) => state.Product.products);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        setIsLoading(true);
        void dispatch(getAllProduct()).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
    }, [dispatch]);
    const [messageApi, contextHolder] = message.useMessage();

    const urlParams = new URLSearchParams(location.search);

    const handFound = (e: any) => {
        const searchText = e._searchText;

        urlParams.set("_searchText", encodeURIComponent(searchText));
        console.log("searchText:", searchText);

        const queryString = `${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;

        navigate(`?${queryString}`);
        setIsLoading(true);
        void dispatch(getAllProduct(queryString)).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
    };

    const confirm = async (id: string) => {
        await dispatch(removeProduct(id));
        messageApi.open({
            type: 'success',
            content: 'Delete category successfully!',
        });
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            key: 'name',
            render: (record: any) => (
                <div className="flex items-center  ">
                    <Image
                        width={70}
                        src={record.images[0]}
                        alt="Product Image"
                        className=""
                    />
                    <a className='w-full overflow-hidden'>{record.name}</a>
                </div>
            ),
            sorter: (a: any, b: any) => a.name.localeCompare(b.name), // Sắp xếp theo bảng chữ cái
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
            className: 'w-1/4',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            sorter: (a: any, b: any) => a.price - b.price, // Sắp xếp theo số
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            sorter: (a: any, b: any) => a.discount - b.discount, // Sắp xếp theo số
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a: any, b: any) => a.quantity - b.quantity, // Sắp xếp theo số
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "categoryId",
            render: (cate: ICategory) => <span>{cate?.name}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(record._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "text-white bg-blue-400" }}
                    >
                        <DeleteFilled className='text-xl text-red-400' />
                    </Popconfirm>
                    <Link to={`/admin/product/update/${record._id}`}>
                        <EditFilled className='text-xl text-yellow-400' />
                    </Link>
                </Space>
            ),
        },

    ];

    const data: DataType[] = products.map((product: any) => ({
        _id: product._id,
        name: product.name,
        images: product.images,
        price: product.price,
        quantity: product.quantity,
        discount: product.discount,
        categoryId: product.categoryId,
    }));
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="">
            {contextHolder}
            <Space className='flex justify-between mb-5'>
                <div className="">
                    <span className="block text-xl text-primary">
                        Product List
                    </span>
                    <span className="block text-base  text-primary">
                        Manage your products
                    </span>
                </div>
                <Link to={`add`}>
                    <Button type='primary' className='bg-primary'
                        icon={<PlusOutlined />}
                    >
                        Add New Product
                    </Button>
                </Link>
            </Space>
            <div className="border p-3 rounded-lg min-h-screen bg-white">
                <div className="pb-6 pt-3">
                    <form onSubmit={handleSubmit(handFound)} >
                        <input type="text" className='border p-2 w-64 outline-none '
                            {...register("_searchText")}
                            placeholder="" />
                        <button type="submit" className='p-2 bg-primary'>
                            <SearchOutlined className='text-white' />
                        </button>
                    </form>
                </div>
                {isLoading ? (
                    <div className="text-center ">
                        <Spin size="large" />
                    </div>

                ) : (
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} />
                )}
            </div>
        </div>
    )
}
export default productPage;