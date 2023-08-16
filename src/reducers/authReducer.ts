/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../filters/servicesCookie';
import { setSession } from '../filters/servicesSession';
import { IAUTH, IRegister, ISignIn } from '../interfaces';
import http from '../services/api';

export const signIn = createAsyncThunk('auth/sigIn', async (payload: ISignIn, { rejectWithValue }) => {
  const res = await http
    .post('/auth/login', payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const signUp = createAsyncThunk('auth/sigUp', async (payload: IRegister, { rejectWithValue }) => {
  const res = await http
    .post('/users', payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (payload: {refresh_token: string}, { rejectWithValue }) => {
  const res = await http
    .post('/auth/refresh-token', payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

const initialState = {
  info: {},
  loadingBtn: false,
  statusCode: undefined,
  message: '',
} as IAUTH;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.statusCode = undefined;
    },
    clearErrorsAuth: (state) => {
      state.statusCode = undefined;
      state.message = '';
      state.loadingBtn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      //sigIn
      .addCase(signIn.pending, (state) => {
        state.loadingBtn = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(signIn.fulfilled, (state, action: any) => {
        setCookie('access_token', action.payload.data?.access_token, 2);
        setCookie('refresh_token', action.payload.data?.refresh_token, 2);
        setSession('user-info', action.payload?.data?.user);
        state.info = action.payload?.data?.user;
        state.loadingBtn = true;
        state.statusCode = action.payload?.status;
        state.message = action.payload?.message;
      })
      .addCase(signIn.rejected, (state, action: any) => {
        state.loadingBtn = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
      //signUp
      .addCase(signUp.pending, (state) => {
        state.loadingBtn = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(signUp.fulfilled, (state, action: any) => {
        state.loadingBtn = false;
        state.statusCode = action.payload?.status;
        state.message = action.payload?.message;
      })
      .addCase(signUp.rejected, (state, action: any) => {
        state.loadingBtn = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
      //signUp
      .addCase(refreshToken.pending, (state) => {
        state.loadingBtn = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(refreshToken.fulfilled, (state, action: any) => {
        setCookie('access_token', action.payload.data?.access_token, 2);
        setCookie('refresh_token', action.payload.data?.refresh_token, 2);
        setSession('user-info', action.payload?.data?.user);
        state.info = action.payload?.data?.user;
        state.loadingBtn = true;
        state.statusCode = action.payload?.status;
        state.message = action.payload?.message;
      })
      .addCase(refreshToken.rejected, (state, action: any) => {
        state.loadingBtn = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      });
  }
});

export const { setStatus, clearErrorsAuth } = authSlice.actions;
export default authSlice.reducer;
