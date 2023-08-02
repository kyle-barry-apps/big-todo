import { createContext, useState } from "react";

export const BoardsContext = createContext()

export const BoardsProvider = ({children}) => {  
  const [activeBoard, setActiveBoard] = useState(null);

  return (
    <BoardsContext.Provider value={{ activeBoard, setActiveBoard }}>
      {children}
    </BoardsContext.Provider>
  )
}