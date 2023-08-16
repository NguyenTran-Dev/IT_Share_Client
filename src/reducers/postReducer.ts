/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from '../interfaces';
import http from '../services/api';


export const createPost = createAsyncThunk('post/createPost', async (payload: any, { rejectWithValue }) => {
  const res = await http
    .post('/post', {
      ...payload,
      status: 1,})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const updatePost = createAsyncThunk('post/updatePost', async (payload: any, { rejectWithValue }) => {
  const res = await http
    .put(`/post/${payload._id}`, {
      ...payload,
      status: 1,})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const getPosts = createAsyncThunk('post/getPosts', async (payload?: string) => {
  const res = await http
    .get(`/post${payload && `?key_search=${payload}`}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
});

export const getPostById = createAsyncThunk('post/getPostById', async (payload: string, {rejectWithValue}) => {
  const res = await http
    .get(`/post/${payload}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const deletePostById = createAsyncThunk('post/deletePostById', async (payload: string, {dispatch, rejectWithValue}) => {
  const res = await http
    .delete(`/post/${payload}`)
    .then((response) => {
      dispatch(getPosts(''));
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export interface IPostReducer {
  posts: IPost[];
  loading: boolean;
  error: string;
  statusCode?: number;
  message: string;
}

const initialState : IPostReducer = {
  posts: [],
  loading: false,
  error: '',
  statusCode: undefined,
  message: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.statusCode = undefined;
    },
    clearPost: (state) => {
      state.posts = [] as IPost[];
    },
    clearErrors: (state) => {
      state.loading = false;
      state.message = '';
      state.statusCode = undefined;
      state.posts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      //create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(createPost.fulfilled, (state, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createPost.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
      //update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(updatePost.fulfilled, (state, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updatePost.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
    //get post
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(getPosts.fulfilled, (state, action: any) => {
        state.posts = action.payload.data as IPost[];
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
    //get post by id
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(getPostById.fulfilled, (state, action: any) => {
        state.posts = [action.payload.data] as IPost[];
        state.loading = false;
      })
      .addCase(getPostById.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
    //delete post by id
      .addCase(deletePostById.pending, (state) => {
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(deletePostById.fulfilled, (state, action: any) => {
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deletePostById.rejected, (state, action: any) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      });
  }
});

export const { setStatus, clearPost, clearErrors } = postSlice.actions;
export default postSlice.reducer;
