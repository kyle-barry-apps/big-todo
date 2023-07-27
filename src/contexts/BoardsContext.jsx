import { useSelector } from "react-redux";
import { createContext, useState } from "react";

export const BoardsContext = createContext()

export const BoardsProvider = ({children}) => {

  const initialBoards = useSelector((state) => state.boards.boardsArray);
  
  // Set the default activeBoard to the first board in the boardsArray, or null if the array is empty
  const [activeBoard, setActiveBoard] = useState(initialBoards.length > 0 ? initialBoards[0] : null);

  return (
    <BoardsContext.Provider value={{ activeBoard, setActiveBoard }}>
      {children}
    </BoardsContext.Provider>
  )
}