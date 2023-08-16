/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../services/api';

export interface ICommentsReq {
  post_id: string;
  comment: string;
  user_id: string;
}

export interface ICommentsReducer {
  loading: boolean;
  statusCode?: number;
  message: string;
  comments: any;
}

export const createCommentByPost = createAsyncThunk('comments/createCommentByPost', async (payload: ICommentsReq, { rejectWithValue }) => {
  const res = await http
    .post('/comments', {
      ...payload,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const getCommentsByPost = createAsyncThunk('comments/getCommentsByPost', async (payload: string, { rejectWithValue }) => {
  const res = await http
    .get(`/comments/comments-by-posts?postIds=${payload}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const deleteCommentById = createAsyncThunk('post/deletePostById', async (payload: string, {rejectWithValue}) => {
  const res = await http
    .delete(`/comments/${payload}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

const initialState: ICommentsReducer = {
  comments: null,
  loading: false,
  statusCode: undefined,
  message: '',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.statusCode = undefined;
    },
    clearErrors: (state) => {
      state.message = '';
      state.statusCode = undefined;
      state.comments = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      //comments
      .addCase(createCommentByPost.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(createCommentByPost.fulfilled, (state, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createCommentByPost.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
    //get comments by post id
      .addCase(getCommentsByPost.pending, (state) => {
        state.loading = true;
        state.comments = null;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(getCommentsByPost.fulfilled, (state, action: any) => {
        state.comments = action.payload?.data;
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getCommentsByPost.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
    //deleted comments by post id
      .addCase(deleteCommentById.pending, (state) => {
        state.loading = true;
        state.comments = null;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(deleteCommentById.fulfilled, (state, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteCommentById.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      });
  }
});

export const { setStatus, clearErrors } = commentsSlice.actions;
export default commentsSlice.reducer;
