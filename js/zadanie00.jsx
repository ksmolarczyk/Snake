import React from 'react';
import ReactDOM from 'react-dom';


const App =()=>{
    return (
        <div className="app">
            <Board />
            <Grid />
            {/*<Snake />*/}
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


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});