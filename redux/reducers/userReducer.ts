import { createSlice } from "@reduxjs/toolkit";
import { createUser, getUser, loginUser } from "../actions/userAction";

interface User {
  user: {
    createdAt?: string;
    
    email: string | null;
    firstName: string | null;
    isEmailVerified: boolean;
    lastName: string | null;
    role: "USER" | string;
    userPreferences: {
      enable2FA: boolean;
      emailNotification: boolean;
      twoFactorSecret: string | null;
    };
    _id:string;
  } | null;
  isLoading: boolean;
  error: string | null;
  // message: string | null;
}

const initialState: User = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Login cases
    builder
      // .addCase(loginUser.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })

      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = action.payload.user;
      //   state.error = null;
      // })

      // .addCase(loginUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // })
      
      // Register cases You are to remove it 
      // .addCase(createUser.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(createUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = action.payload;
      //   state.error = null;
      // })
      // .addCase(createUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // });
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Get User Payload:", action.payload);
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch user';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
