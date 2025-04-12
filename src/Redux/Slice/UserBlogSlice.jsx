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




































// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'http://localhost:1000/userBlog';

// // Fetch all blogs
// export const fetchBlog = createAsyncThunk('blog/fetchBlogs', async () => {
//   const res = await axios.get(API_URL);
//   return res.data;
// });

// // Add a new blog
// export const addBlog = createAsyncThunk('blog/addBlog', async (data) => {
//   const res = await axios.post(API_URL, data); // Includes title, description, and email
//   return res.data;
// });

// // Delete blog by id
// export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id) => {
//   await axios.delete(`${API_URL}/${id}`);
//   return id;
// });

// // Update blog
// export const updateBlog = createAsyncThunk('blog/updateBlog', async ({ id, updatedBlog }) => {
//   const res = await axios.put(`${API_URL}/${id}`, updatedBlog);
//   return res.data;
// });

// // Get a single blog
// export const singleBlog = createAsyncThunk('blog/singleBlog', async (id) => {
//   const res = await axios.get(`${API_URL}/${id}`);
//   return res.data;
// });

// const UserBlogSlice = createSlice({
//   name: 'UserBlog',
//   initialState: {
//     userBlogData: [],
//     selectedBlog: null,
//     isLoading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBlog.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchBlog.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.userBlogData = action.payload;
//       })
//       .addCase(fetchBlog.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addBlog.fulfilled, (state, action) => {
//         state.userBlogData.push(action.payload);
//       })
//       .addCase(deleteBlog.fulfilled, (state, action) => {
//         state.userBlogData = state.userBlogData.filter((blog) => blog.id !== action.payload);
//       })
//       .addCase(updateBlog.fulfilled, (state, action) => {
//         const index = state.userBlogData.findIndex((b) => b.id === action.payload.id);
//         if (index !== -1) {
//           state.userBlogData[index] = action.payload;
//         }
//       })
//       .addCase(singleBlog.fulfilled, (state, action) => {
//         state.selectedBlog = action.payload;
//       });
//   },
// });

// export default UserBlogSlice.reducer;





























// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:1000/userBlog";
// //Create
// export const addBlog = createAsyncThunk("todo/addBlogs",
//     async (data) => {
//         const res = await axios.post(API_URL, data)
//         console.log("Axios response for posts api:", res);
//         return res?.data;
//     }
// )
// //Read
// export const fetchBlog = createAsyncThunk('todo/fetchBlog', async () => {
//     const response = await axios.get(API_URL);
//     console.log("Axios response for getApi: ", response);
//     return response?.data;
// });
// //Update
// export const updateBlog = createAsyncThunk('todo/updateBlog', async (updatedTodo) => {
//     // const { id, ...fields } = updatedTodo;
//     const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
//     return response.data;
// });
// //Delete
// export const deleteBlog = createAsyncThunk('todo/deleteBlog', async (id) => {
//     const response = await axios.delete(`${API_URL}/${id}`);
//     return response.data;
// });
// //single
// export const singleBlog = createAsyncThunk('todo/singleBlog', async (id) => {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
// });

// const initial_value = {
//     isLoading: true, error: null, userBlogData: [], singleuserBlogData:[]

// }

// export const UserBlogSlice = createSlice({
//     name: 'todo',
//     initialState: initial_value,
//     //read
//     extraReducers: (builder) => {
//         builder.addCase(fetchBlog.pending, (state) => {
//             state.isLoading = true;
//         })

//         builder.addCase(fetchBlog.fulfilled, (state, action) => {
//             // console.log("Action for fullfilled:", action);
//             state.isLoading = false;
//             state.userBlogData = action.payload;
//             state.error = null;
//         })

//         builder.addCase(fetchBlog.rejected, (state, action) => {
//             // console.log("Action for reject:", action);
//             state.isLoading = false;
//             state.error = action.error.message;
//         })
//         //create
//         builder.addCase(addBlog.pending, (state, action) => {
//             state.isLoading = true;
//         })
//         builder.addCase(addBlog.fulfilled, (state, action) => {
//             console.log("Action for fullfilled:", action);
//             state.isLoading = false;
//             state.userBlogData = [...state.userBlogData, action.payload];
//             state.error = null;
//             console.log("Payload received in addBlog.fulfilled:", action.payload);

//         })
//         builder.addCase(addBlog.rejected, (state, action) => {
//             console.log("Action for reject:", action);
//             state.isLoading = false;
//             state.error = action.error.message;
//         })
//         //update
//         builder.addCase(updateBlog.pending, (state, action) => {
//             state.isLoading = true;
//         })
//         builder.addCase(updateBlog.fulfilled, (state, action) => {
//             // state.items = (action.payload);
//             // const index = state.items.findIndex((todo) => todo.id === action.payload.id);
//             // if (index !== -1) {
//             //     state.items[index] = action.payload;
//             // }
//             state.isLoading = false;
//             state.singleuserBlogData = action.payload;
//             state.error = null;

//         })
//         builder.addCase(updateBlog.rejected, (state, action) => {
//             console.log("Action for reject:", action);
//             state.isLoading = false;
//             state.error = action.error.message;
//         })
//         //delete
//         builder.addCase(deleteBlog.fulfilled, (state, action) => {           
//             state.isLoading = false;
//             state.singleuserBlogData = action.payload;
//             state.error = null;
//         });


//         //single
//         builder.addCase(singleBlog.pending, (state) => {
//             state.isLoading = true;
//         })

//         builder.addCase(singleBlog.fulfilled, (state, action) => {
//             // console.log("Action for fullfilled:", action);
//             state.isLoading = false;
//             state.singleuserBlogData = action.payload;
//             state.error = null;
//         })

//         builder.addCase(singleBlog.rejected, (state, action) => {
//             // console.log("Action for reject:", action);
//             state.isLoading = false;
//             state.error = action.error.message;
//         })
//     }
// })

// export default UserBlogSlice.reducer;