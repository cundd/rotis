import Color from './Color';
import Grid from './Grid';

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

        let rows = Math.floor((applicationWindow.innerHeight - 2 * borderSize - toolbarHeight) / cellSize);
        let columns = Math.floor((applicationWindow.innerWidth / players - players * 2 * borderSize) / cellSize);

        return {
            rows: rows,
            columns: columns
        };
    }

    _createState(numberOfPlayers = 2) {
        const size = this._loadRowAndCountFromUri(numberOfPlayers);
        const grid = new Grid(this.buildRandomColumns(size.rows, size.columns));
        const grid2 = numberOfPlayers == 2 ? new Grid(this.buildRandomColumns(size.rows, size.columns)) : {};
        let highScore = this._applicationWindow().localStorage.getItem('highScore') || 0;

        return {
            'players': numberOfPlayers,
            'size': size,
            'grid': grid,
            'grid2': grid2,
            'score': 0,
            'score2': 0,
            'highScore': highScore,
            'version': '0.0.2'
        };
    }

    getState() {
        return this._state;
    }

    reset() {
        this._setState(this._createState(this._state.players));
    }

    setPlayers(numberOfPlayers) {
        this._setState(this._createState(numberOfPlayers));
    }

    setGrid(grid, gridKey) {
        let property = "grid";
        if (gridKey > 1) {
            property += gridKey;
        }

        const changedState = {};
        changedState[property] = grid;

        this._setState(Object.assign({}, this.getState(), changedState));
    }

    setScore(newScore) {
        const newState = Object.assign({}, this.getState(), {
            score: newScore
        });

        this._setState(newState);
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

    _setState(state) {
        this._changeHighScore(state);
        this._state = state;
        this.rootComponent.setState(state);
    }

    _changeHighScore(state) {
        if (state.highScore < state.score) {
            this._applicationWindow().localStorage.setItem('highScore', state.score);
        }
    }

    _applicationWindow() {
        return window;
    }
}
