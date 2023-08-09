import { useRef, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BoardsContext } from "../../../contexts/BoardsContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { TaskContext } from "../../../contexts/TaskContext";
import { updateBoard } from "../../../features/boards/boardsSlice";

import { AiOutlinePlus } from "react-icons/ai";
import "../AddTask/addTask.css";
import "../ViewTask/viewTask.css";
import "../AddBoard/addBoard.css";
import "./editTask.css";

const EditTask = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);
  const { activeTask } = useContext(TaskContext);

  const [taskTitle, setTaskTitle] = useState(activeTask.title);
  const [description, setDescription] = useState(activeTask.description);
  const [status, setStatus] = useState(
    activeBoard.columns.length > 0 ? activeBoard.columns[0].name : ""
  );
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

  const createNewTask = () => {
    const newTask = {
      title: taskTitle,
      description: description,
      subtasks: subtasks,
      status: status,
    };

    const updatedColumns = activeBoard.columns.map((column) => {
      if (column.name === newTask.status) {
        const updatedTasks = [...column.tasks, newTask];
        return { ...column, tasks: updatedTasks };
      }
      return column;
    });

    const updatedBoard = {
      ...activeBoard,
      columns: updatedColumns,
    };

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
    if (statusDropdown.current) {
      const handler = (e) => {
        if (!statusDropdown.current.contains(e.target)) {
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
    <div className="modal-container" ref={modal_ref}>
      <div className="addBoard__title">Edit Task</div>
      <div className="addBoard__name-container">
        <div className="addBoard__name">Title</div>
        <input
          className="addBoard__input"
          type="text"
          placeholder="e.g. Take a coffee break"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className="addTask__description-container">
        <span>Description</span>
        <textarea
          className="addTask__description"
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
                <div className="addBoard__column-name">{subtask.title}</div>
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
            className="addBoard__column-name"
            type="text"
            placeholder=""
          />
          <div onClick={handleAddSubtask} className="addBoard__column-add">
            <AiOutlinePlus className="addBoard__column_icon" size={22} />
          </div>
        </div>
      )}
      <div
        onClick={() => setNewSubtaskToggle(!newSubtaskToggle)}
        className="btn add-new-column"
      >
        + Add New Subtask
      </div>
      <div className="viewTask__column">
        <span>Status</span>
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
          {statusDropdown && (
            <div className="viewTask__columnDropdown" ref={statusDropdownRef}>
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
      <div onClick={createNewTask} className="btn add-new-board">
        Create Task
      </div>
    </div>
  );
};

export default EditTask;
