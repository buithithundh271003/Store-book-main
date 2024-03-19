import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IOrder from "../../interface/order";

interface initialState {
    orders: IOrder[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
    orders: [],
    loading: false,
    error: "",
};

export const getAllOrder = createAsyncThunk(
    "orders/getOrders",
    async (query?: string) => {
        console.log(query);
        const {
            data: { orders }
        } = await axios.get<{ orders: IOrder[] }>(
            `http://localhost:8080/api/orders/${query ?? ""}`
        );
        return orders;
    }
);

export const getOrder = createAsyncThunk(
    "order/getOrder",
    async (query?: string) => {
        console.log(query);
        const {
            data: { order }
        } = await axios.get<{ order: IOrder[] }>(
            `http://localhost:8080/api/orders/${query ?? ""}`
        );
        return order;
    }
);

export const createOrder = createAsyncThunk(
    "orders/addOrders",
    async (order: IOrder) => {
        const { data } = await axios.post<{ order: IOrder }>(
            "http://localhost:8080/api/orders",
            order
        );

        return data;
    }
);

export const updateOrder = createAsyncThunk(
    "orders/updateOrders",
    async (order: IOrder) => {
        const { data } = await axios.patch<{ order: IOrder }>(
            `http://localhost:8080/api/orders/${order._id!}`,
            order
        );
        return data;
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        getOrderByCate: (state, action) => {
            state.orders = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(getAllOrder.rejected, (state) => {
                state.loading = false;
            })
            // Get Order
            .addCase(getOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loading = false;
            })
            .addCase(getOrder.rejected, (state) => {
                state.loading = false;
            })
            // Add Product
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createOrder.rejected, (state) => {
                state.loading = false;
            })
            // Update Product
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.orders = state.orders?.map((order: IOrder) =>
                    order._id === action?.payload?.order?._id
                        ? action.payload.order
                        : order
                );
                state.loading = false;
            })
            .addCase(updateOrder.rejected, (state) => {
                state.loading = false;
            })
    },
});

export const { getOrderByCate } = orderSlice.actions;
export default orderSlice.reducer;

