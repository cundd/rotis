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
        if (players.length === 1) {
            return this._getModalSinglePlayer(players);
        }
        return this._getModalMultiPlayer(players);
    }

    _getModalSinglePlayer(players) {
        const _onModalClick = this.onModalClick.bind(this);
        const grid = players[0].grid;
        if (!grid.hasConnectedCells()) {
            const message = grid.isEmpty()
                ? <h1>You won</h1>
                : <h1>Game over</h1>;
            return <Modal message={message} onClick={_onModalClick}/>
        }
        return undefined;
    }

    _getModalMultiPlayer(players) {
        const _onModalClick = this.onModalClick.bind(this);
        const playersWithConnectedCells = players.values().filter(function (player) {
            return player.grid.hasConnectedCells();
        });

        if (playersWithConnectedCells.length === 0) {
            let tie = false;
            const winner = players.reduce(function (previousPlayer, currentPlayer) {
                if (currentPlayer.score === previousPlayer.score) {
                    tie = true;
                }
                if (currentPlayer.score > previousPlayer.score) {
                    tie = false;
                    return currentPlayer;
                }
                return previousPlayer;
            }, {score: 0});

            const message = tie
                ? <h1>Both won</h1>
                : <h1>Player {winner.playerId + 1} won</h1>;
            return <Modal message={message} onClick={_onModalClick}/>
        }
        return undefined;
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
