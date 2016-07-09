class ClickHandler {
    constructor() {
        this.store = null;
    }

    handleClick(color, x, y) {
        const matchingRows = this.findMatchingRows(color, x, y);

        console.log(matchingRows);
        this._removeRowsFromColumns(matchingRows, y)

    }

    _removeRowsFromColumns(rows, y) {
        if (rows.length === 0) {
            return;
        }
        const firstRow = rows[0];
        const lastRow = rows[rows.length - 1];
        let column = this._getColumn(y);

        console.log('Remove from row %i count %i', firstRow, lastRow - firstRow +1)
        const newRow = column.colors.slice();
        newRow.splice(firstRow, lastRow - firstRow+ 1);

        console.log('nr', newRow)
        column.colors = newRow;

        this._setColumn(y, column);
    }


    _updateState(columns) {
        let stateBefore =  this.store.getState();

console.log('sb', stateBefore);


console.log(columns)
const newState = Object.assign({}, stateBefore, {columns:columns});
console.log('sa',newState );

        this.store.setState(newState);
    }
    _setColumn(y, newColumn) {
        const columns = this.store.getState().columns;
        columns[y] = newColumn;

        this._updateState(columns)
    }

    _getColumn(y) {
        const columns = this.store.getState().columns;
        return columns[y];
    }

    findMatchingRows(color, x, y) {
        const rowsUp = this._findMatchingRowsUp(color, x, y);
        const rowsDown = this._findMatchingRowsDown(color, x, y);

        if (rowsUp.length === 0 && rowsDown.length === 0) {
            return [];
        }

        return [x].concat(rowsUp, rowsDown);
        //console.log(this._getColumn(y));
    }


    _findMatchingRowsUp(color, x, y) {
        const column = this._getColumn(y);
        const rows = column.colors;
        const rowsLength = rows.length;
        let matchingRows = [];

        let currentRow = x + 1;
        while(rows[currentRow] === color && currentRow < rowsLength) {
            console.log(rows[currentRow]);
            matchingRows.push(currentRow);
            currentRow += 1;
        }

        return matchingRows;
    }

    _findMatchingRowsDown(color, x, y) {
        const column = this._getColumn(y);
        const rows = column.colors;
        let matchingRows = [];


        let currentRow = x - 1;
        while(rows[currentRow] === color && currentRow >= 0) {
            console.log(rows[currentRow]);
            matchingRows.push(currentRow);
            currentRow -= 1;
        }

        return matchingRows;
    }


}

export default ClickHandler;
