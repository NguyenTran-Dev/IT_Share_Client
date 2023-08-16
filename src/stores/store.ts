import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import postReducer from '../reducers/postReducer';
import emotionsReducer from '../reducers/emotionsReducer';
import commentReducer from '../reducers/commentReducer';
import promptReducer from '../reducers/promptReducer';
import userReducer from '../reducers/userReducer';

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    postReducer: postReducer,
    emotionsReducer: emotionsReducer,
    commentReducer: commentReducer, 
    promptReducer: promptReducer,
    userReducer: userReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
