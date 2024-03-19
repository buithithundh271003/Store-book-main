import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initialState {
    auth: any;
    loading: boolean;
    error: string | undefined;

}

const initialState: initialState = {
    auth: null,
    loading: false,
    error: "",
};

export const handleLogin = createAsyncThunk(
    "auth/Login",
    async (user: { email: string; password: string }) => {
        const { data } = await axios.post<{ user: any }>(
            "http://localhost:8080/api/signin",
            user
        );

        return data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authLogout: (state) => {
            state.auth = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.auth = action.payload;
        });
        builder.addCase(handleLogin.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
