import Task from '../task/Task'
import './column.css'

const Column = ( {column}) => {
  return (
    <div className="column">
      <div className="column__details">
        <div style={{backgroundColor: column.name === 'Todo' ? '#49C4E5' : column.name === 'Doing' ? '#8471F2' : column.name === 'Done' ? '#67E2AE' : '#8471F2'}} className='column__circle'>
        </div>
        <div className="column__name">
          {column.name} ( {column.tasks.length} )
        </div>
      </div>
      {column.tasks.map((task, index) => {
        return (
          <Task key={index} task={task} />
        )
      })}
    </div>  
  )
}

export default Column