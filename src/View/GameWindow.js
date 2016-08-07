import React from 'react';
import Column from './Column';
import Modal from './Modal';
import Score from './Score';
import Reload from './Reload';
import Version from './Version';

export default class extends React.Component {
    onCellClick(event, cell) {
        const cellProps = cell.props;
        this.props.clickHandler.handleClick(cellProps.color, cellProps.x, cellProps.y, this);
    }

    onModalClick() {
        this.props.restart();
    }

    onReloadClick() {
        this.props.restart();
    }

    render() {
        const grid = this.props.grid;
        const size = this.props.size;
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

        return <div className="game-window">
            <div className="toolbar">
                <Score score={this.props.score} highScore={this.props.highScore}/>
                <Reload onClick={_onReloadClick}/>
                <Version version={this.props.version}/>
            </div>
            <div className="grid grid-reverse">{grid.getColumns().map(createColumn)}</div>
            {modal}
        </div>;
    }
}
