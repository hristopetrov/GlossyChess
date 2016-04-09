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

    Figure.prototype.move = function (game) {
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
                this.currentCell.setFigure(null);

                for (var j = 0; j < this.activeCells.length; j++) {
                    this.activeCells[j].getImage().visible = false;
                    this.activeCells[j].getImage().events.onInputDown.dispose();
                }

                var moveCharcode = this.currentCell.getCoordinates() + ' ' + this.activeCell.getCoordinates();
                console.log('move: ' + moveCharcode);
                //send to server

                conn.send(self.makeMirrorMove(moveCharcode));

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
            console.log(game.board);
            game.board.events.onInputDown.add(function () {
                console.log('im in');
                for (var i = 0; i < activeCells.length; i++) {
                    console.log('maikati');
                    activeCells[i].getImage().visible = false;
                }

                activeCells = [];
            });
        }
    }

    return Figure;

})()