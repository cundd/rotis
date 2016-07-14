import Cell from './Cell.js';
import CellCollection from './CellCollection.js';

export default class Grid {
    constructor(columns) {
        this._columns = columns;
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

            console.log('Row(s) to remove in current column', rowsToRemoveInCurrentColumn, currentColumnIndex)
            if (typeof rowsToRemoveInCurrentColumn !== 'undefined') {
                // There are items to remove in the current column
                return column.filter(function (cell, rowIndex) {
                    return rowsToRemoveInCurrentColumn.indexOf(rowIndex) === -1;
                })
            }

            return column;
        });

        if (JSON.stringify(this._columns) === JSON.stringify(newColumns)) {
            throw "JSON of columns are identical";
        }

        return new Grid(newColumns.filter(function (column) {
            return column.length > 0;
        }));
    }

    hasConnectedCells() {
        let columns = this._columns;
        return 0 < columns.filter(
                function (cells, column) {
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
                }
            ).length;
    }

    /**
     *
     * @param Cell cell
     * @returns {*}
     */
    findConnectedCells(cell:Cell) {
        const cells = this._findConnectedCells(cell, new CellCollection());

        if (cells.length <= 1) {
            return [];
        }
        return cells;
    }

    getData() {
        return this._columns.slice();
    }

    _getColumn(col:Number) {
        return this._columns[col] || [];
    }

    _getCellColor(row, col) {
        return this._getColumn(col)[row];
    }

    _findConnectedCells(cell:Cell, previousCells:CellCollection) {
        let sibling;
        let matching = [cell];
        const color = this._getCellColor(cell.row, cell.column)

        previousCells.add(cell);

        // Check left
        if (color === this._getCellColor(cell.row, cell.column - 1)) {
            sibling = new Cell(color, cell.row, cell.column - 1);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        // Check right
        if (color === this._getCellColor(cell.row, cell.column + 1)) {
            sibling = new Cell(color, cell.row, cell.column + 1);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        // Check up
        if (color === this._getCellColor(cell.row - 1, cell.column)) {
            sibling = new Cell(color, cell.row - 1, cell.column);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        // Check down
        if (color === this._getCellColor(cell.row + 1, cell.column)) {
            sibling = new Cell(color, cell.row + 1, cell.column);
            if (!previousCells.contains(sibling)) {
                matching = matching.concat(this._findConnectedCells(sibling, previousCells));
            }
        }

        return matching;
    }
}
