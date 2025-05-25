import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { saveTolocal, getBoardById } from "../services/storageService"
import {
  transformTasksFromBackend,
  transformTaskFromBackend,
} from "../services/backendDataConverionToState"
import { BuildBoardFromState } from "../utils/boardUtils"
import backendHandler, { TaskOps } from "../services/backendHandler"
import { is } from "date-fns/locale"

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
  "board/syncBoardAsync",
  async ({ method, args, workId }, { rejectWithValue, dispatch }) => {
    try {
      // console.log(method, workId, args, "update happens here", workId)
      const data = await backendHandler({ method, args, workId })
      // console.log("syncBoardAsync method", method)
      if (method === TaskOps.ADD || method === TaskOps.UPDATE) {
        return
      }
      //   "backendDataConverionToState ",
      //   transformBoardFromBackend(data.board),
      //   transformListsFromBackend(data.lists),
      //   transformTasksFromBackend(data.tasks)
      // )
      const board = combineBoardFromGetSorted({
        board: data.board,
        lists: data.lists,
        tasks: transformTasksFromBackend(data.tasks),
      })
      // console.log("combineBoardFromGet", board)
      // if (method !== TaskOps.FETCH) dispatch(updateTaskInBoard(data))
      return { method, board }
    } catch (err) {
      console.log("syncBoardAsync error", err)
      return rejectWithValue(err.response?.data?.error || `${method} failed`)
    }
  }
)
let updatedBoard = null
export const updateBoardListOrderAndSync = (newOrder) => (dispatch) => {
  console.log("updateBoardListOrderAndSync", newOrder)
  dispatch(updateBoardListOrder(newOrder))
  console.log("updateBoardListOrderAndSync boardSlice", updatedBoard)
  dispatch(
    syncBoardAsync({
      method: TaskOps.UPDATE,
      args: {
        body: {
          method: TaskOps.UPDATE,
          workId: "board",
          boardLists: updatedBoard.boardListsById,
        },
        taskId: updatedBoard._id,
      },

      workId: "board",
    })
  )
  updatedBoard = null
}
let updatedBoardListSource = null
let updatedBoardListDestination = null
let updatedTask = null
export const updateTasklistOrderAndSync = (newOrder) => (dispatch) => {
  console.log("updateTasklistOrderAndSync", newOrder)
  dispatch(updateTasklistOrder(newOrder))
  console.log(
    "updateTasklistOrderAndSync updatedBoardListSource",
    updatedBoardListSource
  )
  console.log(
    "updateTasklistOrderAndSync updatedBoardListDestanation",
    updatedBoardListDestination
  )
  //update the list field "taskList" if task moved in it 
  dispatch(
    syncBoardAsync({
      method: TaskOps.UPDATE,
      args: {
        body: {
          method: TaskOps.UPDATE,
          workId: "list",
          taskList: updatedBoardListDestination.taskListById,
        },
        taskId: updatedBoardListDestination._id,
      },

      workId: "list",
    })
  )
  if (updatedBoardListSource) {
    console.log(
      "updateTasklistOrderAndSync updatedBoardListSource",
      updatedBoardListSource
    )
    //update the source list field "taskList" if task moved to a different list 
    dispatch(
      syncBoardAsync({
        method: TaskOps.UPDATE,
        args: {
          body: {
            method: TaskOps.UPDATE,
            workId: "list",
            taskList: updatedBoardListSource.taskListById,
          },
          taskId: updatedBoardListSource._id,
        },

        workId: "list",
      })
    )
    if (updatedTask) {
      console.log("updateTasklistOrderAndSync updatedTask", updatedTask)
      //update the task field "list" if task moved to a different list 
      dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            body: {
              method: TaskOps.UPDATE,
              workId: "tasks",
              list: updatedTask.list,
            },
            taskId: updatedTask._id,
          },

          workId: "tasks",
        })
      )
    }
  }
  updatedTask = null
  updatedBoardListSource = null
  updatedBoardListDestination = null
}

// export const syncListAsync = createAsyncThunk(
//   "board/syncListAsync",
//   async ({ method, args, workId }, { rejectWithValue, dispatch }) => {
//     try {
//       // console.log(method, workId, args, "update happens here", workId)
//       const data = await backendHandler({ method, args, workId })

//       // console.log("combineBoardFromGet", board)
//       if (method !== TaskOps.FETCH) dispatch(updateTaskInBoard(data))
//       return { method, board }
//     } catch (err) {
//       console.log("syncTaskAsync error", err)
//       return rejectWithValue(err.response?.data?.error || `${method} failed`)
//     }
//   }
// )

function combineBoardFromGet({ board, lists, tasks }) {
  const listIdToTasksMap = new Map()
  console.log("combineBoardFromGet board", board)
  console.log("combineBoardFromGet lists", lists)
  console.log("combineBoardFromGet tasks", tasks)
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

function combineBoardFromGetSorted({ board, lists, tasks }) {
  const listIdToTasksMap = new Map()

  // Group tasks by list ID
  tasks.forEach((task) => {
    const listId = task.taskList
    if (!listIdToTasksMap.has(listId)) {
      listIdToTasksMap.set(listId, [])
    }
    listIdToTasksMap.get(listId).push(task)
  })

  // Map listId to list object
  const listMap = new Map()
  lists.forEach((list) => {
    listMap.set(list._id.toString(), list.toObject?.() || list)
  })

  // Create updatedLists in the order specified by board.boardLists
  const updatedLists = board.boardLists
    .map((listId) => {
      const list = listMap.get(listId.toString())
      if (!list) return null

      const rawTasks = listIdToTasksMap.get(list._id) || []
      
      // Create a map for fast task ID lookup
      const taskMap = new Map(
        rawTasks.map((task) => [task._id.toString(), task])
      )
      // console.log("combineBoardFromGet taskListTitle",list.taskListTitle, "taskMap", taskMap)
      // Order tasks according to list.taskList
      const orderedTasks = (list.taskList || [])
        .map((taskId) => taskMap.get(taskId.toString()))
        .filter(Boolean)
      // console.log("combineBoardFromGet taskListTitle",list.taskListTitle, "taskMap", taskMap)
      return {
        ...list,
        taskList: orderedTasks,
      }
    })
    .filter(Boolean) // remove any nulls in case of missing lists

  // Assemble final board
  const updatedBoard = {
    ...(board.toObject?.() || board),
    boardLists: updatedLists,
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
    boardListsById: [],
    filter:{
      title: "",
      members: [],
      labels: [],
    },
    // boards: [],
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
    updateboardFilter: (state, action) => {
      console.log("boardSlice updateboardFilter", action.payload)
      state.filter = action.payload
      // saveTolocal(BuildBoardFromState(state))
    },
    addBoardList: (state, action) => {
      const newList = {
        _id: nanoid(),
        taskListTitle: "",
        taskListBoard: state._id,
        indexInBoard: state.boardLists.length,
        isNewTaskList: true,
        taskList: [],
        state: "idle",
        error: null,
      }
      state.boardLists.push(newList)
      saveTolocal(BuildBoardFromState(state))
    },
    updateBoardListOrder: (state, action) => {
      const { draggableId, destination, source } = action.payload
      console.log(
        "state.boardLists",
        JSON.parse(JSON.stringify(state.boardLists))
      )
      console.log(
        "updateBoardListOrder source",
        source,
        "destination ",
        destination
      )
      // const sourceIndex = state.boardLists.findIndex(
      //   (list) => list._id === draggableId)
      // console.log("updateBoardListOrder draggableId sourceIndex", sourceIndex)
      // Remove the item from sourceIndex and store it
      const { index } = source
      // console.log('updateBoardListOrder source.index', source.index);
      // console.log('updateBoardListOrder source.Index', index);
      const [movedList] = state.boardLists.splice(index, 1)
      console.log(
        "updateBoardListOrder movedList",
        JSON.stringify(movedList._id)
      )
      // console.log('state.boardLists', JSON.parse(JSON.stringify(state.boardLists)));
      // Insert the item at destinationIndex
      // console.log('updateBoardListOrder destination.index', destination.index);
      state.boardLists.splice(destination.index, 0, movedList)
      console.log(
        "state.boardLists",
        JSON.parse(JSON.stringify(state.boardLists))
      )
      const boardListsById = state.boardLists.map((list) => list._id.toString())
      console.log("updateBoardListOrder boardListsById", boardListsById)
      updatedBoard = {
        _id: state._id,
        boardListsById,
      }
      state.boardListsById = boardListsById
    },
    updateTasklistOrder: (state, action) => {
      console.log("updateTasklistOrder")
      console.log("updateTasklistOrder action.payload", action)

      const { draggableId, destination, source } = action.payload
      console.log(
        "updateTasklistOrder destination, source",
        destination,
        source
      )

      //find the list index of the source of the task
      let boardListIndex = state.boardLists.findIndex(
        (list) => list._id === source.droppableId
      )

      const index = source.index
      console.log(
        "boardListIndex ",
        boardListIndex,
        "source.Index",
        source.Index,
        "index",
        index
      )
      console.log(
        "state.boardLists.taskList",
        JSON.parse(JSON.stringify(state.boardLists[boardListIndex]))
      )

      //Remove the task from sourceIndex and store it
      const [movedTask] = state.boardLists[boardListIndex].taskList.splice(
        index,
        1
      )
      console.log(
        "updateTasklistOrder movedList",
        JSON.stringify(movedTask._id)
      )
      if (destination.droppableId !== source.droppableId) {
        // find the list index of the destination of the task if its a different list
        updatedBoardListSource = {
          _id: state.boardLists[boardListIndex]._id,
          taskListById: state.boardLists[boardListIndex].taskList.map((list) =>
            list._id.toString()
          ),
        }
        updatedTask = {
          _id: movedTask._id,
          list: destination.droppableId,
        }

        boardListIndex = state.boardLists.findIndex(
          (list) => list._id === destination.droppableId
        )
      }

      state.boardLists[boardListIndex].taskList.splice(
        destination.index,
        0,
        movedTask
      )

      const taskListById = state.boardLists[boardListIndex].taskList.map(
        (list) => list._id.toString()
      )
      updatedBoardListDestination = {
        _id: state.boardLists[boardListIndex]._id,
        taskListById,
      }

      console.log(
        "state.boardLists.taskList",
        JSON.parse(JSON.stringify(state.boardLists[boardListIndex]))
      )
    },
    updateBoardlist: (state, action) => {
      const updatedList = action.payload
      console.log("updateBoardlist", updatedList)
      const index = state.boardLists.findIndex(
        (list) => list._id === updatedList._id
      )
      console.log("updateBoardlist old", state)
      if (index !== -1) {
        state.boardLists[index] = updatedList
      }
      // saveTolocal(BuildBoardFromState(state))
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
      console.log("addTaskToBoard", action.payload)
      const task = {
        _id: nanoid(),
        taskTitle: "",
        taskboard: state._id,
        taskChecked: false,
        taskCover: "",
        position: action.payload.position,
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
      let updatedTask = action.payload
      console.log("updateTaskInBoard", updatedTask)
      if (updatedTask.title) {
        updatedTask = transformTaskFromBackend(updatedTask)
      }

      console.log("updateTaskInBoard transformTaskFromBackend", updatedTask)

      const boardListsIndex = state.boardLists.findIndex(
        (list) => list._id === updatedTask.taskList
      )
      // console.log("updateTaskInBoard boardListsIndex", boardListsIndex)
      if (boardListsIndex === -1) {
        return
      }
      const taskIndex = state.boardLists[boardListsIndex].taskList.findIndex(
        (task) => task._id === updatedTask._id
      )
      // console.log("updateTaskInBoard taskIndex", taskIndex)
      if (taskIndex === -1) {
        return
      }
      // const test = state
      // console.log("state",test)
      // console.log("found old task",state.boardLists[boardListsIndex].taskList[taskIndex])
      state.boardLists[boardListsIndex].taskList[taskIndex] = updatedTask

      // for (let list of state.boardLists) {
      //   const taskIndex = list.taskList.findIndex(
      //     (task) => task._id === convertedUpdatedTask._id
      //   )
      //   if (taskIndex !== -1) {
      //     list.taskList[taskIndex] = { ...convertedUpdatedTask }
      //     break
      //   }
      // }

      // const updatedBoard = BuildBoardFromState(state)

      // const clonedBoard = JSON.parse(JSON.stringify(updatedBoard))
      // saveTolocal(clonedBoard)
    },
    updatePreviewEditorPositon: (state, action) => {
      // console.log("updatePreviewEditorPositon", action.payload)
      state.previewEditorPositon = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(fetchBoardById.pending, (state) => {
      //   state.state = "loading"
      // })
      // .addCase(fetchBoardById.fulfilled, (state, action) => {
      //   const board = action.payload
      //   state.state = "success"
      //   state._id = board._id
      //   state.boardTitle = board.boardTitle
      //   state.slug = board.slug || ""
      //   state.boardLabels = board.boardLabels || []
      //   state.boardLists = board.boardLists || []
      //   const existing = state.boards?.filter((b) => b._id !== board._id) || []
      //   state.boards = [...existing, board]
      //   state.boardMembers = board.boardMembers || []
      // })
      // .addCase(fetchBoardById.rejected, (state, action) => {
      //   state.state = "failed"
      //   console.log("fetchBoardById error:", action.payload)
      //   state.error = action.payload
      // })
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
  updateboardFilter,
  updateBoardLabels,
  updatePreviewEditorPositon,
  updateBoardListOrder,
  updateTasklistOrder,
} = boardSlice.actions
export default boardSlice.reducer
