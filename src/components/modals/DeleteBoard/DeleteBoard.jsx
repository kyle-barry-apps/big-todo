import { useContext, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../../contexts/ModalContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { BoardsContext } from "../../../contexts/BoardsContext";
import { deleteBoard } from "../../../features/boards/boardsSlice";
import "./deleteBoard.css";

const DeleteBoard = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);
  const { activeBoard, setActiveBoard } = useContext(BoardsContext);

  const modal_ref = useRef();
  const dispatch = useDispatch();

  const handleDelete = () => {
    setActiveBoard(null);
    setModal(null);
    dispatch(deleteBoard(activeBoard));
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
      <div className="deleteBoard">
        <h2>Delete this Board?</h2>
        <p>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
      </div>
      <div className="deleteBoard__btn-container">
        <div onClick={handleDelete} className="btn delete-btn">
          Delete
        </div>
        <div onClick={() => setModal(null)} className="btn cancel-btn">
          Cancel
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
