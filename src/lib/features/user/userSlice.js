import apiService from '@/service/apiService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action using createAsyncThunk
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const response = await apiService.get('/user', false);
        return response.data;
    },
);

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: { entities: {}, loading: 'idle', error: null },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserData.pending, state => {
                state.loading = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.entities = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
