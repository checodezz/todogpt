import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, tasks }) => {
  const statusClass = {
    pending: "text-danger",
    ongoing: "text-primary",
    completed: "text-success",
  }[status];

  return (
    <div className="col-md-4 mb-5">
      <h1
        className={`text-center pb-3 ${statusClass} p-3`}
        style={{ marginBottom: "20px" }}
      >
        {status.charAt(0).toUpperCase() +
          status.slice(1) +
          ` (${tasks.length})`}
      </h1>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-body-tertiary p-3 rounded task-column"
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

export default TaskColumn;
