import Cell from './Cell.js';

class ClickHandler {
    constructor() {
        this.store = null;
        this._columns = [];
    }

    handleClick(color, x, y) {
        const grid = this.store.getState().grid;
        const connectedCells = grid.findConnectedCells(new Cell(color, x, y));
        const newGrid = grid.removeCells(connectedCells);

        this._updateState(newGrid, connectedCells);
    }

    _updateState(grid, connectedCells) {
        let stateBefore = this.store.getState();
        const previousScore = stateBefore.score;



        const newState = Object.assign({}, stateBefore, {
            grid: grid,
            columns: grid.getData(),
            score: previousScore + Math.pow(2, connectedCells.length)
        });

        this.store.setState(newState);
    }
}

export default ClickHandler;
