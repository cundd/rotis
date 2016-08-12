import CellData from './CellData';
import Column from './Column';
import CellCollection from './CellCollection.js';

export default class Grid {
    constructor(columns) {
        this._columns = columns || [];
    }

    removeCells(cellsToRemove) {
        if (cellsToRemove.length === 0) {
            return new Grid(this._columns.slice());
        }

        let columnsToRowsMap = {};
        cellsToRemove.forEach(function (cell) {
            if (typeof columnsToRowsMap[cell.column] === 'undefined') {
                columnsToRowsMap[cell.column] = [cell.row];
            } else {
                columnsToRowsMap[cell.column].push(cell.row);
            }
        });

        const newColumns = this._columns.map(function (column, currentColumnIndex) {
            let rowsToRemoveInCurrentColumn = columnsToRowsMap[currentColumnIndex];

            if (typeof rowsToRemoveInCurrentColumn !== 'undefined') {
                console.log('Row(s) to remove in current column', rowsToRemoveInCurrentColumn, currentColumnIndex);

                // There are items to remove in the current column
                return column.filter(function (cell, rowIndex) {
                    return rowsToRemoveInCurrentColumn.indexOf(rowIndex) === -1;
                })
            }

            return column;
        });

        if (JSON.stringify(this._columns) === JSON.stringify(newColumns)) {
            throw new Error("JSON of columns are identical");
        }

        return new Grid(newColumns.filter(function (column) {
            return column.length > 0;
        }));
    }

    hasConnectedCells() {
        let columns = this._columns;
        const filterFunction = function (cells, column) {
            const cellsLength = cells.length;

            for (let i = 0; i < cellsLength; i += 1) {
                const color = cells[i];
                const nextColor = cells[i + 1];
                if (color === nextColor) {
                    return true;
                }

                const nextColumn = columns[column + 1];
                if (nextColumn && color === nextColumn[i]) {
                    return true;
                }
            }

            return false;
        };

        return 0 < columns.filter(filterFunction).length;
    }

    // numberOfConnectedCells() {
    //     // const columns = this._columns;
    //     return this._columns.reduce(function (previousValue, cells, columnIndex, columns) {
    //         const cellsLength = cells.length;
    //         let currentCount = 0;
    //
    //         for (let i = 0; i < cellsLength; i += 1) {
    //             const color = cells[i];
    //             const nextColor = cells[i + 1];
    //             if (color === nextColor) {
    //                 currentCount += 1;
    //             }
    //
    //             const nextColumn = columns[columnIndex + 1];
    //             if (nextColumn && color === nextColumn[i]) {
    //                 currentCount += 1;
    //             }
    //         }
    //
    //         return previousValue + currentCount;
    //
    //     }, 0);
    // }

    isEmpty() {
        return !(this._columns && this._columns.length);
    }

    /**
     *
     * @param {Cell} cell
     * @returns {*}
     */
    findConnectedCells(cell) {
        const cells = this._findConnectedCells(cell, new CellCollection());

        if (cells.length <= 1) {
            return [];
        }
        return cells;
    }

    getColumns() {
        return this._columns.slice().map(function(column, columnIndex) {
            return new Column(column, columnIndex);
        });
    }

    _getColumn(col) {
        return new Column(this._columns[col] || [], col);
    }

    _getCell(row, col) {
        return this._getColumn(col).getCell(row);
    }

    _getCellColor(row, col) {
        const cell = this._getCell(row, col);
        return cell ? cell.color : undefined;
    }

    _findConnectedCells(cell, previousCells) {
        if (!(cell instanceof CellData)) {
            throw new TypeError('Argument cell must be of type CellData');
        }
        let sibling;
        let matching = [cell];
        const color = this._getCellColor(cell.row, cell.column);

        previousCells.add(cell);

        // Check left
        if (color === this._getCellColor(cell.row, cell.column - 1)) {
            sibling = new CellData(color, cell.row, cell.column - 1);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        // Check right
        if (color === this._getCellColor(cell.row, cell.column + 1)) {
            sibling = new CellData(color, cell.row, cell.column + 1);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        // Check up
        if (color === this._getCellColor(cell.row - 1, cell.column)) {
            sibling = new CellData(color, cell.row - 1, cell.column);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        // Check down
        if (color === this._getCellColor(cell.row + 1, cell.column)) {
            sibling = new CellData(color, cell.row + 1, cell.column);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        return matching;
    }

    findConnectedSiblings(cell) {
        let matching = {};
        const color = this._getCellColor(cell.row, cell.column);

        // Check left
        if (color === this._getCellColor(cell.row, cell.column - 1)) {
            matching.left = (new CellData(color, cell.row, cell.column - 1));
        }

        // Check right
        if (color === this._getCellColor(cell.row, cell.column + 1)) {
            matching.right = (new CellData(color, cell.row, cell.column + 1));
        }

        // Check up
        if (color === this._getCellColor(cell.row - 1, cell.column)) {
            matching.up = (new CellData(color, cell.row - 1, cell.column));
        }

        // Check down
        if (color === this._getCellColor(cell.row + 1, cell.column)) {
            matching.down = (new CellData(color, cell.row + 1, cell.column));
        }

        return matching;
    }
}
