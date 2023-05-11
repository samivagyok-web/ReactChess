import './App.css';
import Board from './entities/Board';

function App() {
  const board = new Board();

  return (
    <>
      {board.getBoardRepresentation()}
    </>
  )
}

export default App
