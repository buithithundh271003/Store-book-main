import { object } from "joi";
import Category from "../models/category";
import Product from "../models/product";
import { productSchema } from "../schemas/product"

// ADD PRODUCT
export const addProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        const product = await Product.create(req.body);
        if (!product) {
            return res.status(404).json({
                message: "Couldn't find a product to add."
            })
        }

        // Push product to category
        await Category.findByIdAndUpdate(product.categoryId, {
            $push: {
                products: product._id
            }
        });

        return res.status(200).json({
            message: "Add product successfully!",
            product
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// GET LIST PRODUCTS
export const getProducts = async (req, res) => {
    try {
        const {
            _page = 1,
            _limit = 8,
            _sort = "createdAt",
            _order = "desc",
            _searchText,
            _minPrice,
            _maxPrice
        } = req.query;

        let query = {};
        if (_searchText) {
            query.$text = {
                $search: _searchText,
                $caseSensitive: false,
                $diacriticSensitive: false,
            }
        }
        if (_minPrice !== undefined && _maxPrice !== undefined) {
            query.price = { $gte: _minPrice, $lte: _maxPrice }
        }
        if (Object.keys(query).length && _searchText && _minPrice && _maxPrice) {
            query = {
                $and: [
                    {
                        $text: {
                            $search: _searchText,
                            $caseSensitive: false,
                            $diacriticSensitive: false,
                        },
                    },
                    {
                        price: { $gte: _minPrice, $lte: _maxPrice },
                    }
                ]
            }
        }
        const myCustomLabels = {
            docs: "data",
        };

        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order === "desc" ? -1 : 1,
            },
            customLabels: myCustomLabels
        };

        const products = await Product.paginate(query, {
            ...options,
            populate: [{ path: "categoryId", select: "name" }]
        });

        if (products.length === 0) {
            return res.status(404).json({
                message: "There are no product in the list.",
            });
        }

        return res.status(200).json({
            message: "Get product list successfully!",
            products,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

// GET ONE PRODUCT
export const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "There are no product in the list.",
            });
        }
        return res.status(200).json({
            message: "Get product successfully!",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            erorr: error.message,
        });
    }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { categoryId } = req.body;
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }

        // Tìm ra sản phẩm cần cập nhật
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found!",
            });
        }

        // Kiểm tra xem danh mục mới có tồn tại không
        const newCategory = await Category.findById(categoryId);
        if (!newCategory) {
            return res.status(404).json({
                message: "Category not found!",
            });
        }

        // Kiểm tra xem danh mục cũ có tồn tại hay không
        // Nếu có thì xóa danh mục cũ, thêm id sản phẩm vào danh mục mới
        const oldCategory = await Category.findById(product.categoryId);
        if (oldCategory) {
            oldCategory.products.pull(id);
            await oldCategory.save();

            // Thêm id của sản phẩm vào danh mục mới
            newCategory.products.push(id);
            await newCategory.save();
        } else {
            return res.status(404).json({
                message: "Old category not found!",
            });
        }

        // Cập nhật sản phẩm
        const productUpdated = await Product.findByIdAndUpdate(
            id,
            { ...req.body, categoryId },
            {
                new: true,
            }
        );
        return res.status(200).json({
            message: "Update product successfully!",
            productUpdated,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found!",
            });
        }

        // Tìm danh mục của sản phẩm cần xóa
        // Xóa id sản phẩm khỏi danh mục đó
        const category = await Category.findByIdAndUpdate(product.categoryId);
        category.products.pull(id);
        await category.save();

        // xóa sản phẩm
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Delete product successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};