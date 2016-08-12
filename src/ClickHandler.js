import CellData from './Model/CellData';

class ClickHandler {
    constructor() {
        this.store = null;
        this._columns = [];
    }

    handleClick(cell, player) {
        if (!(cell instanceof CellData)) {
            throw new TypeError('Argument cell must be of type "CellData"');
        }
        const grid = player.grid;
        const connectedCells = grid.findConnectedCells(cell);
        if (connectedCells.length > 1) {
            const newGrid = grid.removeCells(connectedCells);

            this._updateState(newGrid, connectedCells, player);
        }
    }

    _updateState(grid, connectedCells, player) {
        const newScore = player.score + Math.pow(2, connectedCells.length);

        this.store.setScore(newScore, player);
        this.store.setGrid(grid, player);
    }
}

export default ClickHandler;
