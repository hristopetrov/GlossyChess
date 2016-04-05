var chessGame = (function () {
   // var gameInstance;
    this.cells = [];

    function init() {
        var game = new Phaser.Game(700, 700, Phaser.AUTO, 'myCanvas', {preload: preload, create: create});

        function preload() {
            game.load.image('board', 'images/CHW31-2.gif');
            game.load.image('bishop_black', 'images/bishop_black.png');
            game.load.image('bishop_white', 'images/bishop_white.png');
            game.load.image('king_black', 'images/king_black.png');
            game.load.image('king_white', 'images/king_white.png');
            game.load.image('knight_black', 'images/knight_black.png');
            game.load.image('knight_white', 'images/knight_white.png');
            game.load.image('pawn_black', 'images/pawn.png');
            game.load.image('pawn_white', 'images/pawn_white.png');
            game.load.image('queen_black', 'images/queen_black.png');
            game.load.image('queen_white', 'images/queen_white.png');
            game.load.image('rook_black', 'images/rook_black.png');
            game.load.image('rook_white', 'images/rook_white.png');
            game.load.image('cell', 'images/cell_active.png');
        }

        var CELL_PIXELS = 74;
        var START_PIXELS = 54;
        var CELL_ROWS = 8;

        function create() {
            game.add.image(0, 0, 'board');
            var i = 0,
                j = 0;
            var horizontals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            for (var y = START_PIXELS; y < CELL_PIXELS * 8; y += CELL_PIXELS) {
                j = 0;
                cells[i] = [];

                for (var x = START_PIXELS; x < CELL_PIXELS * 8; x += CELL_PIXELS) {
                    var cell = game.add.image(x, y, 'cell');
                    var coordinates = horizontals[j] + (7 - i + 1);

                    var cellBoard = new Cell(game, x, y, coordinates, cell);
                    //var parent = cell;
                    cell.visible = false;
                    cell.inputEnabled = true;
                    if (i == 1) {
                        //console.log(coordinates, Math.floor(x / CELL_PIXELS));
                        var oppositePawn = game.add.image(x - 2, y + 2, 'pawn_black');
                        var oppositePawnFigure = new Pawn(game, cellBoard, coordinates, oppositePawn, true);
                        oppositePawn.inputEnabled = true;
                        cellBoard.setFigure(oppositePawnFigure);
                        //cell.addChild(whitePawn);
                    }
                    if (i == 6) {
                        var myPawn = game.add.image(x - 2, y + 2, 'pawn_white');
                        var myPawnFigure = new Pawn(game, cellBoard, coordinates, myPawn, false);
                        myPawn.inputEnabled = true;
                        cellBoard.setFigure(myPawnFigure);
                    }
                    if (i == 0) {
                        if (j == 0 || j == 7) {
                            var oppositeRook = game.add.image(x - 2, y + 2, 'rook_black');
                            var oppositeRookFigure = new Rook(game, cellBoard, coordinates, oppositeRook, true);
                            oppositeRook.inputEnabled = true;
                            cellBoard.setFigure(oppositeRookFigure);
                        }
                        if (j == 1 || j == 6) {
                            var oppositeKnight = game.add.image(x - 2, y + 2, 'knight_black');
                            var oppositeKnightFigure = new Knight(game, cellBoard, coordinates, oppositeKnight, true);
                            oppositeKnight.inputEnabled = true;
                            cellBoard.setFigure(oppositeKnightFigure);
                        }
                        if (j == 2 || j == 5) {
                            var oppositeBishop = game.add.image(x - 2, y + 2, 'bishop_black');
                            var oppositeBishopFigure = new Bishop(game, cellBoard, coordinates, oppositeBishop, true);
                            oppositeBishop.inputEnabled = true;
                            cellBoard.setFigure(oppositeBishopFigure);
                        }
                        if (j == 3) {
                            var oppositeQueen = game.add.image(x - 2, y + 2, 'queen_black');
                            var oppositeQueenFigure = new Queen(game, cellBoard, coordinates, oppositeQueen, true);
                            cellBoard.setFigure(oppositeQueenFigure);
                        }
                        if (j == 4) {
                            var oppositeKing = game.add.image(x - 2, y + 2, 'king_black');
                            var oppositeKingFigure = new King(game, cellBoard, coordinates, oppositeKing, true);
                            oppositeKing.inputEnabled = true;
                            cellBoard.setFigure(oppositeKingFigure);
                        }
                    }
                    if (i == 7) {
                        if (j == 0 || j == 7) {
                            var myRook = game.add.image(x - 2, y + 2, 'rook_white');
                            var myRookFigure = new Rook(game, cells[i][j], coordinates, myRook, false);
                            myRook.inputEnabled = true;
                            cellBoard.setFigure(myRookFigure);
                        }
                        if (j == 1 || j == 6) {
                            var myKnight = game.add.image(x - 2, y + 2, 'knight_white');
                            var myKnightFigure = new Knight(game, cells[i][j], coordinates, myKnight, false);
                            myKnight.inputEnabled = true;
                            cellBoard.setFigure(myKnightFigure);
                        }
                        if (j == 2 || j == 5) {
                            var myBishop = game.add.image(x - 2, y + 2, 'bishop_white');
                            var myBishopFigure = new Bishop(game, cells[i][j], coordinates, myBishop, false);
                            myBishop.inputEnabled = true;
                            cellBoard.setFigure(myBishopFigure);
                        }
                        if (j == 3) {
                            var myQueen = game.add.image(x - 2, y + 2, 'queen_white');
                            var myQueenFigure = new Queen(game, cells[i][j], coordinates, myQueen, false);
                            myQueen.inputEnabled = true;
                            cellBoard.setFigure(myQueenFigure);
                        }
                        if (j == 4) {
                            var myKing = game.add.image(x - 2, y + 2, 'king_white');
                            var myKingFigure = new King(game, cells[i][j], coordinates, myKing, false);
                            myKing.inputEnabled = true;
                            cellBoard.setFigure(myKingFigure);
                        }
                    }

                  /*  (function (cell) {
                        cell.events.onInputDown.add(function () {
                            cell.visible = false;
                        }, this);
                        //console.log(cellBoard.getCoordinates());
                    })(cellBoard.getImage());*/
                    cells[i][j] = cellBoard;


                    j++;
                }
                i++;
            }

        }

        function cellAt(position) {
            var found = false;
            var cell = {};
            for(var i = 0; i < CELL_ROWS; i++){
                for(var j = 0; j < CELL_ROWS; j++){
                    if(cells[i][j].getCoordinates() === position){
                        found = true;
                        cell = cells[i][j];
                        break;
                    }
                }
            }

            return cell;
        }


        (function initializeFigures() {
            console.log('initializeFigures', cells);
            var self = this;
            for(var i = 0; i < CELL_ROWS; i++){
                for(var j = 0; j < CELL_ROWS; j++){
                    var index = cells[i][j].getCoordinates();
                    var cell = cells[i][j];

                    (function (cell){
                        var figureImage = cell.getFigure().getImage();
                        figureImage.events.onInputDown( function(){
                            if (!cell.getFigure().getIsOpposite() ) {
                                //event.stopPropagation();
                                cell.getFigure().readyToMove(self);
                                cell.getFigure().move(self);
                            }

                        }, this);

                    })(cell);

                }
            }


        })();


    }


    return {
        init: init
    }
})();