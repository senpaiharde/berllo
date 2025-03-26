import { createSlice } from "@reduxjs/toolkit";
import { updateTaskInBoard } from "./BoardSlice";




const initialState = {
    selectedTask : null,
    isOpen: false,
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
            const updatedFields = action.payload;
           state.selectedTask = {
            ...state.selectedTask,
            ...updatedFields,
           }
        },
        
    }
})

export const {openTaskDetails, closeTaskDetails, updateSelectedTaskLive} = taskDetailsSlice.actions

// we are gonna call this function on despatch to update taskdetailsslice and the the boardslice
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