import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateTaskInBoard } from './BoardSlice';
import api from '../api/api';
import backendHandler from '../services/backendHandler';


export const syncTaskAsync = createAsyncThunk(
  'taskDetails/sync',
  async ({ method, args }, { rejectWithValue, dispatch }) => {
    try {
        const workId = 'tasks' 
      const data = await   backendHandler({method, args, workId})
      
      if(method !== 'fetch')dispatch(updateTaskInBoard(data))
        return {method, data}
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || `${method} failed`);
    }
  }
);

const initialState = {
  selectedTask: null,
  isOpen: false,
  isWatching: false,
};

const taskDetailsSlice = createSlice({
  name: 'taskDetails',
  initialState,
  reducers: {
    openTaskDetails: (state, action) => {
      if (state.selectedTask?._id === action.payload._id) return;
      state.selectedTask = {
        ...action.payload,
        taskDueDate: action.payload.taskDueDate ?? null,
        reminderSettings: action.payload.reminderSetting ?? '5 minutes before',
        isDueComplete: action.payload.isDueComplete ?? false,
      };
      state.isOpen = true;
    },
    closeTaskDetails: (state) => {
      state.selectedTask = null;
      state.isOpen = false;
    },
    updateSelectedTaskLive(state, action) {
      if (state.selectedTask)
        Object.assign(state.selectedTask, action.payload);
    },
   
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(syncTaskAsync.fulfilled, (state,action) => {
        const {method, data} = action.payload
        switch(method){
            case'fetch':
             case'update':
              case'add':
              state.selectedTask = data;
              break;
              case 'delete':
                if(state.selectedTask?._id === data._id){
                    state.selectedTask = null;
                    state.isOpen = false
                }
                break;
        }
    })
  }
});

export const {
  openTaskDetails,
  closeTaskDetails,
  updateSelectedTaskLive,
} = taskDetailsSlice.actions;

export const liveUpdateTask = (fields) => (dispatch, getState) => {
  const { selectedTask } = getState().taskDetails;
  if (!selectedTask) return;

  /* 1 optimistic UI */
  dispatch(updateSelectedTaskLive(fields));

  /* 2 background sync */
  dispatch(
    syncTaskAsync({
      method: 'update',
      args: { taskId: selectedTask._id, body: fields },
    })
  );
};

export default taskDetailsSlice.reducer;