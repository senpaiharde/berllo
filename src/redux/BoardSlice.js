import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService"
import {
  transformTasksFromBackend,
  transformListsFromBackend,
  transformBoardFromBackend,
} from "../services/backendDataConverionToState"
import { BuildBoardFromState } from "../utils/boardUtils"
import backendHandler, { TaskOps } from "../services/backendHandler"

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

export const syncBoardAsync = createAsyncThunk(
  "board/sync",
  async ({ method, args, workId }, { rejectWithValue, dispatch }) => {
    try {
      console.log(method, workId, args, "update happens here", workId)
      const data = await backendHandler({ method, args, workId })
      // console.log('syncTaskAsync data', data);
      // combineBoardFromGet(data)
      // console.log('combineBoardFromGet data', combineBoardFromGet(data));
      // const {board, lists, tasks} = data
      console.log("syncBoardAsync", data.board,data.lists, transformTasksFromBackend(data.tasks))
      // console.log(
      //   "backendDataConverionToState ",
      //   transformBoardFromBackend(data.board),
      //   transformListsFromBackend(data.lists),
      //   transformTasksFromBackend(data.tasks)
      // )
      const board = combineBoardFromGet(
        {board: data.board,
        lists: data.lists,
        tasks: transformTasksFromBackend(data.tasks)}
      )
      console.log("combineBoardFromGet", board)
      if (method !== TaskOps.FETCH) dispatch(updateTaskInBoard(data))
      return { method, board }
    } catch (err) {
      console.log("syncTaskAsync error", err)
      return rejectWithValue(err.response?.data?.error || `${method} failed`)
    }
  }
)

function combineBoardFromGet({ board, lists, tasks }) {
  const listIdToTasksMap = new Map()

  // Group tasks by list ID
  tasks.forEach((task) => {
    const listId = task.taskList
    if (!listIdToTasksMap.has(listId)) {
      listIdToTasksMap.set(listId, [])
    }
    listIdToTasksMap.get(listId).push(task)
  })

  // Add tasks to their respective lists
  const updatedLists = lists.map((list) => {
    const tasksForList = listIdToTasksMap.get(list._id) || []
    return {
      ...(list.toObject?.() || list), // use plain object if available
      taskList: tasksForList,
    }
  })

  // Add lists and tasks back to the board
  const updatedBoard = {
    ...(board.toObject?.() || board),
    boardLists: updatedLists,
    // tasks,
  }

  return updatedBoard
}

const boardSlice = createSlice({
  name: "board",
  initialState: {
    _id: "",
    boardTitle: "",
    slug: "",
    isStarred: null,
    boardLists: [],
    boardLabels: [],
    boards: [],
    state: "idle",
    error: null,
    activeBoard: null,
    boardMembers: [],
    previewEditorPositon: null,
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

      saveTolocal(BuildBoardFromState(state))
    },
    removeboard: (state, action) => {
      state.boards = state.boards.filter((x) => x._id !== action.payload)

      saveTolocal(BuildBoardFromState(state))
    },
    updateStarStatus: (state, action) => {
      state.isStarred = action.payload

      saveTolocal(BuildBoardFromState(state))
    },
    updateboardTitle: (state, action) => {
      state.boardTitle = action.payload

      saveTolocal(BuildBoardFromState(state))
    },
    addBoardList: (state, action) => {
      const newList = {
        _id: nanoid(),
        taskListTitle: "",
        taskListBoard: state._id,
        taskList: [],
        state: "idle",
        error: null,
      }
      state.boardLists.push(newList)
      saveTolocal(BuildBoardFromState(state))
    },
    updateBoardlist: (state, action) => {
      const updatedList = action.payload
      const index = state.boardLists.findIndex(
        (list) => list._id === updatedList._id
      )
      if (index !== -1) {
        state.boardLists[index] = updatedList
      }
      saveTolocal(BuildBoardFromState(state))
    },
    updateBoardLabels: (state, action) => {
      state.boardLabels = action.payload
      saveTolocal(BuildBoardFromState(state))
    },
    removeBoardListFromBoard: (state, action) => {
      const newBoardLists = state.boardLists.filter(
        (list) => list._id !== action.payload
      )
      state.boardLists = newBoardLists

      saveTolocal(BuildBoardFromState(state))
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
        state.boardLists[index].taskList.push(task)
      }
    },
    removeTaskFromBoard: (state, action) => {
      const index = state.boardLists.findIndex(
        (list) => list._id === action.payload.taskList
      )
      if (index !== -1) {
        state.boardLists[index].taskList = state.boardLists[
          index
        ].taskList.filter((task) => task._id !== action.payload._id)
      }
      saveTolocal(BuildBoardFromState(state))
    },
    updateTaskInBoard: (state, action) => {
      const updatedTask = action.payload

      for (let list of state.boardLists) {
        const taskIndex = list.taskList.findIndex(
          (task) => task._id === updatedTask._id
        )
        if (taskIndex !== -1) {
          list.taskList[taskIndex] = { ...updatedTask }
          break
        }
      }

      const updatedBoard = BuildBoardFromState(state)

      const clonedBoard = JSON.parse(JSON.stringify(updatedBoard))
      saveTolocal(clonedBoard)
    },
    updatePreviewEditorPositon: (state, action) => {
      // console.log("updatePreviewEditorPositon", action.payload)
      state.previewEditorPositon = action.payload
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
        state.slug = board.slug || ""
        state.boardLabels = board.boardLabels || []
        state.boardLists = board.boardLists || []
        const existing = state.boards?.filter((b) => b._id !== board._id) || []
        state.boards = [...existing, board]
        state.boardMembers = board.boardMembers || []
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.state = "failed"
        console.log("fetchBoardById error:", action.payload)
        state.error = action.payload
      })
      .addCase(syncBoardAsync.fulfilled, (state, action) => {
        // state.loading = false;
        const board = action.payload.board
        state.state = "success"
        state._id = board._id
        state.boardTitle = board.boardTitle
        state.slug = board.slug || ""
        state.boardLabels = board.boardLabels || []
        state.boardLists = board.boardLists || []
        const existing = state.boards?.filter((b) => b._id !== board._id) || []
        state.boards = [...existing, board]
        state.boardMembers = board.boardMembers || []
        const { method, data } = action.payload
        console.log("syncBoardAsync", action.payload)
        // switch (method) {
        //   case TaskOps.FETCH:
        //     state.selectedTask = data;
        //     state.isOpen = true;
        //     break;
        //   case TaskOps.UPDATE:
        //   case TaskOps.ADD:
        //     state.selectedTask = {
        //       ...state.selectedTask,
        //       ...data,
        //     };
        //     break;
        //   case TaskOps.DELETE:
        //     if (state.selectedTask?._id === data._id) {
        //       (state.selectedTask = null), (state.isOpen = false);
        //     }
        //     break;
        //   default:
        //     break;
        // }
      })
      .addCase(syncBoardAsync.rejected, (state, action) => {
        ;(state.loading = false),
          (state.error = action.payload || action.error.message)
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
  updateBoardLabels,
  updatePreviewEditorPositon,
} = boardSlice.actions
export default boardSlice.reducer
