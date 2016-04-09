var Knight = (function (parent) {

    function Knight(game, cell, chessCoordinates, image, isOpposite, font) {

        parent.call(this, game, cell, chessCoordinates, image, isOpposite, font);

    }

    Knight.prototype = Object.create(Figure.prototype);
    Knight.constructor = Knight;

    Knight.prototype.readyToMove = function (game) {
        var cell = this.getCell();
        var position = cell.getCoordinates();
        var horizontal = parseInt(position.charAt(1));
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];


        if (horizontal + 2 <= 8 && verticalIndex + 1 <= asciiCodeOfH) {
            console.log(String.fromCharCode(verticalIndex + 1) + (horizontal + 2));
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex + 1) + (horizontal + 2));
            console.log(currentCell);
            if (currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())) {
                activeCells.push(currentCell);
            }
        }
        console.log(verticalIndex - 1 >= asciiCodeOfA);
        if (horizontal + 2 <= 8 && verticalIndex - 1 >= asciiCodeOfA) {
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex - 1) + (horizontal + 2));
            if (currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())) {
                activeCells.push(currentCell);
            }
        }

        if(horizontal + 1 <= 8 && verticalIndex + 2 <= asciiCodeOfH){
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex + 2) + (horizontal + 1));
            if(currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        if(horizontal - 1 >= 1 && verticalIndex + 2 <= asciiCodeOfH){
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex + 2) + (horizontal - 1));
            if(currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        if(horizontal - 2 >= 1 && verticalIndex + 1 <= asciiCodeOfH){
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex + 1) + (horizontal - 2));
            if(currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        if(horizontal - 2 >= 1 && verticalIndex - 1 >= asciiCodeOfA){
            console.log(String.fromCharCode(verticalIndex - 1) + (horizontal - 2));
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex - 1) + (horizontal - 2));
            if(currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        if(horizontal - 1 >= 1 && verticalIndex - 2 >= asciiCodeOfA){
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex - 2) + (horizontal - 1));
            if(currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        if(horizontal + 1 <= 8 && verticalIndex - 2 >= asciiCodeOfA){
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex - 2) + (horizontal + 1));
            if(currentCell.getFigure() == null || (currentCell.getFigure() != null && currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        console.log(activeCells);

        for (var i = 0; i < activeCells.length; i++) {
            activeCells[i].getImage().visible = true;
        }

        this.setActiveCells(activeCells);

    }

    return Knight;

}(Figure))