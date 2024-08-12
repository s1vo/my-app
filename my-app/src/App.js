import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StrictMode } from 'react';
import styles from './App.module.css';

// Stateless компоненты
const Square = ({ value, onClick }) => (
    <button className={styles.square} onClick={onClick}>
        {value}
    </button>
);

Square.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

const Board = ({ squares, onClick }) => (
    <div className={styles.board}>
        {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)} />
        ))}
    </div>
);

Board.propTypes = {
    squares: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
};

const Info = ({ status }) => <div className={styles.status}>{status}</div>;

Info.propTypes = {
    status: PropTypes.string.isRequired,
};

const RestartButton = ({ onRestart }) => (
    <button className={styles['restart-button']} onClick={onRestart}>
        Начать заново
    </button>
);

RestartButton.propTypes = {
    onRestart: PropTypes.func.isRequired,
};

// Stateful компоненты
const BoardContainer = ({ squares, onSquareClick }) => (
    <Board squares={squares} onClick={onSquareClick} />
);

BoardContainer.propTypes = {
    squares: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSquareClick: PropTypes.func.isRequired,
};

const GameContainer = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (i) => {
        if (squares[i] || winner) return;

        const newSquares = squares.slice();
        newSquares[i] = isXNext ? 'X' : 'O';
        setSquares(newSquares);

        const calculatedWinner = calculateWinner(newSquares);
        if (calculatedWinner) {
            setWinner(calculatedWinner);
        } else {
            setIsXNext(!isXNext);
        }
    };

    const handleRestart = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    const status = winner
        ? `Победитель: ${winner}`
        : `Следующий ход: ${isXNext ? 'X' : 'O'}`;

    return (
        <div className={styles.game}>
            <Info status={status} />
            <BoardContainer squares={squares} onSquareClick={handleClick} />
            <RestartButton onRestart={handleRestart} />
        </div>
    );
};

// Вспомогательная функция для вычисления победителя
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

// Главный компонент
const App = () => (
    <StrictMode>
        <GameContainer />
    </StrictMode>
);

export default App;
