import React from 'react';
import Column from './Column';
import Modal from './Modal';
import Score from './Score';
import Reload from './Reload';

let GameWindow = React.createClass({
    getInitialState: function () {
        return {
            columns: [],
            grid: null,
            score: 0
        };
    },

    onCellClick: function (event, cell) {
        const cellProps = cell.props;

        this.props.clickHandler.handleClick(cellProps.color, cellProps.x, cellProps.y, this);
    },

    onModalClick: function () {
        this.restart();
    },

    onReloadClick: function () {
        this.restart();
    },

    restart: function() {
        // this.setState(this.getInitialState());
        // window.location.reload();
        this.props.store.reset();
    },

    render: function () {
        const grid = this.state.grid;
        const _onCellClick = this.onCellClick;
        const createColumn = function (column, index) {
            return <Column key={index} data={column} columnIndex={index} onCellClick={_onCellClick}/>;
        };

        let modal;
        if (grid && !grid.hasConnectedCells()) {
            modal = <Modal message="Game over" onClick={this.onModalClick}/>
        }

        return <div className="game-window">
            <div className="toolbar"><Score score={this.state.score} /><Reload onClick={this.onReloadClick} /></div>
            <div className="grid">{this.state.columns.map(createColumn)}</div>
            {modal}
        </div>;
    }
});

export default GameWindow;
