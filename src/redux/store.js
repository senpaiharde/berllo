import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
    reducer: {
        boards: boardReducer,
        lists: listReducer,
        tasks: taskReducer,
    },
});

export default store;