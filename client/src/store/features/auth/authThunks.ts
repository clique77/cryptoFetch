import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/api";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/lib/api";
import { AUTH_ACTION_TYPES } from "./authTypes";

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>(
  AUTH_ACTION_TYPES.LOGIN_USER,
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.login(credentials);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  AUTH_ACTION_TYPES.REGISTER_USER,
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.register(data);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Registration failed');
    }
  }
)