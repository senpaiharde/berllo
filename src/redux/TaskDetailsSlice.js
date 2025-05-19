import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateTaskInBoard } from './BoardSlice';

import backendHandler, { TaskOps } from '../services/backendHandler';
import { tr } from 'framer-motion/client';

export const syncTaskAsync = createAsyncThunk(
  'taskDetails/sync',
  async ({ method, args, workId }, { rejectWithValue, dispatch }) => {
    try {
      console.log(method, workId, args, 'update happens here', workId);
      const data = await backendHandler({ method, args, workId });
      console.log('syncTaskAsync data', data);
      if (method !== TaskOps.FETCH) dispatch(updateTaskInBoard(data));
      return { method, data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || `${method} failed`);
    }
  }
);

const initialState = {
  selectedTask: null,
  isOpen: false,
  isWatching: false,
  reminder: null,
  loading: false,
  error: null,
  taskDueDate: null,
};

const taskDetailsSlice = createSlice({
  name: 'taskDetails',
  initialState,
  reducers: {
    openTaskDetails: (state, action) => {
      if (state.selectedTask?._id === action.payload._id) return;
      state.selectedTask = {
        ...action.payload,
        taskDueDate: action.payload.taskDueDate ?? action.payload.dueDate ?? null,
        reminder: action.payload.reminder ?? null,
        isDueComplete: action.payload.isDueComplete ?? false,
        taskTitle: action.payload.taskTitle ?? '',
        isWatching: action.payload.isWatching ?? false,
        members: Array.isArray(action.payload.members) ? action.payload.members : [],
        checklist: Array.isArray(action.payload.checklist) ? action.payload.checklist : [],
      };
      state.isOpen = true;
    },
    closeTaskDetails: (state) => {
      state.selectedTask = null;
      state.isOpen = false;
    },
    updateSelectedTaskLive(state, action) {
      const payload = action.payload;
      console.log('updateSelectedTaskLive', action.payload);
      if (!state.selectedTask) return;

      if (payload.isDueComplete) {
        state.selectedTask.isDueComplete = payload.isDueComplete;
      }
      if (payload.taskTitle) {
        state.selectedTask.taskTitle = payload.taskTitle;
      }
      if (payload.reminder) {
        state.selectedTask.reminder = payload.reminder;
      }
      if (payload.taskDueDate) {
        state.selectedTask.taskDueDate = payload.taskDueDate;
      }
      if (payload.checklist) {
        state.selectedTask.checklist = payload.checklist;
      }
      if (payload.members) {
        state.selectedTask.members = payload.members;
      }
      if (payload.labels) {
        state.selectedTask.labels = payload.labels;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncTaskAsync.fulfilled, (state, action) => {
        state.loading = false;

        const { method, data } = action.payload;

        switch (method) {
          case TaskOps.FETCH:
            state.selectedTask = {
              ...data,
              taskDueDate: data.taskDueDate ?? data.dueDate ?? null,
              reminder: data.reminder ?? null,
              isDueComplete: data.isDueComplete ?? false,
            };
            state.isOpen = true;
            break;
          case TaskOps.UPDATE:
          case TaskOps.ADD:
            state.selectedTask = {
              ...state.selectedTask,
              ...data,
            };
            break;
          case TaskOps.DELETE:
            if (state.selectedTask?._id === data._id) {
              (state.selectedTask = null), (state.isOpen = false);
            }
            break;
          default:
            break;
        }
      })
      .addCase(syncTaskAsync.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload || action.error.message);
      });
  },
});

export const { openTaskDetails, closeTaskDetails, updateSelectedTaskLive } =
  taskDetailsSlice.actions;

let debounceId;
export const liveUpdateTask = (fields) => (dispatch, getState) => {
  const selectedTask = getState().taskDetailsReducer?.selectedTask;
  if (!selectedTask) return;

  console.log('liveUpdateTask fields ', fields);
  /* 1 optimistic UI */
  if (fields.isOpen === true) {
    console.log('updateSelectedTaskLive fields ', fields);
    dispatch(updateSelectedTaskLive(fields));
  }
  if (fields.isOpen === true) dispatch(updateTaskInBoard(fields));

  clearTimeout(debounceId);
  /* 2 background sync */
  console.log(fields.method, fields.workId, fields, 'liveupdatetask');
  debounceId = setTimeout(() => {
    dispatch(
      syncTaskAsync({
        method: fields.method,
        args: { taskId: selectedTask._id, body: fields },
        workId: fields.workId,
      })
    );
  }, 100);
};

export default taskDetailsSlice.reducer;
