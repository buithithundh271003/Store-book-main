import IOrderDetail from "./orderDetail";

interface IOrder {
    createdAt: any;
    _id?: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    note: string;
    status: number;
    vourcher_code?: string;
    pay_method: string;
    totalMoney: number;
    orderDetail?: IOrderDetail[]
}

export default IOrder;