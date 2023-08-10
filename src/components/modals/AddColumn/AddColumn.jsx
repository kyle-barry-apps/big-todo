import { useState, useContext, useEffect, useRef } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { BoardsContext } from "../../../contexts/BoardsContext";
import { useDispatch } from "react-redux";
import { addColumn } from "../../../features/boards/boardsSlice";
import "./addColumn.css";

const AddColumn = () => {
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);

  const [newColumnValue, setNewColumnValue] = useState({ name: "", tasks: [] });
  const [updatedBoard, setUpdatedBoard] = useState(activeBoard);

  const modal_ref = useRef();
  const dispatch = useDispatch();

  const handleSubmitNewColumn = (e) => {
    e.preventDefault();
    dispatch(
      addColumn({
        updatedBoard: {
          ...updatedBoard,
          columns: [...updatedBoard.columns, newColumnValue],
        },
        activeBoard,
      })
    );
    setActiveBoard({
      ...updatedBoard,
      columns: [...updatedBoard.columns, newColumnValue],
    });
    setNewColumnValue({ name: "", tasks: [] });
    setModal(null);
  };

  useEffect(() => {
    setUpdatedBoard(activeBoard);
  }, [activeBoard]);

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
    <div
      className={
        theme === "light" ? "modal-container light" : "modal-container"
      }
      ref={modal_ref}
    >
      <form className="addColumn-form">
        <input
          autoFocus
          value={newColumnValue.name}
          onChange={(e) =>
            setNewColumnValue({ name: e.target.value, tasks: [] })
          }
          className="addColumn-input"
          type="text"
        />
        <button
          type="submit"
          onClick={handleSubmitNewColumn}
          className="addColumn-btn btn"
        >
          Add Column
        </button>
      </form>
    </div>
  );
};

export default AddColumn;
