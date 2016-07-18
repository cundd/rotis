import React from 'react';

const Cell = React.createClass({
    render: function() {
        const className = "cell cell-color-" + this.props.color;
        return <div className={className} onClick={(e) => {this.props.onCellClick(e, this)}}>{this.props.y}:{this.props.x}</div>;
    }
});

export default Cell;
