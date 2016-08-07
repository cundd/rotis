import React from 'react';
import DataCell from '../CellData';

class Cell extends React.Component {
    render() {
        const _this = this;
        const triggerHandler = (event) => {
            _this.props.onCellClick(event, _this);
        };

        const column = this.props.y;
        const row = this.props.x;
        const color = this.props.color;
        let classNameCollection = ["cell", "cell-color-" + color];

        /** @type {Grid} grid */
        const grid = this.props.grid;

        const siblings = grid.findConnectedSiblings(new DataCell(color, row, column));
        console.log(siblings);

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

        if (this.isTouchDevice()) {
            return <div className={className} onTouchStart={triggerHandler}>{column}:{row}</div>;
        }
        return <div className={className} onClick={triggerHandler}>{column}:{row}</div>;
    }

    isTouchDevice() {
        return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    }
}

export default Cell;
