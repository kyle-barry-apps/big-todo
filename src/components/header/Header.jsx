import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ModalContext } from "../../contexts/ModalContext";
import { BoardsContext } from "../../contexts/BoardsContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AiOutlinePlus } from "react-icons/ai";
import { useRef } from "react";
import "./header.css";
import "../navigation/navigation.css";

const Header = () => {
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);
  const { setModal } = useContext(ModalContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const boards = useSelector((state) => state.boards.boardsArray);

  const [showBoardOptions, setShowBoardOptions] = useState(false);
  const [showNavDropdown, setShowNavDropdown] = useState(false);

  const boardOptionsRef = useRef();
  const navDropdownRef = useRef();

  const handleEditClick = () => {
    setModal("editBoard");
    setShowBoardOptions(false);
  };

  const handleDeleteClick = () => {
    setModal("deleteBoard");
    setShowBoardOptions(false);
  };

  const checkMode = (e) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
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

  useEffect(() => {
    const handler = (e) => {
      if (!navDropdownRef.current.contains(e.target)) {
        setShowNavDropdown(null);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showNavDropdown, setShowNavDropdown]);

  return (
    <header className={theme === "light" ? "header light" : "header"}>
      {showNavDropdown && <div className="overlay"></div>}
      <div className="header__logo">
        <img
          className="logo-desktop"
          src={
            theme === "light"
              ? "./assets/logo-dark.svg"
              : "./assets/logo-light.svg"
          }
          alt="Kanban logo"
        />
      </div>
      <div className="header__info">
        <div
          onClick={() => setShowNavDropdown(!showNavDropdown)}
          className="mobile-container"
        >
          <img
            className="logo-mobile"
            src="./assets/logo-mobile.svg"
            alt="mobile logo"
          />
          <h1>{activeBoard ? activeBoard.name : null}</h1>
          <img
            className="chevron-down"
            src="./assets/icon-chevron-down.svg"
            alt="chevron down logo"
          />
          <img
            className="chevron-up"
            src="./assets/icon-chevron-up.svg"
            alt="chevron down logo"
          />
        </div>
        <div className="desktop-container">
          <h1>{activeBoard ? activeBoard.name : null}</h1>
        </div>
        <div
          className={
            showNavDropdown && theme !== "light"
              ? "navDropdown active"
              : showNavDropdown && theme === "light"
              ? "navDropdown light active"
              : "navDropdown"
          }
          ref={navDropdownRef}
        >
          <span className="nav__boards-number">
            All Boards ( {boards && boards.length} )
          </span>
          {boards ? (
            <ul>
              {boards.map((b, index) => {
                return (
                  <div
                    onClick={() => setActiveBoard(b)}
                    key={index}
                    className={
                      activeBoard && activeBoard.name === b.name
                        ? "nav__board-name active"
                        : activeBoard &&
                          activeBoard.name === b.name &&
                          theme === "light"
                        ? "nav__board-name active light"
                        : theme === "light"
                        ? "nav__board-name light"
                        : "nav__board-name"
                    }
                  >
                    <img
                      className="nav__board-icon"
                      src="./assets/icon-board.svg"
                      alt="board icon"
                    />
                    <li>{b.name}</li>
                  </div>
                );
              })}
              <div
                onClick={() => setModal("addBoard")}
                className={
                  theme === "light"
                    ? "nav__board-name light"
                    : "nav__board-name"
                }
              >
                <img
                  className="nav__board-icon"
                  src="./assets/icon-board.svg"
                  alt="board icon"
                />
                <li
                  onClick={() => setModal("addBoard")}
                  className="nav__create-new-board"
                >
                  + Create New Board
                </li>
              </div>
            </ul>
          ) : (
            <ul>
              <div
                onClick={() => setModal("addBoard")}
                className="nav__board-name"
              >
                <img
                  className="nav__board-icon"
                  src="./assets/icon-board.svg"
                  alt="board icon"
                />
                <li
                  onClick={() => setModal("addBoard")}
                  className="nav__create-new-board"
                >
                  + Create New Board
                </li>
              </div>
            </ul>
          )}
          <div className="nav__mode-sidebar">
            <div
              className={
                theme === "light"
                  ? "nav__mode-toggle light"
                  : "nav__mode-toggle"
              }
            >
              <img src="./assets/icon-light-theme.svg" alt="light mode logo" />
              <div className="toggler">
                <label className="switch">
                  <input
                    onChange={checkMode}
                    type="checkbox"
                    checked={theme === "light" ? true : false}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <img src="./assets/icon-dark-theme.svg" alt="dark mode logo" />
            </div>
          </div>
        </div>

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
            <span className="addNewTaskIcon">
              <AiOutlinePlus size={16} />
            </span>
            <span className="addNewTask">+ Add New Task</span>
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
