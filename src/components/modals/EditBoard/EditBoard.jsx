import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { BoardsContext } from "../../../contexts/BoardsContext";
import { AiOutlinePlus } from "react-icons/ai";
import { updateBoard } from "../../../features/boards/boardsSlice";
import "../AddBoard/addBoard.css";
import "../modals.css";

const EditBoard = () => {
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);

  const [updatedBoard, setUpdatedBoard] = useState(activeBoard);

  const [newColumnToggle, setNewColumnToggle] = useState(false);
  const [newColumnValue, setNewColumnValue] = useState({ name: "", tasks: [] });
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  let modal_ref = useRef();

  const removeColumn = (index) => {
    const updatedColumns = [...updatedBoard.columns];
    updatedColumns.splice(index, 1);
    setUpdatedBoard({
      ...updatedBoard,
      columns: updatedColumns, // Assign the updated columns array to the 'columns' property
    });
  };

  const editBoard = () => {
    if (updatedBoard) {
      dispatch(updateBoard({ updatedBoard, activeBoard }));
      setActiveBoard(updatedBoard);
      setModal(null);
    }
  };

  const handleAddColumn = (e) => {
    setUpdatedBoard({
      ...updatedBoard,
      columns: [...updatedBoard.columns, newColumnValue],
    });
    setNewColumnToggle(false);
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

  return (
    <div
      className={
        theme === "light" ? "modal-container light" : "modal-container"
      }
      ref={modal_ref}
    >
      <div className="addBoard__title">Add New Board</div>
      <div className="addBoard__name-container">
        <div className="addBoard__name">Board Name</div>
        <input
          value={updatedBoard.name}
          onChange={(e) =>
            setUpdatedBoard({ ...updatedBoard, name: e.target.value })
          }
          className="addBoard__input"
          type="text"
          placeholder="e.g. Web Design"
        />
        {/* {<div className='boardName__error-message'>Can't be empty</div>} */}
      </div>
      <div className="addBoard__column-container">
        <span>Board Columns</span>
        {updatedBoard.columns.map((column, index) => {
          return (
            <div key={index} className="addBoard__column">
              <div className="addBoard__column-name">{column.name}</div>
              <div
                onClick={() => removeColumn(index)}
                className="addBoard__column-delete"
              >
                <img src="/assets/icon-cross.svg" alt="delete icon" />
              </div>
            </div>
          );
        })}
      </div>
      {newColumnToggle && (
        <div className="addBoard__column">
          <input
            className="addBoard__column-name"
            value={newColumnValue.name}
            onChange={(e) =>
              setNewColumnValue({ name: e.target.value, tasks: [] })
            }
            type="text"
            placeholder="e.g. Done"
          />
          <div onClick={handleAddColumn} className="addBoard__column-add">
            <AiOutlinePlus className="addBoard__column_icon" size={22} />
          </div>
        </div>
      )}
      <div
        onClick={() => setNewColumnToggle(!newColumnToggle)}
        className="btn add-new-column"
      >
        + Add New Column
      </div>
      <div onClick={editBoard} className="btn add-new-board">
        Save Changes
      </div>
    </div>
  );
};

export default EditBoard;
