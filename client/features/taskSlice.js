import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";


export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
    const response = await axios.get(`${API_URL}/api/tasks`);
    // console.log(response.data);
    return response.data
})


const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null
    },

    reducers: {
        updateTaskStatus: (state, action) => {
            const { _id, status } = action.payload
            console.log("reduce triggered", _id, status)
            const task = state.tasks.find(task => task._id === _id)
            if (task) {
                task.status = status
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const { updateTaskStatus } = taskSlice.actions
export default taskSlice.reducer;