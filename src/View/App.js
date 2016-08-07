import React, {Component} from 'react';
import Grid from '../Grid';
import GridView from './GridView';
import Modal from './Modal';
import Toolbar from './Toolbar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: 1,
            grid: new Grid(),
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
        const grid = this.state.grid;
        const _onReloadClick = this.onReloadClick.bind(this);
        const _onPlayersChange = this.onPlayersChange.bind(this);
        const modal = this.getModal(grid);

        if (this.state.players === 2) {
            return <div className="app-window">
                <Toolbar score={this.state.score} highScore={this.state.highScore} onReloadClick={_onReloadClick}
                         players={this.state.players} onPlayersChange={_onPlayersChange}
                         version={this.state.version}/>
                {modal}

                <GridView grid={this.state.grid} gridKey="1"
                          size={this.state.size} clickHandler={this.props.clickHandler}/>
                <GridView grid={this.state.grid2} gridKey="2"
                          size={this.state.size} clickHandler={this.props.clickHandler}/>
            </div>;
        }

        return <div className="app-window">
            <Toolbar score={this.state.score} highScore={this.state.highScore} onReloadClick={_onReloadClick}
                     players={this.state.players} onPlayersChange={_onPlayersChange}
                     version={this.state.version}/>
            {modal}

            <GridView grid={this.state.grid} gridKey="1"
                      size={this.state.size} clickHandler={this.props.clickHandler}/>
        </div>;


        // return <GridView
        //     grid={this.state.grid}
        //     score={this.state.score}
        //     version={this.state.version}
        //     highScore={this.state.highScore}
        //     size={this.state.size}
        //     restart={this.restart}
        //
        //     clickHandler={this.props.clickHandler}
        // />;
    }

    getModal(grid) {
        const _onModalClick = this.onModalClick.bind(this);
        let modal;
        if (!grid.hasConnectedCells()) {
            if (grid.isEmpty()) {
                modal = <Modal message="You won" onClick={_onModalClick}/>
            } else {
                modal = <Modal message="Game over" onClick={_onModalClick}/>
            }
        }
        return modal;
    }


    onModalClick() {
        this.restart();
    }

    onReloadClick() {
        this.restart();
    }

    onPlayersChange(numberOfPlayers) {
        this.props.store.setPlayers(numberOfPlayers);
    }

    restart() {
        this.props.store.reset();
    }
}

export default App;
