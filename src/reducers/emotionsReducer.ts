/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../services/api';

export interface IEmotionsReq {
  postId: string;
  emotionType: number;
  userId: string;
}

export interface IEmotionsReducer {
  loading: boolean;
  statusCode?: number;
  message: string;
  emotions: any;
}

export const isEmotions = createAsyncThunk('emotions/isEmotions', async (payload: IEmotionsReq, { rejectWithValue }) => {
  const res = await http
    .post(`/emotion/add/${payload.postId}/${payload.emotionType}`, {
      userId: payload?.userId,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

export const getEmotionsByPostId = createAsyncThunk('emotions/getEmotionsByPostId', async (payload: string, { rejectWithValue }) => {
  const res = await http
    .get(`/emotion/${payload}`) //payload is postId
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
  return res;
});

const initialState: IEmotionsReducer = {
  emotions: null,
  loading: false,
  statusCode: undefined,
  message: '',
};

const emotionsSlice = createSlice({
  name: 'emotions',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.statusCode = undefined;
    },
    clearErrors: (state) => {
      state.message = '';
      state.statusCode = undefined;
      state.emotions = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //emotions
      .addCase(isEmotions.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(isEmotions.fulfilled, (state, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(isEmotions.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      })
    //get emotions by post id
      .addCase(getEmotionsByPostId.pending, (state) => {
        state.loading = true;
        state.emotions = null;
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(getEmotionsByPostId.fulfilled, (state, action: any) => {
        state.emotions = action.payload?.data;
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getEmotionsByPostId.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      });
  }
});

export const { setStatus, clearErrors } = emotionsSlice.actions;
export default emotionsSlice.reducer;
