import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores user details including address
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateAddress: (state, action) => {
      if (state.user) {
        state.user.address = action.payload; // Update the address field
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateAddress, clearUser } = userSlice.actions;
export default userSlice.reducer;
