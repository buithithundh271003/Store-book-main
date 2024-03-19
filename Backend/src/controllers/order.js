import Order from '../models/order'
import OrderDetail from '../models/order_detail'
import Product from '../models/product'
import Cart from '../models/cart'

export const getAll = async (req, res) => {
    const {
        _page = 1,
        _limit = 100,
        _sort = "createdAt",
        _order = "desc",
        _search
    } = req.query;

    const searchQuery = {};
    if (_search) {
        searchQuery.name = { $regex: _search, $options: "i" };
    }
    const optinos = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? "-1" : "1",
        },
    };
    try {
        const { docs: orders } = await Order.paginate(searchQuery, optinos);
        if (!orders) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json({
            message: "Get product list successfully!",
            orders
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const get = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "orderDetails"
        );
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json({
            message: "Get product list successfully!",
            order
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const { userId, fullName, phoneNumber, address, vourcher_code, note, pay_method, totalMoney, carts } = req.body
        const newOrder = { userId, fullName, phoneNumber, address, vourcher_code, note, pay_method, totalMoney }
        const order = await Order.create(newOrder);
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        const orderDetails = carts.map(({ productId, price, quantity, totalMoney }) => ({
            orderId: order._id,
            productId,
            price,
            quantity,
            totalMoney
        }));
        await orderDetails.forEach(async (newOrderDetail) => {
            const orderDetail = await OrderDetail.create(newOrderDetail)
            if (!orderDetail) {
                return res.status(404).json({
                    message: "orderDetail not found",
                });
            }
            await Order.findByIdAndUpdate(orderDetail.orderId, {
                $addToSet: {
                    orderDetails: orderDetail._id,
                },
            });
            const product = await Product.findById({ _id: orderDetail.productId })
            await Product.findByIdAndUpdate(
                { _id: orderDetail.productId },
                {
                    buyCounts: product.buyCounts + orderDetail.quantity,
                    quantity: product.quantity - orderDetail.quantity
                },
                { new: true }
            )
        });
        const allCart = await Cart.find()
        const userCart = await allCart.filter(cart => cart.userId === newOrder.userId)
        await userCart.forEach(async item => {
            await Cart.findOneAndDelete({ _id: item._id })
        })
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const update = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
