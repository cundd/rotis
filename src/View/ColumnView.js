import React from 'react';
import CellView from './CellView';

export default class ColumnView extends React.Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return ColumnView._didCellsChange(this.props.column.getCells(), nextProps.column.getCells());
    // }

    render() {
        const dataColumn = this.props.column;
        const reverse = this.props.reverse;
        const size = this.props.size;
        const columnIndex = dataColumn.columnIndex;
        const onCellClick = this.props.onCellClick;
        const grid = this.props.grid;

        const createCell = function (cell, index) {
            return <CellView key={index} cell={cell} grid={grid} onCellClick={onCellClick}/>;
        };


        let cells = dataColumn.getCells();
        if (reverse) {
            cells = cells.reverse();
        }

        const spacerSize = size.rows - cells.length;
        const classes = "column column-" + columnIndex + " top-" + spacerSize;

        return <div className={classes}>{cells.map(createCell)}</div>;
    }

    static _didCellsChange(cellsA, cellsB) {
        const length = cellsA.length;

        if (length !== cellsB.length) {
            return true;
        }

        for (let i = 0; i < length; i++) {
            if (!cellsA[i].isEqualTo(cellsB[i])) {
                return true;
            }
        }
        return false;
    }
}
