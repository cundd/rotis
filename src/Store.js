import Color from './Color';
import Grid from './Grid';

export default class Store {
    constructor(renderCallback, clickHandler) {
        clickHandler.store = this;

        this.rootComponent = renderCallback(this);
        this.setState(this.getInitialState());
    }

    loadRowAndCountFromUri() {
        const hash = window.location.hash;
        if (hash) {
            return hash.substr(1).split('x');
        }
        return [10, 20];
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
        //this.rootComponent.forceUpdate();
        this.rootComponent.setState(state);
        //this.store.setState(state);
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
        // let rows = this.state.size.rows;
        // let columns = this.state.size.columns;

        // var prop, len = 0, randomPos, pos = 0;
        //     for (prop in obj) {
        //         if (obj.hasOwnProperty(prop)) {
        //             len += 1;
        //         }
        //     }
        //     randomPos = Math.floor(Math.random() * len);
        //     for (prop in obj) {
        //         if (obj.hasOwnProperty(prop)) {
        //             if (pos === randomPos) {
        //                 return prop;
        //             }
        //             pos += 1;
        //         }
        //     }
    }

    getRandomColor() {
        let keys = Object.keys(Color);
        const randomPosition = Math.floor(Math.random() * keys.length);

        return keys[randomPosition];
    }
}
