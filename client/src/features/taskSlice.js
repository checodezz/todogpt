import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/tasks`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
        }
    }
);

export const updateTaskStatusAsync = createAsyncThunk(
    "tasks/updateTaskStatusAsync",
    async ({ _id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/api/tasks/${_id}`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update task status");
        }
    }
);

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
                state.loading = true;
                state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTaskStatusAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
                state.loading = false;
                const { _id, status } = action.payload;
                console.log(_id, status)
            })
    }
})

export const { updateTaskStatus } = taskSlice.actions
export default taskSlice.reducer;