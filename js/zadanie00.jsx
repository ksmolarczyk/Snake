import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ moves }) => {
    return <h1>Move Game - moves = {moves}</h1>;
};

//****************************************************************/

class Grid extends React.Component {
    render() {
        const styleBox = (i, j) => {
            return {
                backgroundColor: this.props.grid[i][j] ? "green" : "pink",
                border: "1px solid black",
                width: "20px",
                height: "20px"
            };
        };

        return (
            <div
                className="grid"
                style={{
                    backgroundColor: "LightGray",
                    border: "2px solid black",
                    width: "auto",
                    height: "auto",
                    position: "absolute",
                    left: "55px",
                    top: "120px"
                }}
            >
                <table>
                    <tbody>
                    {this.props.grid.map((row, i) => (
                        <tr key={i}>
                            {row.map((col, j) => <td key={j} style={styleBox(i, j)} />)}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

//****************************************************************/

class Controls extends React.Component {
    handleKey = e => {
        let direction = "";
        switch (e.keyCode) {
            case 37:
                direction = "LEFT";
                break;
            case 38:
                direction = "UP";
                break;
            case 39:
                direction = "RIGHT";
                break;
            case 40:
                direction = "DOWN";
                break;
            default:
                break;
        }
        if (direction) this.props.handleMove(direction);
    };

    componentWillMount() {
        document.addEventListener("keydown", this.handleKey.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKey.bind(this));
    }

    render() {
        return (
            <h3 onKeyDown={e => this.handleKey(e)}>Press and arrow key to move!</h3>
        );
    }
}

//****************************************************************/

const GRID_SIZE = 15;
const INIT_X = 8;
const INIT_Y = 8;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.generateGrid(GRID_SIZE, GRID_SIZE, 0),
            moves: 0,
            curPos: { x: INIT_X, y: INIT_Y }
        };

        this.state.grid[INIT_Y][INIT_X] = 1;
    }
    generateGrid(cols, rows, value) {
        let array = [];
        for (let i = 0; i < rows; i++) {
            array.push([]);
            array[i].push(new Array(cols));

            for (let j = 0; j < cols; j++) {
                array[i][j] = value;
            }
        }
        return array;
    }

    handleMove(move) {
        let newGrid = this.state.grid;
        let newCurPos = { ...this.state.curPos };
        switch (move) {
            case "LEFT":
                if (newCurPos.x > 0) {
                    newCurPos.x--;
                } else {
                    return;
                }
                break;
            case "UP":
                if (newCurPos.y > 0) {
                    newCurPos.y--;
                } else {
                    return;
                }
                break;
            case "RIGHT":
                if (newCurPos.x < GRID_SIZE - 1) {
                    newCurPos.x++;
                } else {
                    return;
                }
                break;
            case "DOWN":
                if (newCurPos.y < GRID_SIZE - 1) {
                    newCurPos.y++;
                } else {
                    return;
                }
                break;
            default:
                break;
        }
        newGrid[newCurPos.y][newCurPos.x] = 1;
        newGrid[this.state.curPos.y][this.state.curPos.x] = 0;
        this.setState({ grid: newGrid, curPos: newCurPos, moves: this.state.moves+1 });
    }

    render() {
        return (
            <div>
                <Header moves={this.state.moves} />
                <Controls handleMove={this.handleMove.bind(this)} />
                <Grid grid={this.state.grid} />
            </div>
        );
    }
} // App

ReactDOM.render(<App />, document.getElementById("app"));
