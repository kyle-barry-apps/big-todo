import { useSelector } from 'react-redux'
import { useContext } from 'react'
import { BoardsContext } from '../../contexts/BoardsContext'
import './navigation.css'

const Navigation = () => {

  const { activeBoard, setActiveBoard } = useContext(BoardsContext)

  const boards = useSelector(state => state.boards.boardsArray)

  return (
    <nav className="nav">
      <span className='nav__boards-number'>All Boards ( {boards.length} )</span>
      <ul>
        {boards.map((b, index) => {
          return (
            <div onClick={() => setActiveBoard(b.name)} key={index} className={activeBoard === b.name ? 'nav__board-name active' : 'nav__board-name'}>
              <img className='nav__board-icon' src="./assets/icon-board.svg" alt="board icon" />
              <li>{b.name}</li>
            </div>
          )
        })}
        <div className='nav__board-name'>
          <img className='nav__board-icon' src="./assets/icon-board.svg" alt="board icon" />
          <li className='nav__create-new-board'>+ Create a New Board</li>
        </div>
      </ul>
    </nav>
  )
}

export default Navigation