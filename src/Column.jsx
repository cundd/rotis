import React from 'react';
import Cell from './Cell';

class Column extends React.Component {
    render() {
        let columnIndex = this.props.data.index;
        let onCellClick = this.props.onCellClick;
        let createCell = function(color, index) {
            return <Cell key={index} x={index} y={columnIndex} color={color} onCellClick={onCellClick}/>;
        };

        return <div className={"column column-"+this.props.data.index}>{this.props.data.colors.map(createCell)}</div>;
    }
};




export default Column;
