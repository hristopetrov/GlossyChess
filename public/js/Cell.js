var Cell = (function () {
    function Cell(game, x, y, coordinates, image, figure){
        var _game = game;

        var _x = x;

        var _y = y;

        var _coordinates = coordinates;

        var _image = image;

        var _figure = null;

        this.getGame = function () {
            return _game;
        }

        this.setGame = function (game) {
            _game = game;
        }

        this.getX = function () {
            return _x;
        }

        this.setX = function (x) {
            _x = x;
        }

        this.getY = function () {
            return _y;
        }

        this.setY = function (y) {
            _y = y;
        }

        this.getCoordinates = function () {
            return _coordinates
        }

        this.setCoordinates = function (coordinates) {
            _coordinates= coordinates;
        }

        this.getImage = function () {
            return _image;
        }

        this.setImage = function (image) {
            _image = image;
        }

        this.getFigure = function () {
            return _figure;
        }

        this.setFigure = function (figure) {
            _figure = figure;
        }
    }

    return Cell;
})()