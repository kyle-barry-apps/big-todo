import './header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className="header__logo">
        <img src="./assets/logo-light.svg" alt="Kanban logo" />
      </div>
      <div className="header__info">
        <h1>Platform Launch</h1>
        <div className="button-ellipsis-group">
          <button className='btn add-task-btn'>+ Add New Task</button>
          <div className="header__ellipsis">
            <img src="./assets/icon-vertical-ellipsis.svg" alt="ellipsis" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header