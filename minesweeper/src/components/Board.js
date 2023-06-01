import { useEffect, useState } from 'react';

import '../styles/Board.css' ;
import { initBoard } from '../utils/boardUtils';
import Cell from './Cell';

function Board() {
    const [cells, setCells] = useState([]);

    useEffect(() => setCells(initBoard()), []);

    const updateFlag = (e, x, y) => {
        e.preventDefault();
        const newCells = JSON.parse(JSON.stringify(cells));
        newCells[x][y].flagged = true;
        setCells(newCells);
    }

    const updateRevealed = (x, y) => {
        if (cells[x][y].value === 'X') {
            alert("Game Over!");
        }
        const newCells = updateRevealedCell(x, y, JSON.parse(JSON.stringify(cells)));
        setCells(newCells);
    }

    const updateRevealedCell = (x, y, newCells) => {
        newCells[x][y].revealed = true;
        if (newCells[x][y].value === '') {
            const neighbors = newCells[x][y].neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                if (!newCells[neighbors[i].x][neighbors[i].y].revealed) {
                    updateRevealedCell(neighbors[i].x, neighbors[i].y, newCells);
                }
            }
        }
        return newCells;
    }

    return (
        <div className="board">
            {cells.map((row, i) => 
            <div key={i}>
                {row.map((cell, j) => <Cell key={j} cellProps={cell} updateFlag={updateFlag} updateRevealed={updateRevealed} />)}
            </div>
            )}
        </div>
    );
}
  
export default Board;