import { LoginSchema } from "@/components/LoginForm";
import { RegisterSchema } from "@/components/RegisterForm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";


export const createUser = createAsyncThunk('user/createUser', async (values: z.infer<typeof RegisterSchema>, { rejectWithValue } )=>{
  try {
      const user = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, values)
      return user.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (values: z.infer<typeof LoginSchema>,{ rejectWithValue } )=>{
  try {
      const user = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, values, {withCredentials:true})
      return user.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
})
