import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import {
  getLocalData,
  saveTolocal,
  getBoardById,
} from "../services/storageService";

// ✅ Async action to fetch board by ID from localStorage
export const fetchBoardById = createAsyncThunk(
  "board/fetchBoardById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getBoardById(id);
      console.log("fetchBoardById → requested ID:", id, "→ found board:", data);
      if (!data) throw new Error("Board not found");
      return data;
    } catch (error) {
      console.log("fetchBoards error:", error);
      return rejectWithValue(error.message);
    }
  }
);

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
      };
      state.boards.push(newBoard);
      saveTolocal({ boards: state.boards });
    },
    removeboard: (state, action) => {
      state.boards = state.boards.filter((x) => x.id !== action.payload);
      saveTolocal({ boards: state.boards });
    },
    updateboardName: (state, action) => {
      const board = state.boards.find((x) => x.id === action.payload.id);
      if (board) {
        board.name = action.payload.name;
        saveTolocal({ boards: state.boards });
      }
    },
    deleteBoardlist: (state, action) => {
      // Reserved for future logic — no change
    },
    updateTaskInBoard: (state, action) => {
      const updatedTask = action.payload;
      for (let list of state.boardLists) {
        const taskIndex = list.taskList.findIndex(
          (task) => task._id === updatedTask._id
        );
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
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardById.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        const board = action.payload;
        state.state = "success";
        state._id = board._id;
        state.boardTitle = board.boardTitle;
        state.slug = board.slug || ""; // fallback if undefined
        state.boardLists = board.boardLists || [];
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addboard,
  removeboard,
  updateboardName,
  updateTaskInBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
