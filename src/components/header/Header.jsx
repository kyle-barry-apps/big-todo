import { useState } from 'react'
import './header.css'

const Header = () => {

  const [ showBoardOptions, setShowBoardOptions ] = useState(false)

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
      <div className={showBoardOptions ? 'header__board-options active' : 'header__board-options'}>
        <div className='header__edit'>Edit Board</div>
        <div className='header__delete'>Delete Board</div>
      </div>
    </header>
  )
}

export default Header