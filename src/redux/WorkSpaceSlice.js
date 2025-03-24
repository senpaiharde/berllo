import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getLocalData, saveTolocal } from "../services/storageService"

// Async action to fetch workSpaces from localStorage or JSON
export const fetchWorkSpaces = createAsyncThunk(
  "workSpace/fetchworkSpaces",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await getLocalData()
      console.log(data)
      if (!data) {
        throw new Error("Server Error!")
      }
      

      return data.workSpaces
    } catch (error) {
        console.log("fetchWorkSpaces error:",error)
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
    addworkSpace: (state, action) => {
      const newBoard = {
        id: Date.now().toString(),
        name: action.payload,
        lists: [],
        users: [],
      }
      state.boards.push(newBoard)
      saveTolocal({ boards: state.boards })
    },
    removeworkSpace: (state, action) => {
      state.boards = state.boards.filter((x) => x.id !== action.payload)
      saveTolocal({ boards: state.boards })
    },
    updateworkSpaceName: (state, action) => {
      const workSpace = state.boards.find((x) => x.id === action.payload.id)
      if (workSpace) {
        workSpace.name = action.payload.name
        saveTolocal({ boards: state.boards })
      }
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
        console.log("fetchworkSpaces.fulfilled")
      })
      .addCase(fetchWorkSpaces.rejected, (state, action) => {
        state.action = "failed"
        state.error = action.error.message
        console.log("fetchworkSpaces.rejected")
      })
  },
})

export const { addworkSpace, removeworkSpace, updateworkSpaceName } =
  workSpaceSlice.actions
export default workSpaceSlice.reducer
