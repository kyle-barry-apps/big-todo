import './column.css'

const Column = ( {column}) => {
  return (
    <div className="column">
      <div className="column__name">
        {column.name}
      </div>
    </div>  
  )
}

export default Column