import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../../../contexts/TaskContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { BoardsContext } from "../../../contexts/BoardsContext";
import "./viewTask.css";

const ViewTask = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);
  const { activeTask, setActiveTask } = useContext(TaskContext);

  const [columnDropdownToggle, setColumnDropdownToggle] = useState(false);

  console.log(activeTask);

  const modal_ref = useRef();

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

  return (
    <div ref={modal_ref} className="modal-container">
      <div className="viewTask__title-container">
        <h2>{activeTask.title}</h2>
        <div className="viewTask__ellipsis">
          <img src="./assets/icon-vertical-ellipsis.svg" alt="ellipsis" />
        </div>
      </div>
      <p className="viewTask__description">{activeTask.description}</p>
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
                  />
                  <label htmlFor={checkboxId}></label>
                </div>
                <div className="viewTask__subtask-title">
                  <span>{subtask.title}</span>
                </div>
              </div>
            );
          })}
        </div>
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
              <div className="viewTask__columnDropdown">
                <u className="viewTask__columnDropdown-list">
                  {activeBoard.columns.map((column, index) => {
                    return <li>{column.name}</li>;
                  })}
                </u>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
