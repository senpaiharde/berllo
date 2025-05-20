import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import workSpaceReducer from './WorkSpaceSlice';
import taskListReducer from './TaskListSlice';
import boardReducer from './BoardSlice';
import taskDetailsReducer from './TaskDetailsSlice'; 


export const Store = configureStore({
  reducer: {
    workSpaceReducer,
    taskListReducer,
    taskReducer,
    boardReducer,
    taskDetailsReducer,
  },
});

export default Store;
