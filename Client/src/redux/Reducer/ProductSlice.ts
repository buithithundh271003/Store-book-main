import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IProduct from "../../interface/product";

interface initialState {
    products: IProduct[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
    products: [],
    loading: false,
    error: "",
};

export const getAllProduct = createAsyncThunk(
    "products/getProducts",
    async (query?: string) => {
        console.log(query);
        const {
            data: { products }
        } = await axios.get<{ products: IProduct[] }>(
            `http://localhost:8080/api/products${query ?? ""}`
        );
        return products;
    }
);
 
export const createProduct = createAsyncThunk(
    "products/addProducts",
    async (product: IProduct) => {
        const { data } = await axios.post<{ product: IProduct }>(
            "http://localhost:8080/api/products",
            product
        );

        return data;
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProducts",
    async (product: IProduct) => {
        const { data } = await axios.patch<{ product: IProduct }>(
            `http://localhost:8080/api/products/${product._id!}`,
            product
        );
        return data;
    }
);

export const removeProduct = createAsyncThunk(
    "products/removeProducts",
    async (id: string) => {
        await axios.delete(`http://localhost:8080/api/products/${id}`);

        return id;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductByCate: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.loading = false;
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.loading = false;
            })
            // Add Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createProduct.rejected, (state) => {
                state.loading = false;
            })
            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.products = state.products?.map((product: IProduct) =>
                    product._id === action?.payload?.product?._id
                        ? action.payload.product
                        : product
                );
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state) => {
                state.loading = false;
            })
            // Delete Product
            .addCase(removeProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.products = state.products?.filter(
                    (product: IProduct) => product._id !== action.payload
                );

                state.loading = false;
            })
            .addCase(removeProduct.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { getProductByCate } = productSlice.actions;
export default productSlice.reducer;

