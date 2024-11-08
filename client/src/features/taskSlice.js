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

export const addTaskAsync = createAsyncThunk("tasks/addTask", async (task, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/tasks`, task);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add task");
    }
});


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

export const deleteTaskAsync = createAsyncThunk(
    "tasks/deleteTask",
    async (_id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/tasks/${_id}`);
            return _id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete task");
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
        optimisticAddTask: (state, action) => {
            state.tasks.push(action.payload);
            state.addedTask = action.payload;
        },

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

            .addCase(addTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.tasks.push(action.payload);
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
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
            .addCase(updateTaskStatusAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            })
            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const { updateTaskStatus, optimisticAddTask } = taskSlice.actions
export default taskSlice.reducer;