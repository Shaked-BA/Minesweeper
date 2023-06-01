export const initBoard = () => {
    const row_length = Number(process.env.REACT_APP_ROWS);
    const column_length = Number(process.env.REACT_APP_COLUMNS);

    let board = Array(row_length).fill(0).map(
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
    board = placeMines(board, row_length, column_length);
    board = setValueAndNeighbors(board, row_length, column_length);
    return board;
}

const placeMines = (board, row_length, column_length) => {
    const bombs_number = Number(process.env.REACT_APP_BOMBS);

    let bombCount = 0;
    while (bombCount < bombs_number) {
        const x = Math.floor(Math.random() * row_length);
        const y = Math.floor(Math.random() * column_length);
        if (board[x][y].value === '') {
            board[x][y].value = 'X';
            bombCount++;
        }
    }
    return board;
}

const updateIfValid = (x, y, neighborX, neighborY, board, row_length, column_length) => {
    if (neighborX >= 0 && neighborY >= 0 && neighborX < row_length && neighborY < column_length) {
        if (board[neighborX][neighborY].value === 'X') {
            return 1;
        } else {
            board[x][y].neighbors.push({x: neighborX, y: neighborY});
        }
    }
    return 0;
}

const setValueAndNeighbors = (board, row_length, column_length) => {
    for (let x = 0; x < row_length; x++) {
        for (let y = 0; y < column_length; y++) {
            if (board[x][y].value === 'X') {
                continue;
            }
            let minesCounter = 0;

            minesCounter += updateIfValid(x, y, x - 1, y, board, row_length, column_length);
            minesCounter += updateIfValid(x, y, x + 1, y, board, row_length, column_length);
            minesCounter += updateIfValid(x, y, x, y - 1, board, row_length, column_length);
            minesCounter += updateIfValid(x, y, x, y + 1, board, row_length, column_length);
            minesCounter += updateIfValid(x, y, x - 1, y - 1, board, row_length, column_length);
            minesCounter += updateIfValid(x, y, x + 1, y - 1, board, row_length, column_length);
            minesCounter += updateIfValid(x, y, x - 1, y + 1, board, row_length, column_length);
            minesCounter += updateIfValid(x, y, x + 1, y + 1, board, row_length, column_length);
            
            if (minesCounter === 0) {
                board[x][y].value = '';
            } else {
                board[x][y].value = minesCounter;
            }
        }
    }
    return board;
}