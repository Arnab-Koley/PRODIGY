import React, { useState, useEffect } from 'react';
import Square from './Square';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const Board = ({ isPlayerVsAI }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningSquares, setWinningSquares] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    if (isPlayerVsAI && !xIsNext && !calculateWinner(squares)) {
        const emptySquares = squares
          .map((square, index) => (square === null ? index : null))
          .filter(val => val !== null);
        const aiMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        if (aiMove !== undefined) {
          const newSquares = squares.slice();
          newSquares[aiMove] = 'O';
          setSquares(newSquares);
          const winnerData = calculateWinner(newSquares);
          if (winnerData) {
            setWinningSquares(winnerData.combination);
          }
          setXIsNext(true);
        }
      }      
  }, [squares, xIsNext, isPlayerVsAI]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || isDraw) {
      return;
    }
  
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    const winnerData = calculateWinner(newSquares);
    if (winnerData) {
      setWinningSquares(winnerData.combination);
    } else if (newSquares.every(square => square !== null)) {
      setIsDraw(true);
    }
    setXIsNext(!xIsNext);
  };
  

  const calculateWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], combination: [a, b, c] };
      }
    }
    return null;
  };

  const winnerData = calculateWinner(squares);
  const winner = winnerData ? winnerData.winner : null;
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className=" bg-slate-500 my-5 py-2 text-lg font-bold">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} highlight={winningSquares.includes(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} highlight={winningSquares.includes(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} highlight={winningSquares.includes(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} highlight={winningSquares.includes(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} highlight={winningSquares.includes(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} highlight={winningSquares.includes(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} highlight={winningSquares.includes(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} highlight={winningSquares.includes(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} highlight={winningSquares.includes(8)} />
      </div>
    </div>
  );
};

export default Board;

