import { createAsyncThunk, createSlice,nanoid} from "@reduxjs/toolkit";
import { getLocalData, saveTolocal } from "../services/storageService";






// export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
//     const data = await getLocalData();
//     return data.lists;

// });


const listSlice = createSlice({
    name:'list',
    initialState: {
        _id:"",
        taskListTitle: "",
        taskListBoard: "",
        taskList:[],
        state:'idle',
        error:null,
    },
    reducers: {
        addList : (state,action) => {
            console.log("addList action.payload",action.payload.board,action.payload.title)
            state._id = nanoid()
            state.taskListBoard = action.payload.board
            state.taskListTitle = action.payload.title
            //saveTolocal({list:state.lists});

        },
        addTask : (state,action) => {
            console.log("addList action.payload",action.payload.board,action.payload.title)
            state._id = nanoid()
            state.taskListBoard = action.payload.board
            state.taskListTitle = action.payload.title
            //saveTolocal({list:state.lists});

        },
        removeList: (state,action) => {
            state.lists =state.lists.filter(x => x.id !== action.payload);
            //saveTolocal({lists:state.lists})
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(fetchLists.pending, (state) => {
    //         state.action = 'loading';
    //     })
    //     .addCase(fetchLists.fulfilled, (state,action) => {
    //         state.action = 'succeeded';
    //         state.lists = action.payload;
    //     })
    //     .addCase(fetchLists.rejected, (state,action) => {
    //         state.action = 'failed';
    //         state.error = action.error.message;
    //     });
    // },
});


export const {addList, removeList,addTask} = listSlice.actions
export default listSlice.reducer;