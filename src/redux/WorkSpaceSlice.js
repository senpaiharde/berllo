import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService"

// Async action to fetch workSpaces from localStorage or JSON
export const fetchWorkSpaces = createAsyncThunk(
  "workSpace/fetchworkSpaces",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await getLocalData()
      // console.log("fetchWorkSpaces :",data)
      //   console.log(data)
      if (!data) {
        throw new Error("Server Error!")
      }

      return data.boards
    } catch (error) {
      console.log("fetchWorkSpaces error:", error)
      return rejectWithValue(error.message)
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
      const newBoard = {
        _id: nanoid(),
        boardTitle: action.payload,

        slug: "",
        isStarred: null,
        boardLists: [],
        state: "idle",
        error: null,
        activeBoard: null,
      }
      state.boards.push(newBoard)
      saveTolocal(newBoard)

    },
    removeBoard: (state, action) => {
      
      // saveTolocal(newBoard)

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
    deleteBoardlist: (state, action) => {
      const board = state.boards.find((x) => x.id === action.payload.id)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkSpaces.pending, (state) => {
        state.action = "loading"
      })
      .addCase(fetchWorkSpaces.fulfilled, (state, action) => {
        state.action = "succeeded"
        state.boards = action.payload
        // console.log("fetchworkSpaces.fulfilled", action.payload)
      })
      .addCase(fetchWorkSpaces.rejected, (state, action) => {
        state.action = "failed"
        state.error = action.error.message
        console.log("fetchworkSpaces.rejected")
      })
  },
})

export const { addnewBoard, removeBoard, removeworkSpace, updateworkSpaceName } =
  workSpaceSlice.actions
export default workSpaceSlice.reducer
