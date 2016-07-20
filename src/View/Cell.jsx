import React from 'react';

class Cell extends React.Component {
    render() {
        const _this = this;
        const triggerHandler = (event) => {
            _this.props.onCellClick(event, _this);
        };
        const className = "cell cell-color-" + this.props.color;

        // if (this.isTouchDevice()) {
        //     return <div className={className} onTouchEnd={triggerHandler}>{this.props.y}:{this.props.x}</div>;
        // }
        return <div className={className} onClick={triggerHandler}>{this.props.y}:{this.props.x}</div>;
    }

    isTouchDevice() {
        return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    }
}

export default Cell;
