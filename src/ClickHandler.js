import Cell from './Cell.js';

class ClickHandler {
    constructor() {
        this.store = null;
        this._columns = [];
        this._cellsToRemove = [];
    }

    handleClick(color, x, y) {
        const grid = this.store.getState().grid;
        const connectedCells = grid.findConnectedCells(new Cell(color, x, y));
        const newGrid = grid.removeCells(connectedCells);

        console.log(connectedCells);

        this._updateState(newGrid);
    }

    _updateState(grid) {
        let stateBefore = this.store.getState();
        const newState = Object.assign({}, stateBefore, {
            grid: grid,
            columns: grid.getData()
        });

        this.store.setState(newState);
    }
}

export default ClickHandler;
