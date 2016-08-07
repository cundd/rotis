import CellData from './CellData';

class ClickHandler {
    constructor() {
        this.store = null;
        this._columns = [];
    }

    handleClick(color, x, y) {
        const grid = this.store.getState().grid;
        const connectedCells = grid.findConnectedCells(new CellData(color, x, y));
        const newGrid = grid.removeCells(connectedCells);

        this._updateState(newGrid, connectedCells);
    }

    _updateState(grid, connectedCells) {
        let stateBefore = this.store.getState();
        const previousScore = stateBefore.score;
        let newScore = previousScore;
        if (connectedCells.length > 1) {
            newScore = previousScore + Math.pow(2, connectedCells.length);
        }

        const newState = Object.assign({}, stateBefore, {
            grid: grid,
            columns: grid.getColumns(),
            score: newScore
        });

        this.store.setState(newState);
    }
}

export default ClickHandler;
