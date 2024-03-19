import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import ICategory from "../../interface/category";

interface initState {
    categories: ICategory[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initState = {
    categories: [],
    loading: false,
    error: "",
}

export const getAllCategory = createAsyncThunk(
    "category/getCategory",
    async () => {
        const { data } = await axios.get<{ categories: ICategory[] }>(
            "http://localhost:8080/api/categories"
        );
        return data.categories;
    }
);

export const createCatetgory = createAsyncThunk(
    "category/createCatetgory",
    async (category: ICategory) => {
        const { data } = await axios.post<{ category: ICategory }>(
            "http://localhost:8080/api/categories",
            category
        );
        return data;
    }
);

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (category: ICategory) => {
        const { data } = await axios.patch<{ category: ICategory }>(
            `http://localhost:8080/api/categories/${category._id!}`,
            category
        );
        return data;
    }
);

export const removeCategory = createAsyncThunk(
    "category/removeCategory",
    async (id: string) => {
        await axios.delete(`http://localhost:8080/api/categories/${id}`);
        return id;
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(getAllCategory.rejected, (state) => {
                state.loading = false;
            })

            // Add category
            .addCase(createCatetgory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCatetgory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createCatetgory.rejected, (state) => {
                state.loading = false;
            })

            // Update category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.loading = false;
            })

            // Delete Category
            .addCase(removeCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.categories = state.categories?.filter(
                    (category: ICategory) => category._id !== action.payload
                )
                state.loading = false;
            })
            .addCase(removeCategory.rejected, (state) => {
                state.loading = false;;
            })
    }
})

export default categorySlice.reducer;