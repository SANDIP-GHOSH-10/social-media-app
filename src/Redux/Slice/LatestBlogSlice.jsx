import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:1000/latestBlog";

//fetch blogs
export const latestBlog = createAsyncThunk('blog/latestBlog', async () => {
    const response = await axios.get(API_URL);
    console.log("Axios response for getApi: ", response);
    return response?.data;
});

//single blogs
export const singleLatestBlog = createAsyncThunk('blog/singleLatestBlog', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

const initial_value = { 
    isLoading: false, error: null, Blog: [], singleBlog:[]

}

export const fetchLatestBlog = createSlice({
    name: 'blog',
    initialState: initial_value,
    //read
    extraReducers: (builder) => {
        builder.addCase(latestBlog.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(latestBlog.fulfilled, (state, action) => {
            // console.log("Action for fullfilled:", action);
            state.isLoading = false;
            state.Blog = action.payload;
            state.error = null;
        })

        builder.addCase(latestBlog.rejected, (state, action) => {
            // console.log("Action for reject:", action);
            state.isLoading = false;
            state.error = action.error.message;
        })

        //single
        builder.addCase(singleLatestBlog.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(singleLatestBlog.fulfilled, (state, action) => {
            // console.log("Action for fullfilled:", action);
            state.isLoading = false;
            state.singleBlog = action.payload;
            state.error = null;
        })

        builder.addCase(singleLatestBlog.rejected, (state, action) => {
            // console.log("Action for reject:", action);
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export default fetchLatestBlog.reducer;