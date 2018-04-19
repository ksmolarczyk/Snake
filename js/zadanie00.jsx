import React from 'react';
import ReactDOM from 'react-dom';


const App =()=>{
    return (
        <div className="app">
            <Board />
            <Grid />
            <Snake />
        </div>
    )
};

class Board extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="board" style={{backgroundColor: "red", border:"1px solid black", width: "500px", height: "550px", position:"relative"}}>
                <h1>Snake Game</h1>
                <div>
                    <span> Score: {this.props.score}</span>
                </div>
            </div>
        )
    }
}

class Grid extends React.Component {
    constructor(props){
        super(props);
    }

    render() {


        let gridArr = [];


        return (
            <div
                className="grid" style={{backgroundColor:"grey", border:"2px solid black", width: "400px", height:"400px", position:"absolute", left:"55px", top:"120px"}}>
                {gridArr}

            </div>

        )
    }
}

class Snake extends React.Component {
    constructor(props){
        super(props);
        this.handleKey = this.handleKey.bind(this);

    }

    // poruszanie sie snakeeee'a

    handleKey(e) {
        let direction = e.keyCode;
        // logs a number corresponding to the key pressed
        console.log(direction);
        switch(e.keyCode) {
            case 37:
                if(this.props.direction !== "RIGHT" && this.props.moving){
                    this.props.changeDirection("LEFT")
                }
                break;
            case 38:
                if(this.props.direction !== "DOWN" && this.props.moving){
                    this.props.changeDirection("UP")
                }
                break;
            case 39:
                if(this.props.direction !== "LEFT" && this.props.moving){
                    this.props.changeDirection("RIGHT")
                }
                break;
            case 40:
                if(this.props.direction !== "UP" && this.props.moving) {
                    this.props.changeDirection("DOWN")
                }
                break;
            default:
                break;
        }
    }
    //poruszanie sie snake nawet jesli user pozostaje bierny
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        console.log("Tick!");
    }



    render() {
        return (
            <div className="snakeBody" style={{width: "20px", height: "20px", backgroundColor: "blue", position: "absolute", top: "300px", left: "235px" }}
                 onKeyDown={this.handleKey}>
            </div>

        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});