import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService"

// Async action to fetch boards from localStorage or JSON
export const fetchBoardById = createAsyncThunk(
  "board/fetchBoardById",
  async (id, { rejectWithValue }) => {
    try {
      // const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      //   console.log("id:",id)
      const data = await getBoardById(id) 
      console.log("fetchBoardById → requested ID:", id, "→ found board:", data);

    //   console.log("fetchBoardById board:", data)
      if (!data) {
        throw new Error("Server Error!")
      }

      return data
    } catch (error) {
      console.log("fetchBoards error:", error)
      return rejectWithValue(error.message)
    }
  }
)

const boardSlice = createSlice({
  name: "board",
  initialState: {
    _id: "",
    boardTitle: null,
    isStarred: null,
    boardLists: [],
    boards: [],
    state: "idle",
    error: null,
  },
  reducers: {
    addboard: (state, action) => {
      const newBoard = {
        id: nanoid(),
        name: action.payload,
        lists: [],
        users: [],
      }
      state.boards.push(newBoard)
      saveTolocal({ boards: state.boards })
    },
    removeboard: (state, action) => {
      state.boards = state.boards.filter((x) => x.id !== action.payload)
      saveTolocal({ boards: state.boards })
    },
    updateboardName: (state, action) => {
      const board = state.boards.find((x) => x.id === action.payload.id)
      if (board) {
        board.name = action.payload.name
        saveTolocal({ boards: state.boards })
      }
    },
    deleteBoardlist: (state, action) => {
      const board = state.boards.find((x) => x.id === action.payload.id)

    },
    updateTaskInBoard: (state, action) => {
        const updatedTask = action.payload;
        for (let list of state.boardLists) {
          const taskIndex = list.taskList.findIndex((task) => task._id === updatedTask._id);
          if (taskIndex !== -1) {
            list.taskList = list.taskList.map((task) =>
                task._id === updatedTask._id ? { ...updatedTask } : task
              );
            break;
          }
        }
      
        saveTolocal({
          _id: state._id,
          boardTitle: state.boardTitle,
          isStarred: state.isStarred,
          boardLists: state.boardLists,
        });
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardById.pending, (state) => {
        state.action = "loading"
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.action = "succeeded"
        // state = action.payload
        
        state._id = action.payload._id
        state.boardTitle = action.payload.boardTitle
        state.isStarred = action.payload.isStarred
        state.boardLists = action.payload.boardLists
        // console.log("fetchboards.fulfilled", action.payload)
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.action = "failed"
        state.error = action.error.message
        console.log("fetchboards.rejected")
      })
  },
})

export const { addboard, removeboard, updateboardName,updateTaskInBoard } = boardSlice.actions
export default boardSlice.reducer
