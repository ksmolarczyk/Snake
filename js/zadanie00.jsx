import React from 'react';
import ReactDOM from 'react-dom';

class Grid extends React.Component {
    render() {
        return (
            <div>
                Grid
            </div>

        );
    }
}

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            score: 0
        }
    }
    render() {
        return (
            <div>
                <h1>Snake</h1>
                <h2>Score: {this.state.score}</h2>
                <Grid
                    />
            </div>

        );
    }
}
document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Main />,
        document.getElementById('app')
    );
});