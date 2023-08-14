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
    },
    updateBoard: (state, action) => {
      const { updatedBoard, activeBoard } = action.payload;

      const updatedBoardsArray = state.boardsArray.map((board) =>
        board.name === activeBoard.name ? updatedBoard : board
      );

      state.boardsArray = updatedBoardsArray;
    },
    addColumn: (state, action) => {
      const { updatedBoard, activeBoard } = action.payload

      const updatedBoardsArray = state.boardsArray.map((board) => 
        board.name === activeBoard.name ? updatedBoard : board
      )

      state.boardsArray = updatedBoardsArray;
    },
    changeColumn: (state, action) => {
        const updatedBoard = action.payload;

        // Find the index of the board in the boardsArray
        const boardIndex = state.boardsArray.findIndex(
          (board) => board.name === updatedBoard.name
        );

        if (boardIndex !== -1) {
          // Update the entire board in the boardsArray
          state.boardsArray[boardIndex] = updatedBoard;
        }
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

export const { addBoard, deleteBoard, updateBoard, addColumn, changeColumn } = boardsSlice.actions
export default boardsSlice.reducer