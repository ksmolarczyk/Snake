import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ points }) => {
    return <h1 style={{color: '#ff4447'}}
    >SNAKE GAME, points = {points -1}</h1>;
};

//****************************************************************/

class Grid extends React.Component {

    render() {
        const styleBox = (i, j) => {
            let color = '#003b45';

            if(this.props.grid[i][j] === 1) {
                color = '#e6d72a';
            }

            if(this.props.grid[i][j] === 2) {
                color = '#ff4447';
            }

            return {
                backgroundColor: color,
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

    constructor(props) {
        super(props);
        this.state = {
            animation: [],
            speed: 200
        };
    }
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

        this.state.animation.map(tick => {
            clearTimeout(tick);
        });

        this.setState({animation: []});

        for(let i=0; i < GRID_SIZE-1; i++) {
            this.state.animation.push(setTimeout(() => {
                if (direction) this.props.handleMove(direction);
            }, i * this.state.speed));
        }
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
const SNAKE = [{x: INIT_X , y: INIT_Y}];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.generateGrid(GRID_SIZE, GRID_SIZE, 0),
            moves: 0,
            curPos: { x: INIT_X, y: INIT_Y },
            points: 1,
            snake: SNAKE,
            food: this.generateFood(GRID_SIZE, SNAKE),
        };

        this.state.grid[this.state.food.y][this.state.food.x] = 2;
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

    randomCoordinates(size, coordinates) {
        const x = Math.floor(Math.random() * (size - 2)) + 1;
        const y = Math.floor(Math.random() * (size - 2)) + 1;

        return {x: x, y: y};
    }

    generateFood(size, snake) {
        let coordinates = this.randomCoordinates(size);

        if(snake.find(item => item.x === coordinates.x && item.y === coordinates.y)) {
            return this.generateFood(size, snake);
        } else {
            return coordinates;
        }
    }

    reloadGame(points) {
        alert(`GAME OVER YOUR SCORE: ${points -1}`);
        window.location.reload();
    }

    handleCollision(snake, points) {
        if(snake.map(item => item.x === snake[0].x && item.y === snake[0].y).indexOf(true, 1) >= 0) {
            this.reloadGame(points);
        }
    }

    movingSnake(snake, grid, pos, points) {
        snake.unshift({x:pos.x, y:pos.y});
        grid[snake[points].y][snake[points].x] = 0;
    }

    handleMove(move) {
        let newGrid = this.state.grid;
        let newCurPos = { ...this.state.curPos };
        let newSnake = this.state.snake;
        let newPoints = this.state.points;
        let newFood = this.state.food;

        switch (move) {
            case "LEFT":
                if (newCurPos.x > 0) {
                    newCurPos.x--;
                    this.movingSnake(newSnake, newGrid, {x:newCurPos.x, y:newCurPos.y}, newPoints);
                } else {
                    this.reloadGame(newPoints);
                    return;
                }
                break;
            case "UP":
                if (newCurPos.y > 0) {
                    newCurPos.y--;
                    this.movingSnake(newSnake, newGrid, {x:newCurPos.x, y:newCurPos.y}, newPoints);
                } else {
                    this.reloadGame(newPoints);
                    return;
                }
                break;
            case "RIGHT":
                if (newCurPos.x < GRID_SIZE - 1) {
                    newCurPos.x++;
                    this.movingSnake(newSnake, newGrid, {x:newCurPos.x, y:newCurPos.y}, newPoints);
                } else {
                    this.reloadGame(newPoints);
                    return;
                }
                break;
            case "DOWN":
                if (newCurPos.y < GRID_SIZE - 1) {
                    newCurPos.y++;
                    this.movingSnake(newSnake, newGrid, {x:newCurPos.x, y:newCurPos.y}, newPoints);
                } else {
                    this.reloadGame(newPoints);
                    return;
                }
                break;
            default:
                break;
        }

        if(newSnake[0].x === newFood.x && newSnake[0].y === newFood.y) {
            newPoints++;
            newFood = this.generateFood(GRID_SIZE, newSnake);
        }

        newSnake.splice(newPoints, newSnake.length - newPoints);
        for(let i=0; i< newPoints; i++) {
            newGrid[newSnake[i].y][newSnake[i].x] = 1 ;
        }

        newGrid[newFood.y][newFood.x] = 2 ;
        this.handleCollision(newSnake, newPoints);
        this.setState({ grid: newGrid, curPos: newCurPos, snake: newSnake, points: newPoints, food: newFood });
    }

    render() {
        return (
            <div>
                <Header points={this.state.points} />
                <Controls handleMove={this.handleMove.bind(this)} />
                <Grid grid={this.state.grid} />
            </div>
        );
    }
} // App

ReactDOM.render(<App />, document.getElementById("app"));