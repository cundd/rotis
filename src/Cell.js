export default class Cell {
    constructor(color, row, column) {
        this._color = color;
        this._row = row;
        this._column = column;
    }

    get color() {
        return this._color;
    }

    get x() {
        return this._row;
    }

    get row() {
        return this._row;
    }

    get y() {
        return this._column;
    }

    get column() {
        return this._column;
    }

    isEqualTo(anotherCell) {
        return this.color === anotherCell.color
        && this.x === anotherCell.x
        && this.y === anotherCell.y;
    }
}
