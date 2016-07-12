import Cell from './Cell';

export default class CellCollection {
    constructor(collection:Array = []) {
        this.dictionary = {};

        collection.map(function (cell) {
            this.add(cell);
        });
    }

    contains(cell:Cell) {
        return typeof this.dictionary[this._keyForCell(cell)] !== 'undefined';
    }

    add(cell:Cell) {
        this.dictionary[this._keyForCell(cell)] = cell;
    }

    _keyForCell(cell:Cell) {
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