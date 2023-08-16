/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../services/api';

export interface IPromptReducer {
  loading: boolean;
  statusCode?: number;
  message: string;
  prompts: any[];
}

export const getListPrompt = createAsyncThunk('prompt/getListPrompt', async () => {
  const res = await http
    .get('/prompts')
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
});

const initialState: IPromptReducer = {
  prompts: [],
  loading: false,
  statusCode: undefined,
  message: '',
};

const promptSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.statusCode = undefined;
    },
    clearErrors: (state) => {
      state.message = '';
      state.statusCode = undefined;
      state.prompts = [];
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      //get prompt by post id
      .addCase(getListPrompt.pending, (state) => {
        state.loading = true;
        state.prompts = [];
        state.message = '';
        state.statusCode = undefined;
      })
      .addCase(getListPrompt.fulfilled, (state, action: any) => {
        state.prompts = action.payload?.data;
        state.loading = false;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getListPrompt.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.status;
      });
  }
});

export const { setStatus, clearErrors } = promptSlice.actions;
export default promptSlice.reducer;
