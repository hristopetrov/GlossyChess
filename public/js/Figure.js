var Figure = (function () {
    function Figure(game, cell, chessCoordinates, image, isOpposite) {

        if (typeof this.constructor === 'Figure') {
            throw new Error('You cannot create instance of Figure!');
        }

        var _game = game;

        var _cell = cell;

        var _image = image;

        var _chessCoordinates = chessCoordinates;

        var _activeCells = [];

        var _isOpposite = isOpposite;

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

            (function (activeCell) {
                activeCell.getImage().events.onInputDown.add( function () {

                    console.log('Clicked!');
                    /*if (activeCell.getFigure() != null) {
                        $(".my-taken-figures").append(activeCell.getFigure().getDom());
                        activeCell.getDom().html(self.getDom());
                    }*/
                    var image = self.getImage();
                    var animation = game.add.tween(image);
                    animation.to({x: activeCell.getImage().x, y: activeCell.getImage().y}, 1500, Phaser.Easing.Linear.In, true);
                    animation.start();
                    activeCell.setFigure(self);
                    //$(this).append(self.getDom());
                    /*self.getImage().x = activeCell.getX();
                    self.getImage().y = activeCell.getY();*/
                    self.setCell(activeCell);
                    self.setActiveCells([]);
                    currentCell.setFigure(null);
                    //console.log(self);
                    //$(currentCell.getDom()).html('');
                    for (var j = 0; j < activeCells.length; j++) {
                        activeCells[j].getImage().visible = false;
                        //$(activeCells[j].getDom()).off('click.moveFigure');
                    }

                    var moveCharcode = currentCell.getCoordinates() + ' ' + activeCell.getCoordinates();
                    console.log('move: ' + moveCharcode);
                    //send to server

                    //conn.send(self.makeMirrorMove(moveCharcode));

                }, this)
            })(activeCells[i])
        }
        if (activeCells.length > 0) {
            game.events.onInputDown(function (target) {
                if (target.name === 'board' ) {
                   for(var i = 0; i < activeCells.length; i++){
                       activeCells[i].visible = false;
                   }
                }

                activeCells = [];
            });
        }
    }

    return Figure;

})()