import './task.css'

const Task = ({ task }) => {

  const completedSubtasks = task.subtasks.filter((subtask) => {
    return (
    subtask.isCompleted === true
    )
  })

  return (
    <div className='task'>
      <div className="task__title">{task.title}</div>
      <div className="task__subtasks">
        {completedSubtasks.length} of {task.subtasks.length} {task.subtasks.length === 1 ? 'subtask' : 'subtasks'}
      </div>
    </div>
  )
}

export default Task