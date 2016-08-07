import React from 'react';
import Cell from './Cell';

class Column extends React.Component {
    render() {
        const reverse = this.props.reverse;
        const size = this.props.size;
        const columnIndex = this.props.columnIndex;
        const onCellClick = this.props.onCellClick;
        const grid = this.props.grid;

        const createCell = function (cell, index) {
            return <Cell key={index} x={cell.row} y={columnIndex} color={cell.color} grid={grid}
                         onCellClick={onCellClick}/>;
        };


        let cells = this.props.data.map(function (color, index) {
            return {
                color: color,
                row: index
            }
        });

        if (reverse) {
            cells = cells.reverse();
        }

        const spacerSize = size.rows - cells.length;
        const classes = "column column-" + columnIndex + " top-" + spacerSize;

        return <div className={classes}>{cells.map(createCell)}</div>;
    }
}

export default Column;
