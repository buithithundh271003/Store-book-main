interface IOrderDetail {
    _id?: string;
    orderId?: string;
    productId: string;
    price: number;
    quantity: number;
    totalMoney: number;
}

export default IOrderDetail;