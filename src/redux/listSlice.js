import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getLocalData, saveTolocal } from "../services/storageService";






export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
    const data = await getLocalData();
    return data.lists;

});


const listSlice = createSlice({
    name:'lists',
    initialState: {
        lists:[],
        state:'idle',
        error:null,
    },
    reducers: {
        addList : (state,action) => {
            const newList = {
                id: Date.now().toString(),
                boardId:action.payload.boardId, // links list to its own board
                name: action.payload.name,
                tasks: [],
            };
            state.lists.push(newList);
            saveTolocal({list:state.lists});

        },
        removeList: (state,action) => {
            state.lists =state.lists.filter(x => x.id !== action.payload);
            saveTolocal({lists:state.lists})
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLists.pending, (state) => {
            state.action = 'loading';
        })
        .addCase(fetchLists.fulfilled, (state,action) => {
            state.action = 'succeeded';
            state.lists = action.payload;
        })
        .addCase(fetchLists.rejected, (state,action) => {
            state.action = 'failed';
            state.error = action.error.message;
        });
    },
});


export const {addList, removeList} = listSlice.actions
export default listSlice.reducer;