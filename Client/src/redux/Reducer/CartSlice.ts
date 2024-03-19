import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ICart from "../../interface/cart";

interface initialState {
    carts: ICart[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
    carts: [],
    loading: false,
    error: "",
};

export const getAllCart = createAsyncThunk(
    "carts/getCarts",
    async (query?: string) => {
        const {
            data: { carts }
        } = await axios.get<{ carts: ICart[] }>(
            `http://localhost:8080/api/carts/${query ?? ""}`
        );
        return carts;
    }
);

export const createCart = createAsyncThunk(
    "carts/addCarts",
    async (cart: ICart) => {
        const { data } = await axios.post<{ cart: ICart }>(
            "http://localhost:8080/api/carts",
            cart
        );

        return data;
    }
);

export const updateCart = createAsyncThunk(
    "carts/updateCarts",
    async (cart: ICart) => {
        const { data } = await axios.patch<{ cart: ICart }>(
            `http://localhost:8080/api/carts/${cart._id!}`,
            cart
        );
        return data;
    }
);

export const removeCart = createAsyncThunk(
    "carts/removeCarts",
    async (id: string) => {
        await axios.delete(`http://localhost:8080/api/carts/${id}`);

        return id;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCartByCate: (state, action) => {
            state.carts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCart.fulfilled, (state, action) => {
                state.carts = action.payload;
                state.loading = false;
            })
            .addCase(getAllCart.rejected, (state) => {
                state.loading = false;
            })
            // Add Product
            .addCase(createCart.pending, (state) => {
                state.loading = true;
            })
            // .addCase(createCart.fulfilled, (state) => {
            //     state.loading = false;
            // })
            .addCase(createCart.rejected, (state) => {
                state.loading = false;
            })

            .addCase(createCart.fulfilled, (state, action) => {
                state.loading = false;

                const newItem = action.payload.data;

                // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                const checkItem = state.carts.findIndex(item => item.productId === newItem.productId);

                if (checkItem !== -1) {
                    // Sản phẩm đã tồn tại, cập nhật số lượng
                    state.carts[checkItem].quantity = newItem.quantity;
                } else {
                    // Sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                    state.carts = [...state.carts, newItem];
                }
            })
            // Update Product
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.carts = state.carts?.map((cart: ICart) =>
                    cart._id === action?.payload?.cart?._id
                        ? action.payload.cart
                        : cart
                );
                state.loading = false;
            })
            .addCase(updateCart.rejected, (state) => {
                state.loading = false;
            })
            // Delete Product
            .addCase(removeCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.carts = state.carts?.filter(
                    (cart: ICart) => cart._id !== action.payload
                );

                state.loading = false;
            })
            .addCase(removeCart.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { getCartByCate } = cartSlice.actions;
export default cartSlice.reducer;

