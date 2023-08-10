import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addBoard } from "../../../features/boards/boardsSlice";
import { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AiOutlinePlus } from "react-icons/ai";
import "./addBoard.css";
import "../modals.css";

const AddBoard = () => {
  const [boardName, setBoardName] = useState("");

  const [columns, setColumns] = useState([
    { name: "Todo", tasks: [] },
    { name: "Doing", tasks: [] },
  ]);
  const [newColumnToggle, setNewColumnToggle] = useState(false);
  const [newColumnValue, setNewColumnValue] = useState({ name: "", tasks: [] });
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  let modal_ref = useRef();

  const removeColumn = (index) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };

  const createBoard = () => {
    if (boardName) {
      dispatch(addBoard({ name: boardName, columns: columns }));
      setModal(null);
    }
  };

  const handleAddColumn = (e) => {
    setColumns([...columns, newColumnValue]);
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
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className={
            theme === "light" ? "addBoard__input light" : "addBoard__input"
          }
          type="text"
          placeholder="e.g. Web Design"
        />
      </div>
      <div className="addBoard__column-container">
        <span>Board Columns</span>
        {columns.map((column, index) => {
          return (
            <div
              key={index}
              className={
                theme === "light"
                  ? "addBoard__column light"
                  : "addBoard__column"
              }
            >
              <div
                className={
                  theme === "light"
                    ? "addBoard__column-name light"
                    : "addBoard__column-name"
                }
              >
                {column.name}
              </div>
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
            className={
              theme === "light"
                ? "addBoard__column-name light"
                : "addBoard__column-name"
            }
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
        className={
          theme === "light" ? "btn add-new-column light" : "btn add-new-column"
        }
      >
        + Add New Column
      </div>
      <div onClick={createBoard} className="btn add-new-board">
        Create New Board
      </div>
    </div>
  );
};

export default AddBoard;
