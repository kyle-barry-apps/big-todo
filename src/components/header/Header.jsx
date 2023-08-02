import { useContext, useState, useEffect } from 'react'
import { ModalContext } from '../../contexts/ModalContext'
import { useRef } from 'react'
import './header.css'

const Header = () => {

  const { setModal } = useContext(ModalContext)
  const [ showBoardOptions, setShowBoardOptions ] = useState(false)

  const boardOptionsRef = useRef()

  const handleDeleteClick = () => {
    setModal('deleteBoard')
    setShowBoardOptions(false)
  }

  useEffect(() => {
    const handler = (e) => {
      if(!boardOptionsRef.current.contains(e.target)) {
        setShowBoardOptions(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return() => {
      document.removeEventListener('mousedown', handler)
    }
  }, [showBoardOptions, setShowBoardOptions])

  return (
    <header className='header'>
      <div className="header__logo">
        <img src="./assets/logo-light.svg" alt="Kanban logo" />
      </div>
      <div className="header__info">
        <h1>Platform Launch</h1>
        <div className="button-ellipsis-group">
          <button className='btn add-task-btn'>+ Add New Task</button>
          <div onClick={()=> setShowBoardOptions(!showBoardOptions)} className="header__ellipsis">
            <img src="./assets/icon-vertical-ellipsis.svg" alt="ellipsis" />
          </div>
        </div>
      </div>
      <div ref={boardOptionsRef} className={showBoardOptions ? 'header__board-options active' : 'header__board-options'}>
        <div className='header__edit'>Edit Board</div>
        <div onClick={handleDeleteClick} className='header__delete'>Delete Board</div>
      </div>
    </header>
  )
}

export default Header