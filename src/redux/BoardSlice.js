import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService"

// ✅ Async action to fetch board by ID from localStorage
export const fetchBoardById = createAsyncThunk(
  "board/fetchBoardById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getBoardById(id)
      // console.log("fetchBoardById → requested ID:", id, "→ found board:", data);
      if (!data) throw new Error("Board not found")
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
    boardTitle: "",
    slug: "", // ✅ added here so GlobalHeader can use it
    isStarred: null,
    boardLists: [],
    boards: [], // used by your manual reducers (add/remove/update)
    state: "idle",
    error: null,
    activeBoard: null,
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
      // saveTolocal({ boards: state.boards });
    },
    removeboard: (state, action) => {
      // state.boards = state.boards.filter((x) => x.id !== action.payload);
      // saveTolocal({ boards: state.boards });
    },
    updateStarStatus: (state, action) => {
      state.isStarred = action.payload
      // saveTolocal( state );
    },
    updateboardTitle: (state, action) => {
      console.log("updateboardTitle action.payload", action.payload)
      // const board = state.boards.find((x) => {
      //   console.log("x._id === action.payload.id",x._id === action.payload.id)
      //   x._id === action.payload.id
      // });

      // console.log("old board.boardTitle",board.boardTitle)
      state.boardTitle = action.payload
      // console.log("new board.boardTitle",board.boardTitle)
      // saveTolocal({ state });
    },
    addBoardList: (state, action) => {
      console.log("addList action.payload", action.payload)
      const newList = {
        _id: nanoid(),
        taskListTitle: "",
        taskListBoard: state._id,
        taskList: [],
        state: "idle",
        error: null,
      }
      console.log("addList newList", newList)
      state.boardLists.push(newList)
      //saveTolocal({list:state.lists});
    },
    updateBoardlist: (state, action) => {
      console.log("updateBoardlist action.payload", action.payload)
      const updatedList = action.payload
      const index = state.boardLists.findIndex(
        (list) => list._id === updatedList._id
      )
      if (index !== -1) {
        state.boardLists[index] = updatedList // Update the correct list in the array
      }
    },
    removeBoardListFromBoard: (state, action) => {
      console.log("removeBoardListFromBoard", action.payload)
      const newBoardLists = state.boardLists.filter(list => list._id !== action.payload)
      state.boardLists = newBoardLists
    },
    addTaskToBoard: (state, action) => {
      const task = {
        _id: nanoid(),
        taskTitle: "",
        taskboard: state._id,
        taskChecked: false,
        taskList: action.payload.taskList,
        state: "idle",
        error: null,
      }
      const index = state.boardLists.findIndex(
        (list) => list._id === task.taskList
      )
      if (index !== -1) {
        state.boardLists[index].taskList.push(task) // Update the correct list in the array
      }
    },
    removeTaskFromBoard: (state, action) => {
      const index = state.boardLists.findIndex(
        (list) => list._id === action.payload.taskList
      )
      if (index !== -1) {
        state.boardLists[index].taskList = state.boardLists[index].taskList.filter(
          (task) => task._id !== action.payload._id
        )
      }
    },
    updateTaskInBoard: (state, action) => {
      const updatedTask = action.payload
      for (let list of state.boardLists) {
        const taskIndex = list.taskList.findIndex(
          (task) => task._id === updatedTask._id
        )
        if (taskIndex !== -1) {
          list.taskList = list.taskList.map((task) =>
            task._id === updatedTask._id ? { ...updatedTask } : task
          )
          break
        }
      }

      // saveTolocal({
      //   _id: state._id,
      //   boardTitle: state.boardTitle,
      //   isStarred: state.isStarred,
      //   boardLists: state.boardLists,
      // });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardById.pending, (state) => {
        state.state = "loading"
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        const board = action.payload
        state.state = "success"
        state._id = board._id
        state.boardTitle = board.boardTitle
        state.slug = board.slug || "" // fallback if undefined
        state.boardLists = board.boardLists || []
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.state = "failed"
        state.error = action.payload
      })
  },
})

export const {
  addboard,
  removeboard,
  updateboardTitle,
  updateTaskInBoard,
  updateStarStatus,
  addTaskToBoard,
  removeTaskFromBoard,
  addBoardList,
  removeBoardListFromBoard,
  updateBoardlist,
} = boardSlice.actions
export default boardSlice.reducer
