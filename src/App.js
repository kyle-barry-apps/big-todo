import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BoardsProvider } from './contexts/BoardsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';
import { TaskProvider } from './contexts/TaskContext';
import { fetchBoards } from './features/boards/boardsSlice';
import Layout from './components/Layout';
import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  return (
    <TaskProvider>
      <ModalProvider> 
        <ThemeProvider>
          <BoardsProvider>
            <Layout /> 
          </BoardsProvider>
        </ThemeProvider>
      </ModalProvider>
    </TaskProvider>
  );
}

export default App;
