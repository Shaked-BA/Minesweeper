import { useEffect, useState } from 'react';

import '../styles/Board.css';
import { initBoard, updateNeighbors, revealMines, countHiddenCells } from '../utils/boardUtils';
import Cell from './Cell';

function Board({gameOver, setGameOver, setHiddenCells}) {
    const [board, setBoard] = useState({cells: [], minesPositions: []});

    useEffect(() => {
        const { cells, minesPositions } = initBoard();
        setBoard({ cells, minesPositions });
    }, []);

    const updateFlag = (e, x, y) => {
        e.preventDefault();
        if (!gameOver) {
            const cells = JSON.parse(JSON.stringify(board.cells));
            cells[x][y].flagged = !cells[x][y].flagged;
            setBoard(prevBoard => {return {...prevBoard, cells}});
        }
    }

    const finishGame = () => {
        const cells = revealMines(JSON.parse(JSON.stringify(board)));
        setBoard(prevBoard => {return {...prevBoard, cells}});
        setGameOver(true);
    }

    const updateRevealed = (x, y) => {
        if (!gameOver) {
            if (board.cells[x][y].value === 'X') {
                finishGame();
            } else {
                const cells = updateNeighbors(x, y, JSON.parse(JSON.stringify(board.cells)));
                setBoard(prevBoard => {return {...prevBoard, cells}});
                updateHiddenCells(cells);
            }
        }
    }

    const updateHiddenCells = (cells) => {
        const newHiddenCells = countHiddenCells(cells);
        if (newHiddenCells === 0) {
            setGameOver(true);
        }
        setHiddenCells(newHiddenCells);
    }

    return (
        <div>
            <div className="board">
                {board.cells.map((row, i) => 
                <div className="row" key={i}>
                    {row.map(
                        (cell, j) => <Cell key={j} cellProps={cell} updateFlag={updateFlag} updateRevealed={updateRevealed} />)}
                </div>)}
            </div>
        </div>
    );
}
  
export default Board;