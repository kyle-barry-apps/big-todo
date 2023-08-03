import { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BoardsContext } from '../../contexts/BoardsContext'
import { addColumn } from '../../features/boards/boardsSlice'
import Column from '../column/Column'
import './todosection.css'

const TodoSection = () => {

  const { activeBoard, setActiveBoard } = useContext(BoardsContext)
  const [updatedBoard, setUpdatedBoard] = useState(activeBoard)

  const [ newColumnValue, setNewColumnValue ] = useState({name: '', tasks: []})
  const [ newColumnToggle, setNewColumnToggle ] = useState(false)

  useEffect(() => {
    setUpdatedBoard(activeBoard);
  }, [activeBoard]);

  const dispatch = useDispatch()
  
  const handleSubmitNewColumn = (e) => {
    e.preventDefault()
    dispatch(addColumn({ updatedBoard: { ...updatedBoard, columns: [...updatedBoard.columns, newColumnValue] }, activeBoard }));
    setActiveBoard({ ...updatedBoard, columns: [...updatedBoard.columns, newColumnValue] });
    setNewColumnToggle(false)
    setNewColumnValue({name: '', tasks: []})
  }

  return (
    <main className='todo-section'>
      {activeBoard && activeBoard.columns.map((column, index) => {
        return (
          <Column key={index} column={column}/>
        )
      })
      }
      {activeBoard && !newColumnToggle &&
      <div onClick={()=> setNewColumnToggle(!newColumnToggle)} className="todo-section__add-new-column">
        <div>+ New Column</div>
      </div>
      }
      {activeBoard && newColumnToggle &&
        <div className="todo-section__add-new-column">
          <form onSubmit={handleSubmitNewColumn} className="todo-section__input">
            <input value={newColumnValue.name} onChange={(e) => setNewColumnValue({name: e.target.value, tasks: []})} className='todo-section__add-new-column-name' type="text" />
            <div>
              <button className='todo-section__add-new-column-btn' type='submit'></button>
            </div>
          </form>
        </div> 
      }
 
    </main>
  )
}

export default TodoSection