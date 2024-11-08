import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import {
  fetchTasks,
  updateTaskStatusAsync,
  updateTaskStatus,
  addTaskAsync,
  optimisticAddTask,
} from "../features/taskSlice";
import TaskColumn from "./TaskColumn";
import ChatComponent from "./ChatComponent";
import {
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";

const Taskboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    status: "pending",
    description: "",
  });

  const isFormValid = newTask.title && newTask.description && newTask.status;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const columns = {
    pending: tasks.filter((task) => task.status === "pending") || [],
    ongoing: tasks.filter((task) => task.status === "ongoing") || [],
    completed: tasks.filter((task) => task.status === "completed") || [],
  };

  const onDragEnd = (result) => {
    const source = result?.source;
    const destination = result?.destination;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskToMove = { ...columns[source.droppableId][source.index] };
    taskToMove.status = destination.droppableId;

    dispatch(updateTaskStatus(taskToMove));
    dispatch(
      updateTaskStatusAsync({ _id: taskToMove._id, status: taskToMove.status })
    );
  };

  const handleAddTask = () => {
    dispatch(optimisticAddTask(newTask));
    dispatch(addTaskAsync(newTask));
    setIsAddTaskFormOpen(false);
    setNewTask({ title: "", status: "pending", description: "" });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          <div className="row gx-3">
            {Object.entries(columns).map(([status, tasks]) => (
              <TaskColumn key={status} status={status} tasks={tasks} />
            ))}
          </div>
        </div>
      </DragDropContext>

      {!isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <Fab
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "50%",
              width: 60,
              height: 60,
              boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.3)",
            }}
            onClick={() => setIsChatOpen(true)}
          >
            <ChatIcon />
          </Fab>
        </Box>
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: 100,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Fab
          sx={{
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: "50%",
            width: 60,
            height: 60,
            boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.3)",
          }}
          onClick={() => setIsAddTaskFormOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Dialog
        open={isAddTaskFormOpen}
        onClose={() => setIsAddTaskFormOpen(false)}
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <p className="text-danger">All fields are required *</p>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
          />
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            SelectProps={{
              native: true,
            }}
            required
          >
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTaskFormOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddTask}
            color="primary"
            disabled={!isFormValid}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      {isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            zIndex: 10000,
            width: 350,
            height: 400,
            overflow: "hidden",
          }}
        >
          <ChatComponent onClose={() => setIsChatOpen(false)} />
        </Box>
      )}
    </>
  );
};

export default Taskboard;
