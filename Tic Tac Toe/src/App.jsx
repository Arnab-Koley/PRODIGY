import React, { useState } from 'react';
import Board from './Components/Board';
import './App.css';

import { UilRobot } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilHistoryAlt } from '@iconscout/react-unicons'

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (gameMode !== null) {
      setGameStarted(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameMode(null);
  };

  return (

    <div className="App flex justify-center flex-col items-center">
      <h1 className='text-5xl font-bold text-slate-300'>Tic Tac Toe</h1>
      {!gameStarted ? (
        <div>
                <h2 className='text-xl my-5 text-slate-200'>Select Gamemode </h2>
          <div className='border-[1px] p-5 text-lg font-semibold flex items-center justify-center flex-col'>
          <button
            className={`mode-button flex items-center justify-center gap-2 w-full bg-slate-400 ${gameMode === 'PVP' ? 'selected' : ''}`}
            onClick={() => setGameMode('PVP')}
          >
            <UilUsersAlt size="30" color="black"/>
            Player vs Player
          </button>
          <button
            className={`mode-button flex items-center justify-center gap-2 w-full my-2 bg-slate-400 ${gameMode === 'AI' ? 'selected' : ''}`}
            onClick={() => setGameMode('AI')}
          >
            <UilRobot size="30" color="black"/>
            Player vs AI
          </button>
          <button className=" w-full rounded-lg border-2 start-button bg-cyan-700 text-white " onClick={startGame} disabled={gameMode === null}>
            Start Game
          </button>
        </div>
        </div>
        
      ) : (
        <div>
          <Board isPlayerVsAI={gameMode === 'AI'} />
          <button className=" border-slate-400 text-slate-400 border-2 w-full py-2 my-5 rounded-lg flex items-center justify-center gap-3" onClick={resetGame}>
          <UilHistoryAlt size="30" color="#94a3b8"/>
            Reset Game
            </button>
        </div>
      )}
    </div>
  );
}

export default App;
