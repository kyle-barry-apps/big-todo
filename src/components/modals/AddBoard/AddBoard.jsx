import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '../../../features/boards/boardsSlice'
import { useContext } from 'react'
import { ModalContext } from '../../../contexts/ModalContext'
import './addBoard.css'
import '../modals.css'

const AddBoard = () => {
  const [boardName, setBoardName] = useState('')
  const [columns, setColumns] = useState([{name: 'Todo', tasks: []}, {name: 'Doing', tasks: []}])
  const [newColumnToggle, setNewColumnToggle] = useState(false)
  const [newColumnValue, setNewColumnValue] = useState('')
  const { modal, setModal } = useContext(ModalContext)

  console.log(modal)

  const dispatch = useDispatch()
  let modal_ref = useRef()

  const removeColumn = (index) => {
    const updatedColumns = [...columns];

    updatedColumns.splice(index, 1);

    setColumns(updatedColumns);
  }

  const createBoard = () => {
    if (boardName && columns.length > 0) {
      dispatch(addBoard({name: boardName, columns: columns}))  
      setModal(null)
    }
  }

  useEffect(() => {
      const handler = (e) => {
        if(!modal_ref.current.contains(e.target)) {
          setModal(null)
        }
    }

    document.addEventListener('mousedown', handler)

    return() => {
      document.removeEventListener('mousedown', handler)
    }
  }, [modal])


  return (
    <div className='modal-container' ref={modal_ref}>
      <div className="addBoard__title">
        Add New Board
      </div>
      <div className='addBoard__name-container'>
        <div className="addBoard__name">
          Board Name
        </div>
        <input value={boardName} onChange={(e) => setBoardName(e.target.value)} className='addBoard__input' type="text" placeholder='e.g. Web Design' />
      </div>
      <div className='addBoard__column-container'>
        <span>Board Columns</span>
        {columns.map((column, index) => {
          return (
          <div key={index} className="addBoard__column">
            <div className='addBoard__column-name'>{column.name}</div>
            <div onClick={()=> removeColumn(index)} className='addBoard__column-delete'>
              <img src="/assets/icon-cross.svg" alt="delete icon" />
            </div>
          </div>
          )
        })}
      </div>
      {newColumnToggle && 
      <div className="addBoard_column">
        <input value={newColumnValue} onChange={(e) => setNewColumnValue(e.target.value)} type="text" className='create_column' placeholder='e.g. Done' />
      </div>
      }
      <div onClick={() => setNewColumnToggle(!newColumnToggle)} className="btn add-new-column">+ Add New Column</div>
      <div onClick={createBoard} className="btn add-new-board">Create New Board</div>
    </div>
  )
}

export default AddBoard