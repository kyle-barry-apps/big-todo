import { useContext } from 'react'
import { BoardsContext } from '../../contexts/BoardsContext'
import Column from '../column/Column'
import './todosection.css'

const TodoSection = () => {

  const { activeBoard } = useContext(BoardsContext)
  console.log(activeBoard)

  return (
    <main className='todo-section'>
      {activeBoard && activeBoard.columns.map((column, index) => {
        return (
          <Column key={index} column={column}/>
        )
      })}
      <div className="todo-section__add-new-column">
        <div>+ New Column</div>
      </div>
    </main>
  )
}

export default TodoSection