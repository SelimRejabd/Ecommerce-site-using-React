import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchUserDetails = createAsyncThunk(
    'users/profile/fetchDetails',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { user } = getState().user;
            const response = await axios.get('users/profile/', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ detail: error.message });
            }
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    'user/updateDetails',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const { user } = getState().user;
            const response = await axios.put('users/profile/update/', userData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ detail: error.message });
            }
        }
    }
);

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                // localStorage.setItem("user", JSON.stringify(state.user));
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export default userDetailsSlice.reducer;
