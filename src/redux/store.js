import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import boardReducer from './boardSlice';
import listReducer from './listSlice';


export const store = configureStore({
    reducer: {
        boards: boardReducer,
        lists: listReducer,
        tasks: taskReducer,
    },
});

export default store;