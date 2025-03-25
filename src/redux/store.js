import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import WorkSpaceReducer from './WorkSpaceSlice';
import TaskListReducer from './TaskListSlice';
import BoardReducer from './BoardSlice'


export const Store = configureStore({
    reducer: {
        WorkSpaceReducer,
        // TaskListReducer,
        // taskReducer,
        BoardReducer,
    },
});

export default Store;