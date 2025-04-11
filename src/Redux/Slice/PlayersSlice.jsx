import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:1000/players";

//fetch players
export const fetchAllPlayers = createAsyncThunk('players/fetchAllPlayers', async () => {
    const response = await axios.get(API_URL);
    console.log("Axios response for getApi: ", response);
    return response?.data;
});

//single players
export const fetchSinglePlayer = createAsyncThunk('players/fetchSinglePlayer', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

const initial_value = {
    isLoading: false, error: null, Allplayers: [], singlePlayer:[]

}

export const fetchplayers = createSlice({
    name: 'players', 
    initialState: initial_value,
    //read
    extraReducers: (builder) => {
        builder.addCase(fetchAllPlayers.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(fetchAllPlayers.fulfilled, (state, action) => {
            // console.log("Action for fullfilled:", action);
            state.isLoading = false;
            state.Allplayers = action.payload;
            state.error = null;
        })

        builder.addCase(fetchAllPlayers.rejected, (state, action) => {
            // console.log("Action for reject:", action);
            state.isLoading = false;
            state.error = action.error.message;
        })

        //single
        builder.addCase(fetchSinglePlayer.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(fetchSinglePlayer.fulfilled, (state, action) => {
            // console.log("Action for fullfilled:", action);
            state.isLoading = false;
            state.singlePlayer = action.payload;
            state.error = null;
        })

        builder.addCase(fetchSinglePlayer.rejected, (state, action) => {
            // console.log("Action for reject:", action);
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export default fetchplayers.reducer;