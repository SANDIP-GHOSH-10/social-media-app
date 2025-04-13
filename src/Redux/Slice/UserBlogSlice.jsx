import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:1000/userBlog';

// Fetch all blogs
export const fetchBlog = createAsyncThunk('blog/fetchBlogs', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add a new blog
export const addBlog = createAsyncThunk('blog/addBlog', async (data) => {
  const res = await axios.post(API_URL, data); // Should include title, description, email, createdAt
  return res.data;
});

// Delete blog by id
export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Update blog
export const updateBlog = createAsyncThunk('blog/updateBlog', async ({ id, updatedBlog }) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedBlog); // updatedBlog includes updatedAt
  return res.data;
});

// Get a single blog
export const singleBlog = createAsyncThunk('blog/singleBlog', async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
});

const UserBlogSlice = createSlice({
  name: 'UserBlog',
  initialState: {
    userBlogData: [],
    selectedBlog: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBlogData = action.payload;
        state.error = null;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.userBlogData.push(action.payload);
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.userBlogData = state.userBlogData.filter((blog) => blog.id !== action.payload);
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.userBlogData.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.userBlogData[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(singleBlog.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
        state.error = null;
      });
  },
});

export default UserBlogSlice.reducer;









