import './addBoard.css'
import '../modals.css'

const AddBoard = () => {
  return (
    <div className='modal-container'>
      <div className="addBoard__title">
        Add New Board
      </div>
      <div className='addBoard__name-container'>
        <div className="addBoard__name">
          Board Name
        </div>
        <input className='addBoard__input' type="text" placeholder='e.g. Web Design' />
      </div>
      <div className='addBoard__column-container'>
        <span>Board Columns</span>
        <div className="addBoard__column">
          <div className='addBoard__column-name'>Todo</div>
          <div className='addBoard__column-delete'>
            <img src="/assets/icon-cross.svg" alt="delete icon" />
          </div>
        </div>
        <div className="addBoard__column">
          <div className='addBoard__column-name'>Doing</div>
          <div className='addBoard__column-delete'>
            <img src="/assets/icon-cross.svg" alt="delete icon" />
          </div>
        </div>
      </div>
      <div className="btn add-new-column">+ Add New Column</div>
      <div className="btn add-new-board">Create New Board</div>
    </div>
  )
}

export default AddBoard