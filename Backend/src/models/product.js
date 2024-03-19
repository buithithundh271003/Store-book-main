import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        price: { type: Number, required: true, min: 0 },
        author: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        quantity: { type: Number, required: true, min: 0 },
        buyCounts: { type: Number, required: false, default: 0 },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        images: [
            {
                type: Object,
                required: true,
            },
        ],
        isSale: {
            status: {
                type: Boolean,
                default: false
            },
            percent: {
                type: Number,
                default: 0
            },
            end: {
                type: Date
            }
        },
        rating: {
            total: {
                type: Number,
                require: false,
                default: 0
            },
            items: [
                {
                    byUser: {
                        type: String
                    },
                    content: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }

                }
            ]
        }
    },
    { timestamps: true, versionKey: false }
);
productSchema.index({
    name: "text",
    author: "text",
});
productSchema.plugin(paginate);
export default mongoose.model("Product", productSchema);