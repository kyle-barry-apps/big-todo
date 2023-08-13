import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { BoardsContext } from "../../contexts/BoardsContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useRef } from "react";
import "./header.css";

const Header = () => {
  const { activeBoard } = useContext(BoardsContext);
  const { setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);

  const [showBoardOptions, setShowBoardOptions] = useState(false);

  const boardOptionsRef = useRef();

  const handleEditClick = () => {
    setModal("editBoard");
    setShowBoardOptions(false);
  };

  const handleDeleteClick = () => {
    setModal("deleteBoard");
    setShowBoardOptions(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!boardOptionsRef.current.contains(e.target)) {
        setShowBoardOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showBoardOptions, setShowBoardOptions]);

  return (
    <header className={theme === "light" ? "header light" : "header"}>
      <div className="header__logo">
        <img
          src={
            theme === "light"
              ? "./assets/logo-dark.svg"
              : "./assets/logo-light.svg"
          }
          alt="Kanban logo"
        />
      </div>
      <div className="header__info">
        <h1>{activeBoard ? activeBoard.name : null}</h1>
        <div className="button-ellipsis-group">
          <button
            className={
              activeBoard && activeBoard.columns.length > 0
                ? "btn add-task-btn"
                : "btn add-task-btn disabled"
            }
            onClick={() => setModal("addTask")}
            disabled={activeBoard && activeBoard.columns.length === 0 && true}
          >
            + Add New Task
          </button>
          <div
            onClick={() => setShowBoardOptions(!showBoardOptions)}
            className="header__ellipsis"
          >
            <img src="./assets/icon-vertical-ellipsis.svg" alt="ellipsis" />
          </div>
        </div>
      </div>
      <div
        ref={boardOptionsRef}
        className={
          showBoardOptions && theme !== "light"
            ? "header__board-options active"
            : showBoardOptions && theme === "light"
            ? "header__board-options light active"
            : "header__board-options"
        }
      >
        <div onClick={handleEditClick} className="header__edit">
          Edit Board
        </div>
        <div onClick={handleDeleteClick} className="header__delete">
          Delete Board
        </div>
      </div>
    </header>
  );
};

export default Header;
