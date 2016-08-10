import CellData from './CellData';

class ClickHandler {
    constructor() {
        this.store = null;
        this._columns = [];
    }

    handleClick(color, x, y, player) {
        const grid = player.grid;
        const connectedCells = grid.findConnectedCells(new CellData(color, x, y));
        if (connectedCells.length > 1) {
            const newGrid = grid.removeCells(connectedCells);

            this._updateState(newGrid, connectedCells, player);
        }
    }

    _updateState(grid, connectedCells, player) {
        const stateBefore = this.store.getState();
        const previousScore = stateBefore.score;
        const newScore = player.score + Math.pow(2, connectedCells.length);

        console.info(player.score, previousScore , Math.pow(2, connectedCells.length))

        this.store.setScore(newScore, player);
        this.store.setGrid(grid, player);
    }
}

export default ClickHandler;
