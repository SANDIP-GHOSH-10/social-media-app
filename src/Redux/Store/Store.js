import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slice/AuthSlice';
import fetchLatestBlogReducer from '../Slice/LatestBlogSlice'
import fetchPlayersReducer from '../Slice/PlayersSlice'
import fetchUserBlogReducer from '../Slice/UserBlogSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    LatestBlog : fetchLatestBlogReducer,
    players : fetchPlayersReducer,
    UserBlog : fetchUserBlogReducer
  },
});
