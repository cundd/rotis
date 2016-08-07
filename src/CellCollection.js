import CellData from './CellData';

export default class CellCollection {
    constructor(collection = []) {
        this.dictionary = {};

        collection.map(function (cell) {
            this.add(cell);
        });
    }

    contains(cell) {
        return typeof this.dictionary[CellCollection._keyForCell(cell)] !== 'undefined';
    }

    add(cell) {
        // if (CellData.isPrototypeOf(cell)) {}
        if (!cell instanceof CellData) {
            throw new TypeError('Collection items must be of type "Cell"');
        }
        this.dictionary[CellCollection._keyForCell(cell)] = cell;
    }

    static _keyForCell(cell) {
        return cell.row + ':' + cell.column;
    }

    // map(callback:Function) {
    //     return this.collection.map(callback);
    // }
    //
    // forEach(callback:Function) {
    //     return this.collection.forEach(callback);
    // }
    //
    // filter(callback:Function) {
    //     return this.collection.filter(callback);
    // }
}