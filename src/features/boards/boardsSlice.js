import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  boardsArray: []
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boardsArray.push({
        id: Date.now(),
        name: action.payload.name,
        columns: action.payload.columns
      })
    }
  }
})

export const { addBoard } = boardsSlice.actions

export default boardsSlice.reducer