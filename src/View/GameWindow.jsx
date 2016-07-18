import React from 'react';
import Column from './Column';
import Modal from './Modal';
import Score from './Score';
import Reload from './Reload';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [],
            grid: null,
            score: 0
        };
    }

    onCellClick(event, cell) {
        const cellProps = cell.props;
        this.props.clickHandler.handleClick(cellProps.color, cellProps.x, cellProps.y, this);
    }

    onModalClick() {
        this.restart();
    }

    onReloadClick() {
        this.restart();
    }

    restart() {
        this.props.store.reset();
    }

    render() {
        const state = this.state;
        const grid = state.grid;
        const size = state.size;
        const _onReloadClick = this.onReloadClick.bind(this);
        const _onCellClick = this.onCellClick.bind(this);
        const _onModalClick = this.onModalClick.bind(this);
        const createColumn = function (column, index) {
            return <Column key={index} data={column} columnIndex={index} reverse="true" onCellClick={_onCellClick} size={size}/>;
        };

        let modal;
        if (grid && !grid.hasConnectedCells()) {
            modal = <Modal message="Game over" onClick={_onModalClick}/>
        }


        return <div className="game-window">
            <div className="toolbar"><Score score={state.score}/><Reload onClick={_onReloadClick}/></div>
            <div className="grid grid-reverse">{state.columns.map(createColumn)}</div>
            {modal}
        </div>;
    }
}
