import Cart from "../models/cart";
export const getAll = async (req, res) => {
    try {
        // const { docs: carts } = await Cart.paginate(optinos);
        const Allcarts = await Cart.find()
        const carts = Allcarts.filter(cart => cart.userId === req.params.id)
        if (!carts) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Get product list successfully!",
            carts
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate(
            "productId",
            "cart"
        );
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Cart found successfully",
            cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const cart = await Cart.findOne({ productId: req.body.productId })
        if (cart) {
            const newQuantity = cart.quantity + req.body.quantity
            const newTotalMoney = cart.totalMoney + req.body.totalMoney
            const newCart = await Cart.findOneAndUpdate(
                { productId: req.body.productId },
                { quantity: newQuantity, totalMoney: newTotalMoney },
                { new: true }
            );
            if (!newCart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }
            return res.status(200).json({
                message: "Cart created successfully",
                data: newCart,
            });
        } else {
            const cart = await Cart.create(req.body);
            if (!cart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }
            return res.status(200).json({
                message: "Cart created successfully",
                data: cart,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "Cart delete successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

