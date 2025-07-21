import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService"
import backendHandler, { TaskOps } from "../services/backendHandler"

export const syncWorkSpaceAsync = createAsyncThunk(
  "workSpace/syncWorkSpaceAsync",
  async ({ method, args, workId }, { rejectWithValue, dispatch }) => {
    try {
      const data = await backendHandler({ method, args, workId })
      return { method, data }
    } catch (err) {
      console.log("syncTaskAsync error", err)
      return rejectWithValue(err.response?.data?.error || `${method} failed`)
    }
  }
)

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: {
    boards: [],
    state: "idle",
    error: null,
  },
  reducers: {
    addnewBoard: (state, action) => {
      state.boards.push(action.payload)
    },
    removeBoard: (state, action) => {
      console.log("removeBoard action.payload", action.payload)
      state.boards = state.boards.filter((x) => x._id !== action.payload)
    },
    removeworkSpace: (state, action) => {
      state.boards = state.boards.filter((x) => x.id !== action.payload)
    },
    updateworkSpaceName: (state, action) => {
      const workSpace = state.boards.find((x) => x.id === action.payload.id)
      if (workSpace) {
        workSpace.name = action.payload.name
      }
    },
    updateBoardNameInWorkSpace: (state, action) => {
      console.log(" updateBoardNameInWorkSpace action.payload", action.payload)
      const index = state.boards.findIndex(
        (board) => board._id === action.payload._id
      )
      if (index !== -1) {
        state.boards[index].boardTitle = action.payload.name
      }
    },
    deleteBoardlist: (state, action) => {
      const board = state.boards.find((x) => x.id === action.payload.id)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(syncWorkSpaceAsync.fulfilled, (state, action) => {
        if (action.payload.method === "fetch") {
          state.boards = action.payload.data.boards
        }
        if (action.payload.method === "add") {
          state.boards.push(action.payload.data)
        }
      })
      .addCase(syncWorkSpaceAsync.rejected, (state, action) => {
        console.log("syncWorkSpaceAsync.rejected", action.payload)
      })
  },
})

export const {
  addnewBoard,
  removeBoard,
  removeworkSpace,
  updateworkSpaceName,
  updateBoardNameInWorkSpace,
} = workSpaceSlice.actions
export default workSpaceSlice.reducer
