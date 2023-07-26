import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoards } from './features/boards/boardsSlice';
import Layout from './components/Layout';
import './App.css';

function App() {

  const dispatch = useDispatch()

  const boards = useSelector(state => state.boards.boardsArray)
  console.log(boards)

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])
 
  return (
    <Layout /> 
  );
}

export default App;
