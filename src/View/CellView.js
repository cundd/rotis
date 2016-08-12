import React from 'react';

export default class CellView extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        const _this = this;
        const triggerHandler = (event) => {
            _this.props.onCellClick(event, _this);
        };

        const cell = this.props.cell;
        const column = cell.column;
        const row = cell.row;
        const color = cell.color;
        let classNameCollection = ["cell", "cell-color-" + color];

        /** @type {Grid} grid */
        const grid = this.props.grid;
        const siblings = grid.findConnectedSiblings(cell);

        if (siblings.up) {
            classNameCollection.push('-connected-up');
        }
        if (siblings.down) {
            classNameCollection.push('-connected-down');
        }
        if (siblings.left) {
            classNameCollection.push('-connected-left');
        }
        if (siblings.right) {
            classNameCollection.push('-connected-right');
        }

        const className = classNameCollection.join(' ');

        if (CellView.isTouchDevice()) {
            return <div className={className} onTouchStart={triggerHandler}>{column}:{row}</div>;
        }
        return <div className={className} onClick={triggerHandler}>{column}:{row}</div>;
    }

    static isTouchDevice() {
        return (
            ('ontouchstart' in window)
            || (window['DocumentTouch'] && document instanceof window['DocumentTouch'])
        );
    }
}
