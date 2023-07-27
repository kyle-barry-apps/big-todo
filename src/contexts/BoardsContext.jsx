import { useSelector } from "react-redux";
import { createContext, useState } from "react";

export const BoardsContext = createContext()

export const BoardsProvider = ({children}) => {
  const boards = useSelector(state => state.boards.boardsArray)

  const [ activeBoard, setActiveBoard ] = useState(boards[0].name || null)

  return (
    <BoardsContext.Provider value={{ activeBoard, setActiveBoard }}>
      {children}
    </BoardsContext.Provider>
  )
}