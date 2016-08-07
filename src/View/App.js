import React, {Component} from 'react';
// import logo from '../logo.svg';
// import '../App.css';
import Grid from '../Grid';
import GameWindow from './GameWindow';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: new Grid,
            score: 0,
            size: {
                rows: 0,
                columns: 0
            },
            highScore: 0,
            version: '0.0.0'
        };
    }

    render() {
        return <GameWindow
            grid={this.state.grid}
            score={this.state.score}
            version={this.state.version}
            highScore={this.state.highScore}
            size={this.state.size}
            restart={this.restart}

            clickHandler={this.props.clickHandler}
        />;


        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }



    restart() {
        this.props.store.reset();
    }
}

export default App;
