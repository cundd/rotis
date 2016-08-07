import CellData from './CellData';

class ClickHandler {
    constructor() {
        this.store = null;
        this._columns = [];
    }

    handleClick(color, x, y, grid, gridKey) {
        const connectedCells = grid.findConnectedCells(new CellData(color, x, y));
        if (connectedCells.length <= 1) {
            return;
        }
        const newGrid = grid.removeCells(connectedCells);

        this._updateState(newGrid, connectedCells, gridKey);
    }

    _updateState(grid, connectedCells, gridKey) {
        let stateBefore = this.store.getState();
        const previousScore = stateBefore.score;
        let newScore = previousScore + Math.pow(2, connectedCells.length);

        this.store.setScore(newScore);
        this.store.setGrid(grid, gridKey);
    }
}

export default ClickHandler;
