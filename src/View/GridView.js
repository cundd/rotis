import React from 'react';
import Column from './Column';

export default class extends React.Component {
    onCellClick(event, cell) {
        const cellProps = cell.props;
        this.props.clickHandler.handleClick(
            cellProps.color,
            cellProps.x,
            cellProps.y,
            this.props.player,
            this
        );
    }

    render() {
        const grid = this.props.player.grid;
        const size = this.props.size;
        const _onCellClick = this.onCellClick.bind(this);
        const createColumn = function (column, index) {
            return <Column key={index} data={column} columnIndex={index} grid={grid}
                           reverse="true" onCellClick={_onCellClick} size={size}/>;
        };

        const className = [
            'grid',
            'grid-reverse',
            'grid-width-' + size.columns,
            grid.hasConnectedCells() ? '-connected-cells' : '-no-connected-cells',
            grid.isEmpty() ? '-is-empty' : '-not-empty'
        ].join(' ');

        return <div className={className}>{grid.getColumns().map(createColumn)}</div>;
    }
}
