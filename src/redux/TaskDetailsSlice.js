import { createSlice } from "@reduxjs/toolkit";
import { updateTaskInBoard } from "./BoardSlice";




const initialState = {
    selectedTask : null,
    isOpen: false,
    isWatching: false,
};


const taskDetailsSlice = createSlice({
    name:'taskDetails',
    initialState,
    reducers: {
        openTaskDetails: (state, action) => {
            state.selectedTask = action.payload;
            state.isOpen = true;
        },
        closeTaskDetails: (state) => {
            state.selectedTask = null;
            state.isOpen = false;
        },
        updateSelectedTaskLive: (state, action) => {
           if (state.selectedTask) {
            state.selectedTask = {
                ...state.selectedTask,
                ...action.payload,
            }
           }
        },
        addChecklistItem: (state, action) => {
            const newItem = {
              id: crypto.randomUUID(),
              text: action.payload,
              isDone: false,
            };
            if (!state.selectedTask.taskCheckList) {
              state.selectedTask.taskCheckList = [];
            }
            state.selectedTask.taskCheckList.push(newItem);
          },
          toogleChecklistItem: (state, action) => {
            const item = state.selectedTask.taskCheckList.find(x => x.id === action.payload);
            if(item) item.isDone = !item.isDone;
            
          },
          editChecklistItem: (state, action) => {
            const {id, text} = action.payload;
            const item = state.selectedTask.taskCheckList.find(i => i.id === id);
            if(item) item.text = text;
          },
          deleteChecklistItem: (state, action) => {
            state.selectedTask.taskCheckList = state.selectedTask.taskCheckList.filter(i => i.id === action.payload)
          },

    }
})

export const {openTaskDetails,
     closeTaskDetails,
      updateSelectedTaskLive,
    addChecklistItem,
     toogleChecklistItem,
editChecklistItem,
deleteChecklistItem,} = taskDetailsSlice.actions


export const liveUpdateTask = (updatedFields) => (dispatch, getState) => { 
    dispatch(updateSelectedTaskLive(updatedFields));

    const {selectedTask} = getState().taskDetailsReducer;;
    const updatedTask = {
        ...selectedTask,
        ...updatedFields,
    };
    dispatch(updateTaskInBoard(updatedTask));
}
export default taskDetailsSlice.reducer;