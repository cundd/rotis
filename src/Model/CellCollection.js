import CellData from './CellData';
import IrLib from 'irlib/dist/irlib';

export default class CellCollection {
    constructor(collection = []) {
        this.dictionary = new IrLib.Dictionary();

        collection.forEach(function (cell) {
            this.add(cell);
        }, this);
    }

    contains(cell) {
        return typeof this.dictionary[CellCollection._keyForCell(cell)] !== 'undefined';
    }

    add(cell) {
        if (!(cell instanceof CellData)) {
            throw new TypeError('Collection items must be of type "CellData"');
        }
        if (cell.row < 0) {
            throw new TypeError('Cell row must not be lower than zero');
        }
        if (cell.column < 0) {
            throw new TypeError('Cell column must not be lower than zero');
        }

        this.dictionary[CellCollection._keyForCell(cell)] = cell;
    }

    static _keyForCell(cell) {
        return cell.row + ':' + cell.column + ':' + cell.color;
    }

    map(callback) {
        return this.dictionary.map(callback, this);
    }

    forEach(callback) {
        return this.dictionary.forEach(callback, this);
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