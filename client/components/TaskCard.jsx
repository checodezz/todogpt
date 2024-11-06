import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index }) => {
  // Log the draggableId (task._id) for debugging
  console.log("Task ID:", task._id); // You can log task._id or draggableId here
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card mb-2"
        >
          <div className="card-body">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
