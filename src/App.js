import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard } from './features/boards/boardsSlice';

function App() {

  const boards = useSelector(state => state.boards.boardsArray)
  const dispatch = useDispatch()
 
  console.log(boards)
  
  return (
    <div onClick={() => dispatch(addBoard({name: 'New board', columns: [{name: 'Todo', tasks: []}, {name: 'Doing', tasks: []}, {name: 'Done', tasks: []}]}))}>Hi</div>
  );
}

export default App;
