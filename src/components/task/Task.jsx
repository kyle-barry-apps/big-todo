import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { TaskContext } from "../../contexts/TaskContext";
import "./task.css";

const Task = ({ task }) => {
  const { modal, setModal } = useContext(ModalContext);
  const { activeTask, setActiveTask } = useContext(TaskContext);

  const handleViewTask = () => {
    setActiveTask(task);
    setModal("viewTask");
  };

  const completedSubtasks = task.subtasks.filter((subtask) => {
    return subtask.isCompleted === true;
  });

  return (
    <div onClick={handleViewTask} className="task">
      <div className="task__title">{task.title}</div>
      <div className="task__subtasks">
        {completedSubtasks.length} of {task.subtasks.length}{" "}
        {task.subtasks.length === 1 ? "subtask" : "subtasks"}
      </div>
    </div>
  );
};

export default Task;
