/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../services/api';
import { IUser } from '../interfaces';

export interface IUserReducer{
  loading: boolean;
  statusCode?: number;
  message: string;
  users: IUser[];
  userById: IUser;
}

export const getListUser = createAsyncThunk('user/getListUser', async (payload?: string ) => {
  const res = await http
    .get(`/users${payload && `?key_search=${payload}`}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
});

export const getUserById = createAsyncThunk('user/getUserById', async (payload: string) => {
  const res = await http
    .get(`/users/${payload}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
});

export const updateUserById = createAsyncThunk('user/updateUserById', async (payload: IUser, {dispatch, rejectWithValue}) => {
  const res = await http
    .put(`/users/${payload._id}`, payload)
    .then((response) => {
      dispatch(getListUser(''));
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const deleteUserById = createAsyncThunk('user/deleteUserById', async (payload: string, {dispatch, rejectWithValue}) => {
  const res = await http
    .delete(`/users/${payload}`)
    .then((response) => {
      dispatch(getListUser(''));
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

const initialState: IUserReducer = {
  users: [],
  userById: {
    email: '',
    full_name: '',
    role: '3',
    balance: 0,
    _id: ''
  },
  loading: false,
  statusCode: undefined,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.statusCode = undefined;
    },
    clearErrors: (state) => {
      state.message = '';
      state.statusCode = undefined;
      state.users = [];
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListUser.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(getListUser.fulfilled, (state, action: any) => {
        const { data, message } = action.payload;
        state.users = data;
        state.loading = false;
        state.message = message;
      })
      .addCase(getListUser.rejected, (state, action: any) => {
        const { status, message } = action.payload;
        state.loading = false;
        state.message = message;
        state.statusCode = status;
      })
      //getUserById
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.userById = {...state.userById};
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(getUserById.fulfilled, (state, action: any) => {
        const { data, message } = action.payload;
        state.userById = data;
        state.loading = false;
        state.message = message;
      })
      .addCase(getUserById.rejected, (state, action: any) => {
        const { status, message } = action.payload;
        state.loading = false;
        state.message = message;
        state.statusCode = status;
      })
      //updateUserById
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(updateUserById.fulfilled, (state, action: any) => {
        const { data, status, message } = action.payload;
        state.userById = data;
        state.loading = false;
        state.statusCode = status;
        state.message = message;
      })
      .addCase(updateUserById.rejected, (state, action: any) => {
        const { status, message } = action.payload;
        state.loading = false;
        state.message = message;
        state.statusCode = status;
      })
    //deleteUserById
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(deleteUserById.fulfilled, (state, action: any) => {
        const { data, status, message } = action.payload;
        state.userById = data;
        state.loading = false;
        state.statusCode = status;
        state.message = message;
      })
      .addCase(deleteUserById.rejected, (state, action: any) => {
        const { status, message } = action.payload;
        state.loading = false;
        state.message = message;
        state.statusCode = status;
      });         
  }
});

export const { setStatus, clearErrors } = userSlice.actions;
export default userSlice.reducer;
