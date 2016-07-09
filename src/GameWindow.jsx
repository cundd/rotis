import React from 'react';
import Column from './Column';

class GameWindow extends React.Component {
    onCellClick(event, cell) {
        const cellProps = cell.props;

        this.props.clickHandler.handleClick(cellProps.color, cellProps.x,cellProps.y, this);
    }

    render() {
        const onCellClick = this.onCellClick.bind(this);
        const createColumn = function(column) {
            return <Column key={column.index} data={column} onCellClick={onCellClick} />;
        };

        return <div className="game-window">{this.props.store.columns.map(createColumn)}</div>;
    }
};

// export GameWindow;
module.exports = GameWindow;
