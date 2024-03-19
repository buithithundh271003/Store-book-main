import Category from "../models/category";
import Product from "../models/product";
import { categorySchema } from "../schemas/category"

// ADD CATEGORY
export const addCategory = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        const category = await Category.create(req.body);
        if (!category) {
            return res.status(404).json({
                message: "Couldn't find a category to add."
            })
        }
        return res.status(200).json({
            message: "Add category successfully!",
            category
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// GET LIST CATEGORIES 
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories.length === 0) {
            return res.status(404).json({
                message: "There are no category in the list."
            })
        }
        return res.status(200).json({
            message: "Get category list successfully!",
            categories,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// GET ONE CATEGORY
export const getCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id).populate("products");
        if (!category) {
            return res.status(404).json({
                message: "There are no category in the list.",
            });
        }
        return res.status(200).json({
            message: "Get category successfully!",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            erorr: error.message,
        });
    }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = categorySchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({
                message: "No category found to update.",
            });
        }
        return res.status(200).json({
            message: "Update category successfully!",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            erorr: error.message,
        });
    }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ _id: id });

        // Kiểm tra xem category có tồn tại không
        if (!category) {
            return res.status(404).json({
                message: "Category doesn't exits!",
            });
        }

        //  Tìm và chuyển các sản phẩm liên quan sang danh mục "Uncategorized"
        const productsToUpdate = await Product.find({ categoryId: id });

        // Tìm xem đã có danh mục Uncategorized trong db chưa
        const uncategorizedCategory = await Category.findOne({
            name: "Uncategorized",
        });

        // Cập nhật categoryId của các sản phẩm thuộc category đang chuẩn bị được xóa sang id của "Uncategorized"
        if (uncategorizedCategory) {
            await Product.updateMany(
                {
                    categoryId: id,
                },
                { categoryId: uncategorizedCategory._id }
            );

            // Cập nhật mảng products của danh mục "Uncategorized"
            await Category.findByIdAndUpdate(uncategorizedCategory._id, {
                $push: {
                    products: {
                        $each: productsToUpdate.map((product) => product._id),
                    },
                },
            });
        } else {
            // Nếu chưa có danh mục "Uncategorized" thì tạo mới
            const newUncategorizedCategory = await Category.create({
                name: "Uncategorized",
            });

            // Cập nhật categoryId của các sản phẩm thuộc category đang chuẩn bị được xóa sang id của "Uncategorized"
            await Product.updateMany(
                {
                    categoryId: id,
                },
                { categoryId: newUncategorizedCategory._id }
            );

            // Cập nhật mảng products của danh mục "Uncategorized"
            await Category.findByIdAndUpdate(newUncategorizedCategory._id, {
                $push: {
                    products: {
                        $each: productsToUpdate.map((product) => product._id),
                    },
                },
            });
        }

        // Xóa danh mục sản phẩm
        await Category.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Delete category successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            erorr: error.message,
        });
    }
};




