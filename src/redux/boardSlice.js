import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalData, saveTolocal } from "../services/storageService";






// Async action to fetch boards from localStorage or JSON
export const fetchBoards = createAsyncThunk('board/fetchBoards', async () => {
    const data = await getLocalData();
    return data.boards;
})


const boardSlice = createSlice({
    name:'boards',
    initialState:{
        boards:[],
        state:'idle',
        error:null,
    },
    reducers:{
        addBoard : (state,action) => {
        const newBoard = {
            id:Date.now().toString(),
            name:action.payload,
            lists:[],
            users:[],
        };
        state.boards.push(newBoard);
        saveTolocal({boards:state.boards});
    },
    removeBoard:(state,action) => {
        state.boards = state.boards.filter(x => x.id !== action.payload);
        saveTolocal({boards: state.boards});
    },
    updateBoardName : (state,action) => {
        const board = state.boards.find((x) => x.id === action.payload.id);
        if(board) {
            board.name = action.payload.name;
            saveTolocal({boards:state.boards});
        }
    },

        
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchBoards.pending, (state) => {
            state.action = 'loading';
        })
        .addCase(fetchBoards.fulfilled, (state,action) => {
            state.action = 'succeeded';
            state.boards = action.payload;
        })
        .addCase(fetchBoards.rejected, (state,action) => {
            state.action = 'failed';
            state.error = action.error.message;
        });
    },
});


export const {addBoard, removeBoard, updateBoardName} = boardSlice.actions;
export default boardSlice.reducer;