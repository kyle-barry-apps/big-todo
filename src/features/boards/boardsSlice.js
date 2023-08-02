import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  boardsArray: [],
  isLoading: true,
  errMsg: ''
}

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async () => {
    const response = await fetch('./data.json')
    if (!response.ok) {
      return Promise.reject('Fetch failed, status: ' + response.status)
    }
    const data = await response.json()
    return data
  }
)

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boardsArray.push({
        name: action.payload.name,
        columns: action.payload.columns
      })
    },
    deleteBoard: (state, action) => {
      const updatedBoardsArray = state.boardsArray.filter(board => board.name !== action.payload.name);
      return { ...state, boardsArray: updatedBoardsArray };
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchBoards.pending, (state) => {
        state.isLoading = true
    })
    .addCase(fetchBoards.fulfilled, (state, action) => {
      state.isLoading = false
      state.errMsg = ''
      state.boardsArray = action.payload.boards
    })
    .addCase(fetchBoards.rejected, (state, action) => {
      state.isLoading = false
      state.errMsg = action.error ? action.error.message : 'Fetch failed'
    })
  }
})

export const { addBoard, deleteBoard } = boardsSlice.actions
export default boardsSlice.reducer