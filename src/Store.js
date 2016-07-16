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
            Math.floor(applicationWindow.innerHeight / cellSize) -1,
            Math.floor(applicationWindow.innerWidth / cellSize) - 1
        ];
    }

    getInitialState() {
        const rowCol = this.loadRowAndCountFromUri();
        const rowCount = rowCol[0];
        const columnCount = rowCol[1];
        const grid = new Grid(this.buildRandomColumns(rowCount, columnCount));

        return {
            'size': {
                rows: rowCount,
                columns: columnCount
            },
            'grid': grid,
            'columns': grid.getData(),
            'score': 0
        };
    }

    getState() {
        return this._state;
    }

    setState(state) {
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

        for (i = 0; i < columnCount; i++) {
            row = [];
            for (j = 0; j < rowCount; j++) {
                row.push(this.getRandomColor());
            }
            columns.push(row);
        }

        return columns;
    }

    getRandomColor() {
        let keys = Object.keys(Color);
        const randomPosition = Math.floor(Math.random() * keys.length);

        return keys[randomPosition];
    }
}
