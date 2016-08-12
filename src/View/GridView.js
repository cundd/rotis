import React from 'react';
import ColumnView from './ColumnView';

export default class GridView extends React.Component {
    onCellClick(event, cellView) {
        this.props.clickHandler.handleClick(
            cellView.props.cell,
            this.props.player,
            this
        );
    }

    render() {
        const grid = this.props.player.grid;
        const size = this.props.size;
        const _onCellClick = this.onCellClick.bind(this);
        const createColumn = function (column, index) {
            return <ColumnView key={index} column={column} grid={grid}
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
