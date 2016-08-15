import React, {Component} from 'react';
import GridView from './GridView';
import Modal from './Modal';
import Toolbar from './Toolbar';
import PlayerCollection from '../Model/PlayerCollection';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: new PlayerCollection(),
            size: {
                rows: 0,
                columns: 0
            },
            highScore: {
                score: 0,
                previousScore: 0,
                changed: false
            },
            version: '0.0.0'
        };
    }

    render() {
        const modal = this.getModal(this.state.players);
        const createGridView = function (player) {
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

        return <Toolbar highScore={this.state.highScore}
                        players={this.state.players} onPlayersChange={_onPlayersChange}
                        onReloadClick={_onReloadClick} version={this.state.version}/>;
    }

    getModal(players) {
        if (players.length === 0) {
            return undefined;
        }
        if (players.length === 1) {
            return this._getModalSinglePlayer(players);
        }
        return this._getModalMultiPlayer(players);
    }

    _getModalSinglePlayer(players) {
        const _onModalClick = this.onModalClick.bind(this);
        const grid = players[0].grid;
        if (!grid.hasConnectedCells()) {
            const message = grid.isEmpty() ? 'You won' : 'Game over';
            const messageBody = this.state.highScore.changed
                ? ('New HighScore ' + this.state.highScore.score)
                : undefined;
            return <Modal heading={message} messageBody={messageBody} onClick={_onModalClick}/>
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

            const message = tie ? 'Both won' : `Player ${winner.playerId + 1} won`;
            return <Modal heading={message} onClick={_onModalClick}/>
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
