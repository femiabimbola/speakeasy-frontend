import { createSlice } from "@reduxjs/toolkit";

interface User {
  email: string | null;
  firstName: string | null; 
  isEmailVerified: boolean;
  lastName: string | null,
  role: 'USER' | string; 
  userPreferences: {
    emailNotification: boolean;
    enable2FA: boolean;
    twoFactorSecret: string | null;
  };
}

const  initialState: User = {
  email: null,
  firstName:  null,
  isEmailVerified: false,
  lastName: null,
  role: 'USER' ,
  userPreferences: {
    emailNotification: false,
    enable2FA: false,
    twoFactorSecret: null,
  }
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {}

})

export default userSlice.reducer;
