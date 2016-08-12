import CellData from './CellData';
import CellCollection from './CellCollection';

export default class Column extends CellCollection {
    constructor(collection, columnIndex) {
        super();

        this.columnIndex = columnIndex;

        collection.forEach(function (cell, row) {
            if (cell instanceof CellData) {
                this.add(cell);
            } else {
                this.add(new CellData(cell, row, columnIndex));
            }
        }, this);
    }

    getCell(row) {
        return this.getCells()[row];
    }

    getCells() {
        return this.dictionary.values();
    }

    // For development
    get '0' () {
        throw new TypeError('ColumnView must not be used as array');
    }
    get '1' () {
        throw new TypeError('ColumnView must not be used as array');
    }
}