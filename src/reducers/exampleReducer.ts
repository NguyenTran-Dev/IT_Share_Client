import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: string
}

const initialState: CounterState = {
  value: '',
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    hello: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = 'Hello! Welcome to Redux'
    },
  },
})

// Action creators are generated for each case reducer function
export const { hello } = exampleSlice.actions

export default exampleSlice.reducer
