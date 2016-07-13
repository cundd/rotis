import React from 'react';
import Column from './Column';

let GameWindow = React.createClass({
    getInitialState: function () {
        return {columns: []};
    },

    onCellClick: function (event, cell) {
        const cellProps = cell.props;

        this.props.clickHandler.handleClick(cellProps.color, cellProps.x, cellProps.y, this);
    },

    render: function () {
        const onCellClick = this.onCellClick;
        const createColumn = function (column, index) {
            return <Column key={index} data={column} columnIndex={index} onCellClick={onCellClick}/>;
        };

        return <div className="game-window">
            <div className="grid">{this.state.columns.map(createColumn)}</div>
            <div className="toolbar">Score <span className="score">{this.state.score}</span></div>
        </div>;
    }
})

export default GameWindow;
