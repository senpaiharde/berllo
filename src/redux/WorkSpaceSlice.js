import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService"
import backendHandler, { TaskOps } from "../services/backendHandler"
import { s } from "framer-motion/client"

// Async action to fetch workSpaces from localStorage or JSON
// export const fetchWorkSpaces = createAsyncThunk(
//   "workSpace/fetchworkSpaces",
//   async (_, { rejectWithValue }) => {
//     try {
//       // const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
//       const data = await getLocalData()
//       // console.log("fetchWorkSpaces :",data)
//       //   console.log(data)
//       if (!data) {
//         throw new Error("Server Error!")
//       }

//       // return data.boards
//     } catch (error) {
//       console.log("fetchWorkSpaces error:", error)
//       return rejectWithValue(error.message)
//     }
//   }
// )

export const syncWorkSpaceAsync = createAsyncThunk(
  "workSpace/syncWorkSpaceAsync",
  async ({ method, args, workId }, { rejectWithValue, dispatch }) => {
    try {
      console.log(
        "syncWorkSpaceAsync ",
        method,
        workId,
        args,
        "update happens here",
        workId
      )
      const data = await backendHandler({ method, args, workId })
      console.log("syncWorkSpaceAsync method",method, "data", data)
      // if (method === TaskOps.POST) {
      //   return
      // }
      // console.log("combineBoardFromGet", board)
      // if (method !== TaskOps.FETCH) dispatch(updateTaskInBoard(data))
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
      // state.boards.push(newBoard)
      console.log("addnewBoard", newBoard)
      // syncWorkSpaceAsync({
      //   method: TaskOps.POST,
      //   args: {
      //     body: { method: TaskOps.POST, workId: "board", newBoard },
      //   },
      //   workId: "board",
      // })
      
      // saveTolocal(newBoard)
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
      // .addCase(fetchWorkSpaces.pending, (state) => {
      //   state.action = "loading"
      // })
      // .addCase(fetchWorkSpaces.fulfilled, (state, action) => {
      //   state.action = "succeeded"
      //   state.boards = action.payload
      //   // console.log("fetchworkSpaces.fulfilled", action.payload)
      // })
      // .addCase(fetchWorkSpaces.rejected, (state, action) => {
      //   state.action = "failed"
      //   state.error = action.error.message
      //   console.log("fetchworkSpaces.rejected")
      // })
      .addCase(syncWorkSpaceAsync.fulfilled, (state, action) => {
        // state.loading = false;
        // console.log("syncWorkSpaceAsync.fulfilled state", state)
        // console.log("syncWorkSpaceAsync.fulfilled", action.payload)
        if(action.payload.method ==="fetch"){
          state.boards = action.payload.data.boards
        }
        if(action.payload.method ==="add"){
          // console.log("syncWorkSpaceAsync.fulfilled action.payload.data", action.payload.data)
          state.boards.push(action.payload.data)
        }
        // const boardss = action.payload.data.boards
        // state.boards = boardss
        // console.log("syncWorkSpaceAsync.fulfilled boardss", boardss)
        // state.boards = action.payload.data.boards
        
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
} = workSpaceSlice.actions
export default workSpaceSlice.reducer
