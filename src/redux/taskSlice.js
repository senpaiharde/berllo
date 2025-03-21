import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers: {
        addTask: (state,action) => {
            const newTask = {
                id:Date.now(),
                name:action.payload.name,
                listId : action.payload.listId,
            };
            state.push(newTask);
            localStorage.setItem('tasks',JSON.stringify(state));
        },
        removeTask : (state, action) => {
            const updateTasks = state.filter(x => x.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(updateTasks))
            return updateTasks;
        },
        updateTask: (state, action) => {
            const task = state.find(x => x.id === action.payload.id);
            if(task){
                task.name = action.payload.name;
                localStorage.setItem('tasks', JSON.stringify(state));
            }
        },
    },
});


export const {addTask, removeTask, updateTask} = taskSlice.actions;

export default taskSlice.reducer;