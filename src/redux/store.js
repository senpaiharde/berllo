import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import WorkSpaceReducer from './WorkSpaceSlice';
import TaskListReducer from './TaskListSlice';


export const Store = configureStore({
    reducer: {
        WorkSpaceReducer,
        TaskListReducer,
        taskReducer,
    },
});

export default Store;