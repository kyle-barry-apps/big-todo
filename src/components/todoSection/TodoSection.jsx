import { useContext } from 'react'
import { BoardsContext } from '../../contexts/BoardsContext'
import Column from '../column/Column'
import './todosection.css'

const TodoSection = () => {

  const { activeBoard } = useContext(BoardsContext)
  console.log(activeBoard)

  return (
    <main className='todo-section'>
      {activeBoard.columns.map((column, index) => {
        return (
          <Column key={index} column={column}/>
        )
      })}
      
    </main>
  )
}

export default TodoSection