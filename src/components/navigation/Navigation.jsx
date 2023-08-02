import { useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { BoardsContext } from '../../contexts/BoardsContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import { ModalContext } from '../../contexts/ModalContext'
import './navigation.css'

const Navigation = ( { showNav, setShowNav }) => {

  const { activeBoard, setActiveBoard } = useContext(BoardsContext)
  const { theme, setTheme } = useContext(ThemeContext)
  const { setModal } = useContext(ModalContext)
  const boards = useSelector(state => state.boards.boardsArray)

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (boards && boards.length > 0 && !activeBoard) {
      setActiveBoard(boards[0]);
    }
  }, [boards, activeBoard, setActiveBoard]);


  const checkMode = (e) => {
    if (e.target.checked) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <nav className={showNav ? 'nav' : 'nav hidden'}> 
      <div>
      <span className='nav__boards-number'>All Boards ( {boards && boards.length} )</span>
        {boards ?
        <ul>
          {boards.map((b, index) => {
            return (
              <div onClick={() => setActiveBoard(b)} key={index} className={activeBoard && activeBoard.name === b.name ? 'nav__board-name active' : 'nav__board-name'}>
                <img className='nav__board-icon' src="./assets/icon-board.svg" alt="board icon" />
                <li>{b.name}</li>
              </div>
            )
          })}
          <div onClick={()=> setModal('addBoard')} className='nav__board-name'>
            <img className='nav__board-icon' src="./assets/icon-board.svg" alt="board icon" />
            <li onClick={()=> setModal('addBoard')} className='nav__create-new-board'>+ Create New Board</li>
          </div>
        </ul>
        :  
          <ul>
            <div onClick={()=> setModal('addBoard')} className='nav__board-name'>
              <img className='nav__board-icon' src="./assets/icon-board.svg" alt="board icon" />
              <li onClick={()=> setModal('addBoard')} className='nav__create-new-board'>+ Create New Board</li>
            </div>
          </ul>
        }
      </div>
      <div className='nav__mode-sidebar'>
        <div className="nav__mode-toggle">
          <img src="./assets/icon-light-theme.svg" alt="light mode logo" />
          <div className="toggler">
            <label className="switch">
              <input onChange={checkMode} type="checkbox" checked={theme === 'light' ? true : false} />
              <span className="slider"></span>
            </label>
          </div>
          <img src="./assets/icon-dark-theme.svg" alt="dark mode logo" />
        </div>
        <div onClick={() => setShowNav(!showNav)} className="nav__hide-sidebar">
          <img src="./assets/icon-hide-sidebar.svg" alt="hide sidebar icon" />
          <span>Hide Sidebar</span>
        </div>
      </div>
    </nav>
  )
}

export default Navigation