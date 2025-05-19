import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { saveTolocal } from '../services/storageService';
import api from '../api/api';

const fetchTasks = createAsyncThunk('task/fetch', async (listId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/lists/${listId}/tasks`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Fetch failed');
  }
});

const addTask = createAsyncThunk('task/add', async ({ listId, name }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/lists/${listId}/tasks`, { name });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'add failed');
  }
});

const deleteTask = createAsyncThunk(
  'task/delete',
  async ({ listId, taskId }, { rejectWithValue }) => {
    try {
      await api.delete(`/lists/${listId}/tasks/${taskId}`);
      return { taskId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'delete failed');
    }
  }
);

const updateTask = createAsyncThunk(
  'task/update',
  async ({ listId, taskId, ...update }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/lists/${listId}/tasks/${taskId}`, { update });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'delete failed');
    }
  }
);
const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskLocal: (state, action) => {
      state.push = {
        id: Date.now(),
        name: action.payload.name,
        listId: action.payload.listId,
      };

      saveTolocal({ tasks: state });
    },
    removeTaskLocal: (state, action) => {
      const updateTasks = state.filter((x) => x.id !== action.payload);
      saveTolocal({ tasks: updateTask });
      return updateTasks;
    },
    updateTaskLocal: (state, action) => {
      const task = state.find((x) => x.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
        saveTolocal({ tasks: state });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (_state, action) => {
        saveTolocal({ tasks: action.payload });
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
        saveTolocal({ tasks: state });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const idx = state.findIndex((t) => t.id === action.payload.taskId);
        if (!idx !== -1) state.splice(idx, 1);
        saveTolocal({ tasks: state });
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.findIndex((t) => t.id === action.payload.id);
        if (!idx !== -1) state[idx] = { ...state[idx], ...action.payload };
        saveTolocal({ tasks: state });
      });
  },
});

export const { addTaskLocal, removeTaskLocal, updateTaskLocal } = taskSlice.actions;

export default taskSlice.reducer;
export { fetchTasks, addTask, deleteTask, updateTask };
