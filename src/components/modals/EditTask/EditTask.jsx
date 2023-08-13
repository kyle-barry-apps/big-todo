import React, { useRef, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BoardsContext } from "../../../contexts/BoardsContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { TaskContext } from "../../../contexts/TaskContext";
import { updateBoard } from "../../../features/boards/boardsSlice";
import { AiOutlinePlus } from "react-icons/ai";
import "../AddTask/addTask.css";
import "../ViewTask/viewTask.css";
import "../AddBoard/addBoard.css";
import "./editTask.css";

const EditTask = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);
  const { activeTask } = useContext(TaskContext);

  const [taskTitle, setTaskTitle] = useState(activeTask.title);
  const [description, setDescription] = useState(activeTask.description);
  const [status, setStatus] = useState(activeTask ? activeTask.status : "");
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [newSubtaskToggle, setNewSubtaskToggle] = useState(false);
  const [newSubtask, setNewSubtask] = useState({
    title: "",
    isCompleted: false,
  });
  const [subtasks, setSubtasks] = useState(activeTask.subtasks);

  const dispatch = useDispatch();

  const modal_ref = useRef();
  const statusDropdownRef = useRef();

  const editTask = () => {
    const updatedTask = {
      title: taskTitle,
      description: description,
      subtasks: subtasks,
      status: status,
    };

    const updatedColumns = activeBoard.columns.map((column) => {
      if (activeTask.status === updatedTask.status) {
        // User didn't change the status, so simply update the task details
        const updatedTasks = column.tasks.map((task) =>
          task.title === activeTask.title ? updatedTask : task
        );
        return { ...column, tasks: updatedTasks };
      } else if (column.name === activeTask.status) {
        // Remove the task from the old status column
        const updatedTasks = column.tasks.filter(
          (task) => task.title !== activeTask.title
        );
        return { ...column, tasks: updatedTasks };
      } else if (column.name === updatedTask.status) {
        // Add the task to the new status column
        const updatedTasks = [...column.tasks, updatedTask];
        return { ...column, tasks: updatedTasks };
      } else {
        return column;
      }
    });

    const updatedBoard = {
      ...activeBoard,
      columns: updatedColumns,
    };

    console.log(updatedBoard);

    setActiveBoard(updatedBoard);
    dispatch(updateBoard({ updatedBoard, activeBoard }));
    setStatusDropdown(false);
    setModal(null);
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtask({ title: "", isCompleted: false });
    setNewSubtaskToggle(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!modal_ref.current.contains(e.target)) {
        setModal(null);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [modal, setModal]);

  useEffect(() => {
    if (statusDropdownRef.current) {
      const handler = (e) => {
        if (!statusDropdownRef.current.contains(e.target)) {
          setStatusDropdown(false);
        }
      };

      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  }, [statusDropdown, setStatusDropdown]);

  return (
    <div
      className={
        theme === "light" ? "modal-container light" : "modal-container"
      }
      ref={modal_ref}
    >
      <div className="addBoard__title">Edit Task</div>
      <div className="addBoard__name-container">
        <div className="addBoard__name">Title</div>
        <input
          className={
            theme === "light" ? "addBoard__input light" : "addBoard__input"
          }
          type="text"
          placeholder="e.g. Take a coffee break"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className="addTask__description-container">
        <span>Description</span>
        <textarea
          className={
            theme === "light"
              ? "addTask__description light"
              : "addTask__description"
          }
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="addBoard__column-container">
        <span>Subtasks</span>
        {subtasks.length > 0 &&
          subtasks.map((subtask, index) => {
            return (
              <div key={index} className="addBoard__column">
                <div
                  className={
                    theme === "light"
                      ? "addBoard__column-name light"
                      : "addBoard__column-name"
                  }
                >
                  {subtask.title}
                </div>
                <div
                  onClick={() => removeSubtask(index)}
                  className="addBoard__column-delete"
                >
                  <img src="/assets/icon-cross.svg" alt="delete icon" />
                </div>
              </div>
            );
          })}
      </div>
      {newSubtaskToggle && (
        <div className="addBoard__column">
          <input
            value={newSubtask.title}
            onChange={(e) =>
              setNewSubtask({ title: e.target.value, isCompleted: false })
            }
            className={
              theme === "light"
                ? "addBoard__column-name light"
                : "addBoard__column-name"
            }
            type="text"
            placeholder="e.g. Get busy!"
          />
          <div onClick={handleAddSubtask} className="addBoard__column-add">
            <AiOutlinePlus className="addBoard__column_icon" size={24} />
          </div>
        </div>
      )}
      <div
        onClick={() => setNewSubtaskToggle(!newSubtaskToggle)}
        className={
          theme === "light" ? "btn add-new-column light" : "btn add-new-column"
        }
      >
        + Add New Subtask
      </div>
      <div className="viewTask__column">
        <span>Status</span>
        <div className="viewTask__columnDropdownContainer">
          <div
            onClick={() => setStatusDropdown(!statusDropdown)}
            className={
              statusDropdown
                ? "viewTask__columnName active"
                : "viewTask__columnName"
            }
          >
            <span>{status}</span>
            <img src="/assets/icon-chevron-down.svg" alt="chevron down icon" />
          </div>
          {statusDropdown && (
            <div
              className={
                theme === "light"
                  ? "viewTask__columnDropdown light"
                  : "viewTask__columnDropdown"
              }
              ref={statusDropdownRef}
            >
              <ul className="viewTask__columnDropdown-list">
                {activeBoard.columns.map((column, index) => {
                  if (column.name === status) {
                    return null;
                  }
                  return (
                    <li key={index} onClick={() => setStatus(column.name)}>
                      {column.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div onClick={editTask} className="btn add-new-board">
        Save Changes
      </div>
    </div>
  );
};

export default EditTask;
