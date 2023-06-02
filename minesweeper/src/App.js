import { useState } from 'react';

import './styles/App.css';
import Board from './components/Board';
import Modal from './components/Modal';
import StopWatch from './components/StopWatch';

function App() {
  const [hiddenCells, setHiddenCells] = useState(process.env.REACT_APP_LAND);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  const stopCount = time => {return time}

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <div className="gameStats">
          <div>Safe Lands Left: {hiddenCells}</div>
          <StopWatch time={time} setTime={gameOver ? stopCount : setTime}/>
      </div>
      <Board setHiddenCells={setHiddenCells} gameOver={gameOver} setGameOver={setGameOver} />
      {gameOver && <Modal time={time} hiddenCells={hiddenCells} restartGame={() => window.location.reload()}/>}
    </div>
  );
}

export default App;
