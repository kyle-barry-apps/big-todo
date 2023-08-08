import { useRef, useContext, useEffect, useState } from "react";
import { BoardsContext } from "../../../contexts/BoardsContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { AiOutlinePlus } from "react-icons/ai";
import "./addTask.css";
import "../AddBoard/addBoard.css";

const AddTask = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newSubtaskToggle, setNewSubtaskToggle] = useState(false);

  const [subtasks, setSubtasks] = useState([]);

  const modal_ref = useRef();

  const handleAddSubtask = () => {};

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
    <div className="modal-container" ref={modal_ref}>
      <div className="addBoard__title">Add New Task</div>
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
      {newSubtaskToggle && (
        <div className="addBoard__column">
          <input
            className="addBoard__column-name"
            type="text"
            placeholder="e.g. Done"
          />
          <div onClick={handleAddSubtask} className="addBoard__column-add">
            <AiOutlinePlus className="addBoard__column_icon" size={22} />
          </div>
        </div>
      )}
      <div className="btn add-new-column">+ Add New Subtask</div>
      <div className="btn add-new-board">Create Task</div>
    </div>
  );
};

export default AddTask;
