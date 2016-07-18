import React from 'react';
import Cell from './Cell';

class Column extends React.Component {
    render() {
        const reverse = this.props.reverse;
        const size = this.props.size;
        const columnIndex = this.props.columnIndex;
        const onCellClick = this.props.onCellClick;

        const createCell = function (cell, index) {
            let row = index;

            console.log(index);
            if (reverse) {
                row = size.rows - index - 1;
            }

            return <Cell key={index} x={cell.row} y={columnIndex} b={index} color={cell.color} onCellClick={onCellClick}/>;
        };


        let cells = this.props.data.map(function(color, index) {
            return {
                color: color,
                row: index
            }
        });

        if (reverse) {
            cells = cells.reverse();
        }

        // const cellsBottomUp = cells.slice();
        console.log("Cols %i len %i", size.rows, cells.length);

        // const spacerSize = 0;
        const spacerSize = size.rows - cells.length;
        const classes = "column column-" + columnIndex + " top-" + spacerSize;

        return <div className={classes}>{cells.map(createCell)}</div>;
    }
}

export default Column;
