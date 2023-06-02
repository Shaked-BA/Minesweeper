export const initBoard = () => {
    const row_length = Number(process.env.REACT_APP_ROWS);
    const column_length = Number(process.env.REACT_APP_COLUMNS);
    const clean_cells = Array(row_length).fill(0).map(
        (row, i) => Array(column_length).fill(i)).map(
            (row, i) => row.map(
                (cell, j) => (
                    {
                        value: '',
                        revealed: false,
                        flagged: false,
                        x: i,
                        y: j,
                        neighbors: []
                    })));
    let {cells, minesPositions} = placeMines(clean_cells, row_length, column_length);
    cells = setValueAndNeighbors(cells, row_length, column_length);
    return {cells, minesPositions};
}

const placeMines = (cells, row_length, column_length) => {
    let bombs_number = Number(process.env.REACT_APP_BOMBS);
    const minesPositions = [];

    while (bombs_number > 0) {
        const x = Math.floor(Math.random() * row_length);
        const y = Math.floor(Math.random() * column_length);
        if (cells[x][y].value === '') {
            cells[x][y].value = 'X';
            bombs_number--;
            minesPositions.push({x, y});
        }
    }
    return {cells, minesPositions};
}

const updateIfValid = (x, y, neighborX, neighborY, cells, row_length, column_length) => {
    if (neighborX >= 0 && neighborY >= 0 && neighborX < row_length && neighborY < column_length) {
        if (cells[neighborX][neighborY].value === 'X') {
            return 1;
        } else {
            cells[x][y].neighbors.push({x: neighborX, y: neighborY});
        }
    }
    return 0;
}

const setValueAndNeighbors = (cells, row_length, column_length) => {
    for (let x = 0; x < row_length; x++) {
        for (let y = 0; y < column_length; y++) {
            if (cells[x][y].value === 'X') {
                continue;
            }
            let minesCounter = 0;

            minesCounter += updateIfValid(x, y, x - 1, y, cells, row_length, column_length);
            minesCounter += updateIfValid(x, y, x + 1, y, cells, row_length, column_length);
            minesCounter += updateIfValid(x, y, x, y - 1, cells, row_length, column_length);
            minesCounter += updateIfValid(x, y, x, y + 1, cells, row_length, column_length);
            minesCounter += updateIfValid(x, y, x - 1, y - 1, cells, row_length, column_length);
            minesCounter += updateIfValid(x, y, x + 1, y - 1, cells, row_length, column_length);
            minesCounter += updateIfValid(x, y, x - 1, y + 1, cells, row_length, column_length);
            minesCounter += updateIfValid(x, y, x + 1, y + 1, cells, row_length, column_length);
            
            if (minesCounter === 0) {
                cells[x][y].value = '';
            } else {
                cells[x][y].value = minesCounter;
            }
        }
    }
    return cells;
}

export const updateNeighbors = (x, y, cells) => {
    cells[x][y].revealed = true;
    if (cells[x][y].value === '') {
        const neighbors = cells[x][y].neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            if (!cells[neighbors[i].x][neighbors[i].y].revealed) {
                updateNeighbors(neighbors[i].x, neighbors[i].y, cells);
            }
        }
    }
    return cells;
}

export const revealMines = ({cells, minesPositions}) => {
    for (let i = 0; i < minesPositions.length; i++) {
        cells[minesPositions[i].x][minesPositions[i].y].revealed = true;
    }
    return cells;
}

export const countHiddenCells = (cells) => {
    return cells.map(
        (row) => row.filter(
            (cell) => cell.value !== 'X' && !cell.revealed).length).reduce(
                (current, next) => current + next);
}