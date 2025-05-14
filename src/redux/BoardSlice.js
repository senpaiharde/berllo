import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService"


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
    slug: "", 
    isStarred: null,
    boardLists: [],
    boards: [], 
    state: "idle",
    error: null,
    activeBoard: null,
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
      saveTolocal({ 
        _id: state._id,
        boardTitle: state.boardTitle,
        isStarred: state.isStarred,
        boardLists: state.boardLists,
        boards: state.boards,
    });
    },
    removeboard: (state, action) => {
        state.boards = state.boards.filter((x) => x._id !== action.payload);
        saveTolocal({ 
            _id: state._id,
            boardTitle: state.boardTitle,
            isStarred: state.isStarred,
            boardLists: state.boardLists,
            boards: state.boards,
        });
    },
    updateStarStatus: (state, action) => {
        state.isStarred = action.payload;
        saveTolocal({ 
            _id: state._id,
            boardTitle: state.boardTitle,
            isStarred: state.isStarred,
            boardLists: state.boardLists,
            boards: state.boards,
        });
    },
    updateboardTitle: (state, action) => {
        state.boardTitle = action.payload;
        saveTolocal({ 
            _id: state._id,
            boardTitle: state.boardTitle,
            isStarred: state.isStarred,
            boardLists: state.boardLists,
            boards: state.boards,
        });
    },
    addBoardList: (state, action) => {
        const newList = {
            _id: nanoid(),
            taskListTitle: "",
            taskListBoard: state._id,
            taskList: [],
            state: "idle",
            error: null,
        };
        state.boardLists.push(newList);
        saveTolocal({ 
            _id: state._id,
            boardTitle: state.boardTitle,
            isStarred: state.isStarred,
            boardLists: state.boardLists,
            boards: state.boards,
        });
    },
    updateBoardlist: (state, action) => {
        const updatedList = action.payload;
        const index = state.boardLists.findIndex((list) => list._id === updatedList._id);
        if (index !== -1) {
            state.boardLists[index] = updatedList;
        }
        saveTolocal({ 
            _id: state._id,
            boardTitle: state.boardTitle,
            isStarred: state.isStarred,
            boardLists: state.boardLists,
            boards: state.boards,
        });
    },
    removeBoardListFromBoard: (state, action) => {
        const newBoardLists = state.boardLists.filter((list) => list._id !== action.payload);
        state.boardLists = newBoardLists;
        saveTolocal({ 
            _id: state._id,
            boardTitle: state.boardTitle,
            isStarred: state.isStarred,
            boardLists: state.boardLists,
            boards: state.boards,
        });
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
        state.boardLists[index].taskList = state.boardLists[index].taskList.filter(
          (task) => task._id !== action.payload._id
        )
      }
      saveTolocal({ 
        _id: state._id,
        boardTitle: state.boardTitle,
        isStarred: state.isStarred,
        boardLists: state.boardLists,
        boards: state.boards,
    });
    },
    updateTaskInBoard: (state, action) => {
        const updatedTask = action.payload;
      
        for (let list of state.boardLists) {
          const taskIndex = list.taskList.findIndex(
            (task) => task._id === updatedTask._id
          );
          if (taskIndex !== -1) {
            list.taskList[taskIndex] = { ...updatedTask };
            break;
          }
        }
      
        const updatedBoard = {
          _id: state._id,
          boardTitle: state.boardTitle,
          isStarred: state.isStarred,
          boardLists: state.boardLists,
        };
      
        
        const clonedBoard = JSON.parse(JSON.stringify(updatedBoard));
        saveTolocal(clonedBoard);
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
        state.boardLists = board.boardLists || []
        const existing = state.boards?.filter((b) => b._id !== board._id) || [];
        state.boards = [...existing, board];
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.state = "failed"
        console.log("fetchBoardById error:", action.payload)
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
  updatePreviewEditorPositon,
} = boardSlice.actions
export default boardSlice.reducer
