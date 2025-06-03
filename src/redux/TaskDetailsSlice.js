import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateTaskInBoard } from './BoardSlice';

import backendHandler, { TaskOps } from '../services/backendHandler';

export const syncTaskAsync = createAsyncThunk(
  'taskDetails/sync',
  async ({ method, args, workId }, { rejectWithValue, dispatch }) => {
    try {
      console.log(method, workId, args, 'update happens here', workId);

      const data = await backendHandler({ method, args, workId });
      
      console.log('syncTaskAsync data', data);

      // if (method === TaskOps.ADD) return;
      if (method === TaskOps.ADD && args.copying) {
        console.log(' syncTaskAsync TaskOps.ADD new task');
        return { method, data, workId, copying: args.copying };
      }

      if (method === TaskOps.ADD) return;

      if (method !== TaskOps.FETCH) dispatch(updateTaskInBoard(data));
      return { method, data, workId };
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
  copiedTask: false,
  activities: [],
  title: '',
  startDate: null,

  taskStartDate: null,
};

const taskDetailsSlice = createSlice({
  name: 'taskDetails',
  initialState,
  reducers: {
    taskUpdated(state, action) {
      if (state.selectedTask?._id === action.payload._id) {
        state.selectedTask = action.payload;
      }
    },
    openTaskDetails: (state, action) => {
      if (state.selectedTask?._id === action.payload._id) return;
      state.selectedTask = {
        ...action.payload,
        taskDueDate: action.payload.taskDueDate ?? action.payload.dueDate ?? null,
        startDate: action.payload.taskStartDate ?? action.payload.startDate ?? null,
        reminder: action.payload.reminder ?? null,
        isDueComplete: action.payload.isDueComplete ?? false,
        attachments: action.payload.attachments ?? [],
        title: action.payload.title ?? '',
        description: action.payload.description ?? '',

        activities: action.payload.activities ?? [],
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
    setCopiedTask: (state) => {
      state.selectedTask = null;
      state.isOpen = false;
    },
    updateSelectedTaskLive(state, action) {
      const payload = action.payload;
      console.log('state.tasktitle', JSON.parse(JSON.stringify(state)));
      console.log('updateSelectedTaskLive', action.payload);
      if (!state.selectedTask) return;

      if (payload.isDueComplete !== undefined) {
        state.selectedTask.isDueComplete = payload.isDueComplete;
      }
      if (payload.attachments !== undefined) {
        state.selectedTask.attachments = payload.attachments;
      }

      if (payload.cover !== undefined) {
        state.selectedTask.cover = payload.cover;
      }

      if (payload.taskStartDate || payload.startDate) {
        state.selectedTask.startDate =
          action.payload.taskStartDate ?? action.payload.startDate ?? null;
      }
      if (payload.taskDueDate || payload.dueDate) {
        state.selectedTask.taskDueDate =
          action.payload.taskDueDate ?? action.payload.dueDate ?? null;
      }
      if (payload.description) {
        state.selectedTask.description = payload.description;
      }
      if (payload.activities !== undefined) {
        state.selectedTask.activities = payload.activities;
      }

      if (payload.isWatching !== undefined) {
        state.selectedTask.isWatching = payload.isWatching;
      }
      if (payload.title !== undefined) {
        state.selectedTask.title = payload.title;
      }

      if (payload.reminder) {
        state.selectedTask.reminder = payload.reminder;
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

        const { method, data, workId, copying } = action.payload;

        console.log(state.selectedTask.isDueComplete, data.activities, data.isDueComplete);
        switch (method) {
          case TaskOps.FETCH:
            state.selectedTask = {
              ...data,
              taskDueDate: data.taskDueDate ?? data.dueDate ?? null,
              reminder: data.reminder ?? null,
              isDueComplete: data.isDueComplete ?? false,
              activities: data.activities ?? null,
            };

            state.isOpen = true;
            break;
          case TaskOps.UPDATE:
          case TaskOps.ADD:
            state.selectedTask = {
              ...state.selectedTask,
              ...data,
            };
            if (copying) state.copiedTask = copying;
            break;
          case TaskOps.DELETE:
            if (state.selectedTask?._id === data._id) {
              (state.selectedTask = null), (state.isOpen = false);
            }
            break;
          default:
            break;
        }

        if (method === TaskOps.FETCH && workId === 'activities') {
         
          state.activities = Array.isArray(data) ? data.slice(0, 30) : [];
          return;
        }
      })
      .addCase(syncTaskAsync.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload || action.error.message);
      });
  },
});

export const {
  Activity,
  activities,
  taskUpdated,
  openTaskDetails,
  closeTaskDetails,
  updateSelectedTaskLive,
  setCopiedTask,
} = taskDetailsSlice.actions;

let debounceId;
export const liveUpdateTask = (fields) => (dispatch, getState) => {
  const selectedTask = getState().taskDetailsReducer?.selectedTask;

  if (!selectedTask) return;

  console.log('liveUpdateTask fields ', fields);

  if (fields.isOpen === true) dispatch(updateTaskInBoard(fields));

  dispatch(updateSelectedTaskLive(fields));
  console.log(dispatch(updateSelectedTaskLive(fields)));
  clearTimeout(debounceId);

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

export const fetchTaskActivities = (fields) => async (dispatch, getState) => {
  const selectedTask = getState().taskDetailsReducer?.selectedTask;
  await dispatch(
    syncTaskAsync({
      method: fields.method,
      args: { taskId: selectedTask._id, body: fields },
      workId: fields.workId,
    })
  );
};

export default taskDetailsSlice.reducer;
