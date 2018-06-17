import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button
            className={"square " + (props.isWinner ? 'winning-square' : '')}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i, row, col, isWinner) {
        return (
            <Square
                key={i}
                isWinner={isWinner}
                onClick={() => this.props.onClick(i, row, col)}
                value={this.props.squares[i]}
            />
        );
    }

    render() {
        let squares = [];
        let row = [];
        let num = 0;
        const winners = this.props.winners;
        let isWinner = false;

        for (let i = 1; i <= 3; i++) {
            row = [];
            for (let j = 1; j <= 3; j++) {
                if (winners !== null) {
                    winners.includes(num) ? isWinner = true : isWinner = false;
                }
                row.push(this.renderSquare(num, i, j, isWinner));
                num++;
            }
            squares.push(<div key={i} className="board-row">{row}</div>);
        }

        return (
            <div>{squares}</div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            toggleAscending: true,
            moveDescription: '',
            moveDetails: new Map()
        };
    }

    handleClick(i) {
        const currentStepNumber = this.state.stepNumber + 1;
        const history = this.state.history.slice(0, currentStepNumber);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const currentMoveDescription = `${getCoordinates(i)}: ${squares[i]}`;
        const updatedMoveDetails = this.state.moveDetails.set(currentStepNumber, currentMoveDescription);

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            moveDescription: currentMoveDescription,
            moveDetails: updatedMoveDetails
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toggleSort() {

        this.setState({
            toggleAscending: !this.state.toggleAscending,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winners = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Move ' + this.state.moveDetails.get(move):
                'Game start';

            let bold = (move === this.state.stepNumber ? 'selected-move' : '');

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)} className={bold}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winners) {
            status = 'Winner: ' + current.squares[winners[0]];
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (!this.state.toggleAscending) {
            moves.sort((a, b) => {
                return b.key - a.key
            });
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winners={winners}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>Sort moves: <a href="#"
                                        onClick={() => this.toggleSort()}>{(this.state.toggleAscending ? 'descending' : 'ascending')}</a>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function calculateWinner(squares) {
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
            return lines[i];
        }
    }
    return null;
}

function getMatchingIndex(array, targetValue) {
    return array.findIndex((d) => d === targetValue);
}

function getCoordinates(value) {
    let myArr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];

    let x = 0;
    let y = 0;
    for (let i = 0; i < myArr.length; i++) {
        let index = getMatchingIndex(myArr[i], value);
        if (index !== -1) {
            y = i + 1;
            x = index + 1;
        }
    }
    return `(${x},${y})`;
}
