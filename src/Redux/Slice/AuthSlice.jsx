




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Api = "http://localhost:1000/auth";

// Registration
export const registerUser = createAsyncThunk('auth/registerUser', async (data) => {
  const res = await axios.post(Api, data);
  console.log("Axios response for Registration", res);
  return res?.data;
});

// Login
export const loginUser = createAsyncThunk('auth/loginUser', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get(Api); // Fetch all users
    const users = res.data;

    const user = users.find(
      (u) =>
        u.email === data.email &&
        u.password === data.password
    );

    if (!user) {
      return rejectWithValue("Invalid email or password");
    }

    return user; // Return the matched user
  } catch (error) {
    return rejectWithValue("An error occurred during login");
  }
});

const initialState = {
  isLoading: false,
  error: null,
  regValue: [],
  loginValue: [],
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.regValue = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginValue = action.payload;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;







// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const RegisterApi = "http://localhost:1000/auth"; // For registration
// const UsersApi = "http://localhost:1000/users";   // For login check

// // ✅ Registration - Still a POST request
// export const registerUser = createAsyncThunk('auth/registerUser', async (data) => {
//   const res = await axios.post(RegisterApi, data);
//   console.log("Axios response for Registration", res);
//   return res?.data;
// });

// // ✅ Login - GET request to match email & password
// export const loginUser = createAsyncThunk('auth/loginUser', async (data, thunkAPI) => {
//   const { email, password } = data;

//   try {
//     const res = await axios.get(`${UsersApi}?email=${email}&password=${password}`);
//     console.log("Axios response for Login", res);

//     if (res.data.length > 0) {
//       return res.data[0]; // Found a matching user
//     } else {
//       return thunkAPI.rejectWithValue("Invalid email or password.");
//     }
//   } catch (error) {
//     return thunkAPI.rejectWithValue("Login failed. Please try again.");
//   }
// });

// const initialState = {
//   isLoading: false,
//   error: null,
//   regValue: [],
//   loginValue: null,
//   user: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.loginValue = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     // Registration
//     builder.addCase(registerUser.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.regValue = action.payload;
//       state.error = null;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.error.message;
//     });

//     // Login
//     builder.addCase(loginUser.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.loginValue = action.payload;
//       state.user = action.payload;
//       state.error = null;
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload; // use rejectWithValue error
//       state.loginValue = null;
//     });
//   },
// });

// export const { logoutUser, setUser } = authSlice.actions;
// export default authSlice.reducer;























// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const Api = "http://localhost:1000/auth"

// // Registration
// export const registerUser = createAsyncThunk('auth/registerUser', async (data) => {
//   const res = await axios.post(Api, data);
//   console.log("Axios response for Registration", res);
//   return res?.data;
// });

// // Login
// export const loginUser = createAsyncThunk('auth/loginUser', async (data) => {
//   const res = await axios.post(Api, data);
//   console.log("Axios response for Login", res);
//   const users = res.data;
//   const user = users.find(
//     (u) =>
//         u.email === data.email &&
//         u.password === data.password

// );

// if (!user) {
//     throw new Error("Invalid email, password, or phone number");
// }

//   return res?.data;  
// });

// const initialState = {
//   isLoading: false,
//   error: null,
//   regValue: [],
//   loginValue: [],
//   user: null,  
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;  
//     },
//   },
//   extraReducers: (builder) => {

//     // Registration
//     builder.addCase(registerUser.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       console.log("Action for fulfilled:", action);
//       state.isLoading = false;
//       state.regValue = action.payload;
//       state.error = null;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       console.log("Action for rejected:", action);
//       state.isLoading = false;
//       state.error = action.error.message;
//     });

//     // Login
//     builder.addCase(loginUser.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       console.log("Action for fulfilled:", action);
//       state.isLoading = false;
//       state.loginValue = action.payload;
//       state.error = null;
//       state.user = action.payload;  
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//       console.log("Action for rejected:", action);
//       state.isLoading = false;
//       state.error = action.error.message;
//     });
//   },
// });

// export const { logoutUser, setUser } = authSlice.actions;
// export default authSlice.reducer;

























// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const Api = "http://localhost:1000/auth"

// //Registration

// export const registerUser = createAsyncThunk('auth/registerUser',
//   async (data) => {
//     const res = await axios.post(Api, data);
//     console.log("Axios response for Registration", res);
//     return res?.data;
//   })

// export const loginUser = createAsyncThunk('auth/loginUser',
//   async (data) => {
//     const res = await axios.post(Api, data);
//     console.log("Axios response for Login", res);
//     return res?.data;
    
//   })

// const initialState = {
//   isLoading: false,
//   error: null,
//   regValue: [],
//   loginValue: [],
//   user:null,
// }



// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {

//     //Registraiom
//     builder.addCase(registerUser.pending, (state) => {
//       state.isLoading = true;
//     })
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       console.log("Action for fullfilled:", action);
//       state.isLoading = false;
//       state.regValue = action.payload;
//       state.error = null;
//     })
//     builder.addCase(registerUser.rejected, (state, action) => {
//       console.log("Action for reject:", action);
//       state.isLoading = false;
//       state.error = action.error.message;
//     })

//     //Login

//     builder.addCase(loginUser.pending, (state) => {
//       state.isLoading = true;
//     })
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       console.log("Action for fullfilled:", action);
//       state.isLoading = false;
//       state.loginValue = action.payload;
//       state.error = null;
//     })
//     builder.addCase(loginUser.rejected, (state, action) => {
//       console.log("Action for reject:", action);
//       state.isLoading = false;
//       state.error = action.error.message;
//     })
//   }
// })


// export const { logoutUser } = authSlice.actions; 
// export default authSlice.reducer;

























// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import API from '../../api/axiosInstance';
// // import { end_point } from '../../Api/Api_Url';
// import axiosInstance from '../../Api/AxiosInstance';
// import axios from 'axios';
// // let Auth_api = end_point.Auth;
// let Auth_api = 'http://localhost:1000/auth';
// console.log("Api",Auth_api);
// const initial_value = {
//   isAuthenticated: false,
//   user: [],
// //   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
//   isLoading: true,

// };

// // Async thunk for user login
// // export const loginUser = createAsyncThunk(
// //   'auth/loginUser',
// //   async ({ email, password }, { rejectWithValue }) => {
// //     try {
// //       const response = await axiosInstance.get('/users', { params: { email, password } });
// //       if (response.data.length > 0) {
// //         return response.data[0]; // Return the user
// //       } else {
// //         throw new Error('Invalid email or password');
// //       }
// //     } catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );



// // Registration
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (data)=> {
//     const res = await axios.get(Auth_api,data)
//     console.log("Axios response for registration",res);
//     return res?.data;
//   }
// );

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState : initial_value ,
//   reducers: {
//     // logout(state) {
//     //   state.isAuthenticated = false;
//     //   state.user = null;
//     //   state.status = 'idle';
//     //   state.error = null;
//     // },
//   },
//   extraReducers: (builder) => {
//     // Login cases
//     // builder
//     //   .addCase(loginUser.pending, (state) => {
//     //     state.status = 'loading';
//     //     state.error = null;
//     //   })
//     //   .addCase(loginUser.fulfilled, (state, action) => {
//     //     state.status = 'succeeded';
//     //     state.isAuthenticated = true;
//     //     state.user = action.payload;
//     //   })
//     //   .addCase(loginUser.rejected, (state, action) => {
//     //     state.status = 'failed';
//     //     state.error = action.payload;
//     //   });

//     // Register cases
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.isLoading = false;
//         state.isAuthenticated = true; // Automatically authenticate after registration
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;
