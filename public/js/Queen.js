var Queen = (function (parent) {

    function Queen(game, cell, chessCoordinates, image, isOpposite, font) {

        parent.call(this, game, cell, chessCoordinates, image, isOpposite, font);


    }

    Queen.prototype = Object.create(parent.prototype);
    Queen.prototype.constructor = Queen;

    Queen.prototype.readyToMove = function (game) {
        var cell = this.getCell();
        var position = cell.getCoordinates();
        var horizontal = position.charAt(1);
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];

        for (var i = parseInt(horizontal) + 1, k = verticalIndex - 1; i <= 8 && k >= asciiCodeOfA; i++, k--) {
            var currentCell = game.cellAt(String.fromCharCode(k) + (parseInt(i)));
            if (currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/) {
                activeCells.push(currentCell);
            }
            else if ((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())) {
                activeCells.push(currentCell);
                break;
            }
            else {
                break;
            }
        }

        for (var i = parseInt(horizontal) + 1, k = verticalIndex + 1; i <= 8 && k <= asciiCodeOfH; i++, k++) {
            var currentCell = game.cellAt(String.fromCharCode(k) + i);
            if (currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/) {
                activeCells.push(currentCell);
            }
            else if ((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())) {
                activeCells.push(currentCell);
                break;
            }
            else {
                break;
            }
        }

        for (var i = parseInt(horizontal) - 1, k = verticalIndex - 1; i >= 1 && k >= asciiCodeOfA; i--, k--) {
            var currentCell = game.cellAt(String.fromCharCode(k) + i);
            if (currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/) {
                activeCells.push(currentCell);
            }
            else if ((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())) {
                activeCells.push(currentCell);
                break;
            }
            else {
                break;
            }
        }

        for (var i = parseInt(horizontal) - 1, k = verticalIndex + 1; i >= 1 && k <= asciiCodeOfH; i--, k++) {
            var currentCell = game.cellAt(String.fromCharCode(k) + i);
            if (currentCell.getFigure() === null /*|| (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())*/) {
                activeCells.push(currentCell);
            }
            else if ((currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite())) {
                activeCells.push(currentCell);
                break;
            }
            else {
                break;
            }
        }

        for (var i = parseInt(horizontal) - 1; i > 0; i--) {
            if (game.cellAt(vertical + i).getFigure() == null /*|| board.cellAt(vertical + i).getFigure().getIsOpposite()*/) {
                activeCells.push(game.cellAt(vertical + i));
            }
            else if (game.cellAt(vertical + i).getFigure() !== null && game.cellAt(vertical + i).getFigure().getIsOpposite()) {
                activeCells.push(game.cellAt(vertical + i));
                break;
            }
            else {
                break;
            }
        }
        for (var i = parseInt(horizontal) + 1; i <= 8; i++) {
            if (game.cellAt(vertical + (i)).getFigure() == null /*|| board.cellAt(vertical + (i)).getFigure().getIsOpposite()*/) {
                activeCells.push(game.cellAt(vertical + i));
            }
            else if (game.cellAt(vertical + i).getFigure() !== null && game.cellAt(vertical + i).getFigure().getIsOpposite()) {
                activeCells.push(game.cellAt(vertical + i));
                break;
            }
            else {
                break;
            }
        }

        for (var i = verticalIndex - 1; i >= asciiCodeOfA; i--) {
            var currentVertical = String.fromCharCode(i);
            var currentCell = game.cellAt(currentVertical + horizontal);

            if (currentCell.getFigure() == null) {
                activeCells.push(currentCell);
            }
            else if (currentCell.getFigure() !== null && (currentCell.getFigure().getIsOpposite())) {
                activeCells.push(currentCell);
                break;
            }
            else {
                break;
            }
        }
        for (var i = verticalIndex + 1; i <= asciiCodeOfH; i++) {
            var currentVertical = String.fromCharCode(i);
            var currentCell = game.cellAt(currentVertical + horizontal);
            if (currentCell.getFigure() == null) {
                activeCells.push(currentCell);
            }
            else if (currentCell.getFigure() !== null && currentCell.getFigure().getIsOpposite()) {
                activeCells.push(currentCell);
                break;
            }
            else {
                break;
            }
        }

        for (var i = 0; i < activeCells.length; i++) {
            activeCells[i].getImage().visible = true;
        }


        this.setActiveCells(activeCells);

        return activeCells;


    }


    return Queen;

}(Figure))