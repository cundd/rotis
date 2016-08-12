import Color from './Model/Color';
import Grid from './Model/Grid';
import PlayerCollection from './Model/PlayerCollection';

export default class Store {
    static needs() {
        return ['clickHandler', 'environment'];
    };

    constructor(renderCallback, clickHandler) {
        this.environment = null;
        this.clickHandler = clickHandler || {};
        this.rootComponent = renderCallback(this);

        this._setState(this._createState());
    }

    didResolveDependencies() {
        this.clickHandler.store = this;
        this.environment.prepare();
    }

    getState() {
        return this._state;
    }

    reset() {
        this._setState(this._createState(this._state.players.keys().length));
    }

    setPlayers(numberOfPlayers) {
        this._setState(this._createState(numberOfPlayers));
    }

    setGrid(grid, player) {
        this._updatePlayer(player.playerId, {grid: grid});
    }

    setScore(newScore, player) {
        this._updatePlayer(player.playerId, {score: newScore});
    }

    buildRandomColumns(rowCount, columnCount) {
        let columns = [];
        let row;
        let i, j;

        const maxColors = Math.min(rowCount, columnCount);

        for (i = 0; i < columnCount; i++) {
            row = [];
            for (j = 0; j < rowCount; j++) {
                row.push(this.getRandomColor(maxColors));
            }
            columns.push(row);
        }

        return columns;
    }

    getRandomColor(maxColors) {
        let keys = Object.keys(Color);

        if (maxColors < keys.length) {
            keys = keys.slice(0, maxColors);
        }

        const randomPosition = Math.floor(Math.random() * keys.length);

        return keys[randomPosition];
    }

    _updatePlayer(playerId, playerData) {
        const previousState = this.getState();
        const changedState = {players: {}};

        const updatedPlayer = Object.assign({}, previousState.players[playerId], playerData);

        const changedPlayerCollection = {};
        changedPlayerCollection[playerId] = updatedPlayer;

        changedState.players = new PlayerCollection(Object.assign(
            {},
            previousState.players,
            changedPlayerCollection
        ));

        this._setState(Object.assign({}, this.getState(), changedState));
    }

    _loadRowAndCountFromUri(players) {
        const cellSize = 40;
        const borderSize = 10;
        const toolbarHeight = 30;
        const applicationWindow = this._applicationWindow();
        const hash = applicationWindow.location.hash;

        if (hash) {
            const rowCol = hash.substr(1).split('x');
            return {
                rows: rowCol[0],
                columns: rowCol[1]
            };
        }

        return {
            rows: Math.floor((applicationWindow.innerHeight - 2 * borderSize - toolbarHeight) / cellSize),
            columns: Math.floor((applicationWindow.innerWidth / players - 2 * borderSize) / cellSize)
        };
    }

    _createState(numberOfPlayers = 1) {
        const size = this._loadRowAndCountFromUri(numberOfPlayers);
        let highScore = this._applicationWindow().localStorage.getItem('highScore') || 0;

        let players = new PlayerCollection();
        let currentPlayer;
        for (let i = 0; i < numberOfPlayers; i++) {
            currentPlayer = this._createPlayerState(size, i);
            players[currentPlayer.playerId] = currentPlayer;
        }

        return {
            'players': players,
            'size': size,
            'highScore': highScore,
            'version': '0.1.1'
        };
    }

    _createPlayerState(size, playerId) {
        return {
            playerId: playerId,
            grid: new Grid(this.buildRandomColumns(size.rows, size.columns)),
            score: 0
        }
    }

    _setState(state) {
        this._changeHighScore(state);
        this._state = state;
        this.rootComponent.setState(state);
    }

    _changeHighScore(state) {
        const player = state.players['0'];
        if (player && player.score > state.highScore) {
            this._applicationWindow().localStorage.setItem('highScore', player.score);
        }
    }

    _applicationWindow() {
        return window;
    }
}
