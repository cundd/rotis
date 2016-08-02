import React from 'react';
import Column from './Column';
import Modal from './Modal';
import Score from './Score';
import Reload from './Reload';
import Version from './Version';
import Grid from '../Grid';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [],
            grid: new Grid,
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
            return <Column key={index} data={column} columnIndex={index} grid={grid} reverse="true" onCellClick={_onCellClick}
                           size={size}/>;
        };

        let modal;
        if (!grid.hasConnectedCells()) {
            if (grid.isEmpty()) {
                modal = <Modal message="You won" onClick={_onModalClick}/>
            } else {
                modal = <Modal message="Game over" onClick={_onModalClick}/>
            }
        }

        this.lockScrolling();

        return <div className="game-window">
            <div className="toolbar">
                <Score score={state.score} highScore={state.highScore}/>
                <Reload onClick={_onReloadClick}/>
                <Version version={state.version}/>
            </div>
            <div className="grid grid-reverse">{state.columns.map(createColumn)}</div>
            {modal}
        </div>;
    }

    lockScrolling() {
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
    }
}
