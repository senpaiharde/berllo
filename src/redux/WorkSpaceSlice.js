import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalData, saveTolocal } from "../services/storageService";






// Async action to fetch workSpaces from localStorage or JSON
export const fetchWorkSpaces = createAsyncThunk('workSpace/fetchworkSpaces', async (_, {rejectWithValue}) => {
    try {
        // const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        const data = await getLocalData();
        if (!data) {
            throw new Error('Server Error!');
        }
        console.log(data)
        
        return data.workSpaces;
    } catch (error) {
        return rejectWithValue(error.message);
    }
    
    
})


const workSpaceSlice = createSlice({
    name:'workSpace',
    initialState:{
        workSpaces:[],
        state:'idle',
        error:null,
    },
    reducers:{
        addworkSpace : (state,action) => {
        const newworkSpace = {
            id:Date.now().toString(),
            name:action.payload,
            lists:[],
            users:[],
        };
        state.workSpaces.push(newworkSpace);
        saveTolocal({workSpaces:state.workSpaces});
    },
    removeworkSpace:(state,action) => {
        state.workSpaces = state.workSpaces.filter(x => x.id !== action.payload);
        saveTolocal({workSpaces: state.workSpaces});
    },
    updateworkSpaceName : (state,action) => {
        const workSpace = state.workSpaces.find((x) => x.id === action.payload.id);
        if(workSpace) {
            workSpace.name = action.payload.name;
            saveTolocal({workSpaces:state.workSpaces});
        }
    },

        
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchWorkSpaces.pending, (state) => {
            state.action = 'loading';
        })
        .addCase(fetchWorkSpaces.fulfilled, (state,action) => {
            state.action = 'succeeded';
            state.workSpaces = action.payload;
            console.log("fetchworkSpaces.fulfilled")
        })
        .addCase(fetchWorkSpaces.rejected, (state,action) => {
            state.action = 'failed';
            state.error = action.error.message;
            console.log("fetchworkSpaces.rejected")
        });
    },
});


export const {addworkSpace, removeworkSpace, updateworkSpaceName} = workSpaceSlice.actions;
export default workSpaceSlice.reducer;