import Color from './Color';
import Grid from './Grid';

export default class Store {
    constructor(renderCallback, clickHandler) {
        clickHandler.store = this;

        this.rootComponent = renderCallback(this);
        this.setState(this.getInitialState());
    }

    applicationWindow() {
        return window;
    }

    loadRowAndCountFromUri() {
        const cellSize = 40;
        const applicationWindow = this.applicationWindow();
        const hash = applicationWindow.location.hash;
        if (hash) {
            return hash.substr(1).split('x');
        }

        return [
            Math.floor(applicationWindow.innerHeight / cellSize) - 1,
            Math.floor(applicationWindow.innerWidth / cellSize) - 1
        ];
    }

    getInitialState() {
        const rowCol = this.loadRowAndCountFromUri();
        const rowCount = rowCol[0];
        const columnCount = rowCol[1];
        const grid = new Grid(this.buildRandomColumns(rowCount, columnCount));

        let highScore = this.applicationWindow().localStorage.getItem('highScore') || 0;

        return {
            'size': {
                rows: rowCount,
                columns: columnCount
            },
            'grid': grid,
            'columns': grid.getData(),
            'score': 0,
            'highScore': highScore,
            'version': '0.0.1'
        };
    }

    getState() {
        return this._state;
    }

    setState(state) {
        this._changeHighScore(state);
        this._state = state;
        this.rootComponent.setState(state);
    }

    reset() {
        this.setState(this.getInitialState());
    }

    dispatch(action) {

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

    _changeHighScore(state) {
        if (state.highScore < state.score) {
            this.applicationWindow().localStorage.setItem('highScore', state.score);
        }
    }
}
