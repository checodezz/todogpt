import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { fetchTasks, updateTaskStatusAsync } from "../features/taskSlice";
import TaskCard from "./TaskCard";
import { updateTaskStatus } from "../features/taskSlice";

const Taskboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

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

    // console.log(source);
    // console.log(destination);

    console.log("Source Droppable ID:", source.droppableId);
    console.log("Destination Droppable ID:", destination?.droppableId);

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskToMove = { ...columns[source.droppableId][source.index] };
    taskToMove.status = destination.droppableId;

    // console.log(taskToMove);

    dispatch(updateTaskStatus(taskToMove));
    dispatch(
      updateTaskStatusAsync({ _id: taskToMove._id, status: taskToMove.status })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="row">
          {Object.entries(columns).map(([status, tasks]) => (
            <TaskColumn key={status} status={status} tasks={tasks} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

// TaskColumn Component defined within the same file
const TaskColumn = ({ status, tasks }) => {
  console.log(
    "Task IDs in the column:",
    tasks.map((task) => task._id)
  );
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
              <TaskCard key={task.status} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Taskboard;
