var Figure = (function () {
    var self = this;

    function Figure(game, cell, chessCoordinates, image, isOpposite, font) {

        if (typeof this.constructor === 'Figure') {
            throw new Error('You cannot create instance of Figure!');
        }

        var _game = game;

        var _cell = cell;

        var _image = image;

        var _chessCoordinates = chessCoordinates;

        var _activeCells = [];

        var _isOpposite = isOpposite;

        var _font = font;

        this.getIsOpposite = function () {
            return _isOpposite;
        }

        this.setIsOpposite = function (isOpposite) {
            _isOpposite = isOpposite;
        }


        this.getGame = function () {
            return game;
        }

        this.setGame = function (game) {
            _game = game;
        }

        this.getImage = function () {
            return _image;
        }

        this.setImage = function (image) {
            _image = image;
        }

        this.getCell = function () {
            return _cell;
        }

        this.setCell = function (cell) {
            _cell = cell;
        }

        this.getCoordinates = function () {
            return _chessCoordinates;
        }

        this.setCoordinates = function (coordinates) {
            _chessCoordinates = coordinates;
        }

        this.getActiveCells = function () {
            return _activeCells;
        }

        this.setActiveCells = function (activeCells) {
            _activeCells = activeCells;
        }

        this.getFont = function () {
            return _font;
        }

        this.setFont = function (font) {
            _font = font;
        }

    }


    Figure.prototype.readyToMove = function () {
        throw new Error('You must implement move method!');
    }

    Figure.prototype.makeMirrorMove = function (charCode) {
        var oldPosition = charCode.split(' ')[0];
        var newPosition = charCode.split(' ')[1];
        var oldVerticalIndex = oldPosition.charAt(0);
        var oldHorizontalIndex = oldPosition.charAt(1);
        var newVerticalIndex = newPosition.charAt(0);
        var newHorizontalIndex = newPosition.charAt(1);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var differenceBetweenOldVerticalIndex = oldVerticalIndex.charCodeAt(0) - asciiCodeOfA;
        var differenceBetweenNewVerticalIndex = newVerticalIndex.charCodeAt(0) - asciiCodeOfA;
        var mirrorMove = '';

        oldVerticalIndex = String.fromCharCode(asciiCodeOfH - differenceBetweenOldVerticalIndex);
        newVerticalIndex = String.fromCharCode(asciiCodeOfH - differenceBetweenNewVerticalIndex);

        oldHorizontalIndex = 8 - oldHorizontalIndex + 1;
        newHorizontalIndex = 8 - newHorizontalIndex + 1;

        mirrorMove = oldVerticalIndex + oldHorizontalIndex + ' ' + newVerticalIndex + newHorizontalIndex;
        return mirrorMove;
    }

    Figure.prototype.move = function (game, cells, connection) {
        var currentPosition = this.getCell().getCoordinates();
        var activeCells = this.getActiveCells();
        var self = this;
        var currentCell = self.getCell();
        for (var i = 0; i < activeCells.length; i++) {

            function moveFigure() {
                if (this.activeCell.getFigure() !== null) {
                    this.activeCell.getFigure().getImage().destroy();
                    document.getElementById('my-taken-figures').innerHTML = this.activeCell.getFigure().getFont();
                }

                var image = this.currentFigure.getImage();
                var animation = game.add.tween(image);
                animation.to({
                    x: this.activeCell.getImage().x,
                    y: this.activeCell.getImage().y
                }, 1500, Phaser.Easing.Linear.In, true);
                animation.start();
                this.activeCell.setFigure(this.currentFigure);
                this.currentFigure.setCell(this.activeCell);
                this.currentFigure.setActiveCells([]);
                this.currentFigure.setCoordinates(this.activeCell.getCoordinates());
                this.currentCell.setFigure(null);

                for (var j = 0; j < this.activeCells.length; j++) {
                    this.activeCells[j].getImage().visible = false;
                    this.activeCells[j].getImage().events.onInputDown.dispose();
                }

                var mattResponse = matt(self, cells, game);

                console.log(mattResponse);

                var moveCharcode = this.currentCell.getCoordinates() + ' ' + this.activeCell.getCoordinates();
                //send to server
                var serverInfo = {
                    "mattResponse": mattResponse,
                    "moveCharcode": self.makeMirrorMove(moveCharcode)
                }

                if(mattResponse.matt){
                    var text = game.add.text(game.world.centerX, game.world.centerY, 'You win!', { font: '64px Arial', fill: 'green' });
                    text.anchor.set(0.5);
                }

                console.log('connection in move: ', connection);

                connection.send(JSON.stringify(serverInfo));

            }

            (function (activeCell) {
                activeCell.getImage().input.priorityID = 5;

                activeCell.getImage().events.onInputDown.add(moveFigure, {
                    activeCell: activeCell,
                    currentCell: currentCell,
                    activeCells: activeCells,
                    currentFigure: self
                }, 6);
            })(activeCells[i])

        }
        if (activeCells.length > 0) {
            game.board.inputEnabled = true;
            game.board.events.onInputDown.add(function () {
                for (var i = 0; i < activeCells.length; i++) {
                    activeCells[i].getImage().visible = false;
                }

                activeCells = [];
            });
        }
    }

    function oppositeKingActiveCells(king, game){
        var cell = king.getCell();
        var position = cell.getCoordinates();
        var horizontal = parseInt(position.charAt(1));
        var vertical = position.charAt(0);
        var verticalIndex = vertical.charCodeAt(0);
        var asciiCodeOfA = 'a'.charCodeAt(0);
        var asciiCodeOfH = 'h'.charCodeAt(0);
        var activeCells = [];
        //console.log(board.cellAt(String.fromCharCode(verticalIndex - 1) + horizontal));
        if(verticalIndex + 1 <= asciiCodeOfH){
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex + 1) + horizontal);
            if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && !currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }

        }
        if(verticalIndex - 1 >= asciiCodeOfA){
            var currentCell = game.cellAt(String.fromCharCode(verticalIndex - 1) + horizontal);
            if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && !currentCell.getFigure().getIsOpposite())){
                activeCells.push(currentCell);
            }
        }
        for(var i = verticalIndex - 1; i <= verticalIndex + 1 && i <= asciiCodeOfH && i >= asciiCodeOfA; i++){
            //console.log(board.cellAt(String.fromCharCode(i) + (horizontal - 1)));
            if(horizontal - 1 > 0){
                var currentCell = game.cellAt(String.fromCharCode(i) + (horizontal - 1));
                if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && !currentCell.getFigure().getIsOpposite())){
                    activeCells.push(currentCell);
                }
            }
        }
        for(var i = verticalIndex - 1; i <= verticalIndex + 1 && i <= asciiCodeOfH && i >= asciiCodeOfA; i++){
            if(horizontal + 1 < 9){
                var currentCell = game.cellAt(String.fromCharCode(i) + (horizontal + 1));
                if(currentCell.getFigure() == null || (currentCell.getFigure() !== null && !currentCell.getFigure().getIsOpposite())){
                    activeCells.push(currentCell);
                }
            }
        }

        return activeCells;

    }

    function matt(figure, cells, game){
        figure.readyToMove(game);
        var futureActiveCells = figure.getActiveCells();
        //console.log(futureActiveCells);
        for(var i = 0; i < futureActiveCells.length; i++){
            futureActiveCells[i].getImage().visible = false;
        }
        var chess = false;
        var matt = false;
        var kingActiveCells = [];
        var collisionAllActiveKingCells = true;
        for(var i = 0; i < futureActiveCells.length; i++){
            (function(futureActiveCell){
                if(futureActiveCell.getFigure() instanceof King){
                    //futureActiveCell.getFigure().readyToMove(game);
                    kingActiveCells = oppositeKingActiveCells(futureActiveCell.getFigure(), game);
                   /* for(var j = 0; j < kingActiveCells.length; j++){
                        kingActiveCells[j].getImage().visible = false;
                    }*/
                    var kingCell = futureActiveCell;

                    chess = true;
                   // break;
                }
            }(futureActiveCells[i]))
            if(chess == true){
                break;
            }
        }

        console.log('figure coordinates', figure.getCoordinates());
        if(chess == true){
            for(var i = 0; i < kingActiveCells.length; i++){
                if(kingActiveCells[i].getFigure() !== null){
                    console.log('king active cell', kingActiveCells[i].getFigure().getCoordinates() );
                    if(kingActiveCells[i].getFigure().getCoordinates() === figure.getCoordinates()){

                        matt = true;
                        break;
                    };
                }

            }
        }

        //console.log(kingActiveCells);

        if(matt == false){
            for(var i = 0; i < 8; i++){
                for(var j = 0; j < 8; j++){
                    if(cells[i][j].getFigure() !== null && !cells[i][j].getFigure().getIsOpposite()){
                        var currentFigure = cells[i][j].getFigure();
                        currentFigure.readyToMove(game);
                        var currentFigureActiveCells = currentFigure.getActiveCells();
                        for(var z = 0; z < currentFigureActiveCells.length; z++){
                            currentFigureActiveCells[z].getImage().visible = false;
                        }
                        for(var k = 0; k < currentFigureActiveCells.length; k++){

                            for(var l = 0; l < kingActiveCells.length; l++){
                               // console.log(currentFigureActiveCells[k].getCoordinates() !== kingActiveCells[l].getCoordinates());
                                if(currentFigureActiveCells[k].getCoordinates() !== kingActiveCells[l].getCoordinates()){
                                    collisionAllActiveKingCells = false;
                                }
                            }
                        }
                    }
                }
            }
        }


        matt = kingActiveCells.length > 0 ? collisionAllActiveKingCells : false;

        return {
            'chess': chess,
            'matt': matt
        }

    }

    return Figure;

})()