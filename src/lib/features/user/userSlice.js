import apiService from '@/service/apiService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async action using createAsyncThunk
// export const fetchUserData = createAsyncThunk(
//     'user/fetchUserData',
//     async () => {
//         const response = await apiService.get('/user', false);
//         console.log('response===>', response);
//         return response.data;
//     },
// );

// // Async action for updating user data
// export const updateUserData = createAsyncThunk(
//     'user/updateUserData',
//     async updatedData => {
//         const response = await apiService.put('/user/update', updatedData); // replace with your endpoint
//         return response.data;
//     },
// );

const initialState = {
    userData: null,
};

// Slice
const userSlice = createSlice({
    name: 'user',
    // initialState: { entities: {}, loading: 'idle', error: null },
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        },
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(fetchUserData.pending, state => {
    //             state.loading = 'loading';
    //         })
    //         .addCase(fetchUserData.fulfilled, (state, action) => {
    //             state.loading = 'idle';
    //             state.entities = action.payload;
    //         })
    //         .addCase(fetchUserData.rejected, (state, action) => {
    //             state.loading = 'idle';
    //             console.log('error===>>>>>', action.error.message);
    //             state.error = action.error.message;
    //         })
    //         .addCase(updateUserData.pending, state => {
    //             state.loading = 'loading';
    //         })
    //         .addCase(updateUserData.fulfilled, (state, action) => {
    //             state.loading = 'idle';
    //             state.entities = action.payload;
    //         })
    //         .addCase(updateUserData.rejected, (state, action) => {
    //             state.loading = 'idle';
    //             state.error = action.error.message;
    //         });
    // },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
