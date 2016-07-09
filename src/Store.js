import Color from './Color';

export default class Store {
    constructor(renderCallback, clickHandler) {
        this._state = this.getInitialState();

        clickHandler.store = this;

        this.rootComponent = renderCallback(this);

    }

    getInitialState() {
        const rowCount = 10;
        const columnCount = 8;

        return {
            'size': {
                rows: rowCount,
                columns: columnCount
            },
            'columns': this.buildRandomColumns(rowCount, columnCount)
        };
    }

    getState() {
        return this._state;
    }

    setState(state) {
        this.rootComponent.forceUpdate();
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
            columns.push({
                index: i,
                colors: row
            });
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
