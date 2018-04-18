import React from 'react';
import ReactDOM from 'react-dom';

const App =()=>{
    return (
        <div className="app">
            <Board />
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
            <div className="board">
                <h1>Snake Game</h1>
                <div>
                    <span> Score: {this.props.score}</span>
                </div>
            </div>
        )
    }
};

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});