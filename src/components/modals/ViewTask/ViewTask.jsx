import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TaskContext } from "../../../contexts/TaskContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { BoardsContext } from "../../../contexts/BoardsContext";
import {
  changeColumn,
  updateBoard,
} from "../../../features/boards/boardsSlice";
import "./viewTask.css";

const ViewTask = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);
  const { activeTask, setActiveTask } = useContext(TaskContext);
  const [columnDropdownToggle, setColumnDropdownToggle] = useState(false);
  const [editTaskToggle, setEditTaskToggle] = useState(false);
  const modal_ref = useRef();
  const columnDropdownRef = useRef();
  const editTaskDropdownRef = useRef();

  const dispatch = useDispatch();

  const handleEditTask = () => {
    setModal("editTask");
  };

  const handleCheckboxChange = (event) => {
    const subtaskTitleElement = event.target
      .closest(".viewTask__subtask")
      .querySelector(".viewTask__subtask-title span");

    if (subtaskTitleElement) {
      subtaskTitleElement.classList.toggle(
        "checked-subtask-title",
        event.target.checked
      );

      const activeSubtask = activeTask.subtasks.find(
        (sub) => sub.title === subtaskTitleElement.innerHTML
      );

      const updatedSubtask = {
        ...activeSubtask,
        isCompleted: !activeSubtask.isCompleted,
      };

      const updatedTask = {
        ...activeTask,
        subtasks: activeTask.subtasks.map((subtask) => {
          return subtask.title === updatedSubtask.title
            ? updatedSubtask
            : subtask;
        }),
      };

      const activeColumn = activeBoard.columns.find(
        (col) => col.name === activeTask.status
      );

      const updatedColumn = {
        ...activeColumn,
        tasks: activeColumn.tasks.map((task) => {
          return task.title === updatedTask.title ? updatedTask : task;
        }),
      };

      const updatedBoard = {
        ...activeBoard,
        columns: activeBoard.columns.map((column) => {
          return column.name !== updatedColumn.name ? column : updatedColumn;
        }),
      };

      setActiveBoard(updatedBoard);
      setActiveTask(updatedTask);
      dispatch(updateBoard({ updatedBoard, activeBoard }));

      setColumnDropdownToggle(false);
      setEditTaskToggle(false);
    }
  };

  const handleDeleteTask = () => {
    const activeColumn = activeBoard.columns.find(
      (col) => col.name === activeTask.status
    );

    const updatedColumn = {
      ...activeColumn,
      tasks: activeColumn.tasks.filter((task) => {
        return task.title !== activeTask.title;
      }),
    };

    const updatedBoard = {
      ...activeBoard,
      columns: activeBoard.columns.map((column) => {
        return column.name !== updatedColumn.name ? column : updatedColumn;
      }),
    };

    setActiveBoard(updatedBoard);
    dispatch(updateBoard({ updatedBoard, activeBoard }));

    setColumnDropdownToggle(false);
    setEditTaskToggle(false);
    setModal(null);
  };

  const handleChangeColumn = (column) => {
    const updatedTask = { ...activeTask, status: column.name };
    const activeColumn = activeBoard.columns.find(
      (col) => col.name === activeTask.status
    );

    const updatedColumn = {
      ...activeColumn,
      tasks: activeColumn.tasks.filter(
        (task) => task.title !== updatedTask.title
      ),
    };

    const destinationColumn = activeBoard.columns.find(
      (col) => col.name === column.name
    );

    const updatedDestinationColumn = {
      ...destinationColumn,
      tasks: [...destinationColumn.tasks, updatedTask],
    };

    const updatedColumns = activeBoard.columns.map((col) => {
      if (col.name === activeTask.status) {
        return updatedColumn;
      } else if (col.name === column.name) {
        return updatedDestinationColumn;
      }
      return col;
    });

    // Create a new board object with the updated columns array
    const updatedBoard = { ...activeBoard, columns: updatedColumns };

    // Update the state with the new updatedBoard
    setActiveTask(updatedTask);
    setActiveBoard(updatedBoard);

    // Dispatch the updated board to the Redux store if you need to keep the state across the application
    dispatch(changeColumn(updatedBoard));
    setColumnDropdownToggle(false);
    setEditTaskToggle(false);
    setModal(null);
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
    if (editTaskDropdownRef.current) {
      const handler = (e) => {
        if (!editTaskDropdownRef.current.contains(e.target)) {
          setEditTaskToggle(false);
        }
      };

      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  }, [editTaskToggle, setEditTaskToggle]);

  useEffect(() => {
    if (columnDropdownRef.current) {
      const handler = (e) => {
        if (!columnDropdownRef.current.contains(e.target)) {
          setColumnDropdownToggle(false);
        }
      };

      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  }, [columnDropdownToggle, setColumnDropdownToggle]);

  return (
    <div
      ref={modal_ref}
      className={
        theme === "light" ? "modal-container light" : "modal-container"
      }
    >
      <div className="viewTask__title-container">
        <h2>{activeTask.title}</h2>
        <div
          className="viewTask__ellipsis"
          onClick={() => setEditTaskToggle(!editTaskToggle)}
        >
          <img src="./assets/icon-vertical-ellipsis.svg" alt="ellipsis" />
          {editTaskToggle && (
            <div className="viewTask__edit-dropdown" ref={editTaskDropdownRef}>
              <span className="viewTask__edit-task" onClick={handleEditTask}>
                Edit Task
              </span>
              <span
                onClick={handleDeleteTask}
                className="viewTask__delete-task"
              >
                Delete Task
              </span>
            </div>
          )}
        </div>
      </div>
      <p className="viewTask__description">{activeTask.description}</p>
      {activeTask.subtasks.length > 0 && (
        <div className="viewTask__subtask-container">
          <h2>
            Subtasks (
            {
              activeTask.subtasks.filter(
                (subtask) => subtask.isCompleted === true
              ).length
            }{" "}
            of {activeTask.subtasks.length})
          </h2>
          <div className="viewTask__subtasks-list">
            {activeTask.subtasks.map((subtask, index) => {
              const checkboxId = "checkbox" + index;

              return (
                <div className="viewTask__subtask" key={index}>
                  <div className="viewTask__checkbox-container">
                    <input
                      className="viewTask__checkbox"
                      type="checkbox"
                      id={checkboxId}
                      onChange={handleCheckboxChange}
                      checked={subtask.isCompleted}
                    />
                    <label htmlFor={checkboxId}></label>
                  </div>
                  <div className="viewTask__subtask-title">
                    <span
                      className={
                        subtask.isCompleted ? "checked-subtask-title" : ""
                      }
                    >
                      {subtask.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="viewTask__column">
        <h2>Current Status</h2>
        <div
          onClick={() => setColumnDropdownToggle(!columnDropdownToggle)}
          className={
            columnDropdownToggle
              ? "viewTask__columnName active"
              : "viewTask__columnName"
          }
        >
          <span>{activeTask.status}</span>
          <img src="/assets/icon-chevron-down.svg" alt="chevron down icon" />
          {columnDropdownToggle && (
            <div className="viewTask__columnDropdown" ref={columnDropdownRef}>
              <ul className="viewTask__columnDropdown-list">
                {activeBoard.columns.map((column, index) => {
                  if (column.name === activeTask.status) {
                    return null;
                  }
                  return (
                    <li key={index} onClick={() => handleChangeColumn(column)}>
                      {column.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
