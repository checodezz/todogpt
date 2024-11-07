import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { fetchTasks, updateTaskStatusAsync } from "../features/taskSlice";
import TaskCard from "./TaskCard";
import { updateTaskStatus } from "../features/taskSlice";
import ChatComponent from "./ChatComponent";

import { Box, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Taskboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const columns = {
    pending: tasks.filter((task) => task.status === "pending") || [],
    ongoing: tasks.filter((task) => task.status === "ongoing") || [],
    completed: tasks.filter((task) => task.status === "completed") || [],
  };

  if (!tasks) return null;

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

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          <div className="row">
            {Object.entries(columns).map(([status, tasks]) => (
              <TaskColumn key={status} status={status} tasks={tasks} />
            ))}
          </div>
        </div>
      </DragDropContext>

      {/* ChatComponent floating in the bottom-right corner */}
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
            onClick={() => setIsChatOpen(true)} // Open the chat on click
          >
            <ChatIcon />
          </Fab>
        </Box>
      )}

      {/* Render ChatComponent when it's open */}
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

const TaskColumn = ({ status, tasks }) => {
  return (
    <div className="col-md-4">
      <h2 className="text-center">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-light p-3 rounded task-column"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Taskboard;
