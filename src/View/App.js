import React, {Component} from 'react';
import GridView from './GridView';
import Modal from './Modal';
import Toolbar from './Toolbar';
import PlayerCollection from '../PlayerCollection';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: new PlayerCollection(),
            size: {
                rows: 0,
                columns: 0
            },
            highScore: 0,
            version: '0.0.0'
        };
    }

    render() {
        const modal = this.getModal(this.state.players);
        const createGridView = function (player, index) {
            return <GridView player={player} key={player.playerId}
                             size={this.state.size} clickHandler={this.props.clickHandler}/>
        }.bind(this);

        const toolbar = this.getToolbar();

        return <div className="app-window">
            {toolbar}
            {modal}
            {this.state.players.map(createGridView)}
        </div>;


        // return <div className="app-window">
        //
        //     {modal}
        //
        //     <GridView grid={this.state.grid} gridKey="1"
        //               size={this.state.size} clickHandler={this.props.clickHandler}/>
        // </div>;
        //

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

    getToolbar() {
        const _onReloadClick = this.onReloadClick.bind(this);
        const _onPlayersChange = this.onPlayersChange.bind(this);

        if (this.state.players.keys().length === 2) {
            return <Toolbar score={this.state.score} highScore={this.state.highScore} onReloadClick={_onReloadClick}
                            players={this.state.players} onPlayersChange={_onPlayersChange}
                            version={this.state.version}
                            score2={this.state.score2}/>;
        }
        return <Toolbar score={this.state.score} highScore={this.state.highScore} onReloadClick={_onReloadClick}
                        players={this.state.players} onPlayersChange={_onPlayersChange}
                        version={this.state.version}/>;

    }

    getModal(players) {
        const _onModalClick = this.onModalClick.bind(this);

        if (players.length === 1) {
            const grid = players[0].grid;
            if (!grid.hasConnectedCells()) {
                if (grid.isEmpty()) {
                    return <Modal message="You won" onClick={_onModalClick}/>
                } else {
                    return <Modal message="Game over" onClick={_onModalClick}/>
                }
            }

            return undefined;
        } else {
            const playersWithConnectedCells = players.values().filter(function (player) {
                return player.grid.hasConnectedCells();
            });

            if (playersWithConnectedCells.length === 0) {
                return <Modal message="Finished" onClick={_onModalClick}/>
            }
            return undefined;
        }
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
