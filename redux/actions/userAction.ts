import { LoginSchema } from "@/components/LoginForm";
import { RegisterSchema } from "@/components/RegisterForm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";


export const createUser = createAsyncThunk('user/createUser', async (values: z.infer<typeof RegisterSchema>, { rejectWithValue }) => {
  try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, values, {withCredentials:true})
      console.log("API Response:", response.data);
      return response.data.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (values: z.infer<typeof LoginSchema>, { rejectWithValue } )=>{
  try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, values, {withCredentials:true})
      // return response.data
      return {
        user: response.data.data,
        message: response.data.message,
      };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Login failed!');
  }
})

export const getUser = createAsyncThunk('user/getUser', async ( _, { rejectWithValue  } )=>{
  try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`, { withCredentials: true })

      return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
})
