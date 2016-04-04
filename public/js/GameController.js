var chessGame = (function () {
    var gameInstance;

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

        function create() {
            game.add.image(0, 0, 'board');
            var cells = [],
                i = 0,
                j = 0;
            for (var y = 54; y < CELL_PIXELS * 8; y += CELL_PIXELS) {
                cells[i] = [];
                j = 0;
                for (var x = 54; x < CELL_PIXELS * 8; x += CELL_PIXELS) {
                    var cell = game.add.image(x, y, 'cell');
                    var parent = cell;
                    cell.visible = false;
                    cell.inputEnabled = true;
                    if (i == 1) {
                        var oppositePawn = game.add.image(x - 2, y, 'pawn_black');

                        //cell.addChild(whitePawn);
                    }
                    if (i == 6) {
                        var myPawn = game.add.image(x - 2, y, 'pawn_white');
                    }
                    if (i == 0) {
                        if (j == 0 || j == 7) {
                            var oppositeRook = game.add.image(x - 2, y, 'rook_black')
                        }
                        if (j == 1 || j == 6) {
                            var oppositeKnight = game.add.image(x - 2, y, 'knight_black')
                        }
                        if(j == 2 || j == 5){
                            var oppositeBishop = game.add.image(x - 2, y, 'bishop_black')
                        }
                        if(j == 3){
                            var oppositeQueen = game.add.image(x - 2, y, 'queen_black')
                        }
                        if(j == 4){
                            var oppositeKing = game.add.image(x - 2, y , 'king_black')
                        }
                    }
                    if(i == 7) {
                        if (j == 0 || j == 7) {
                            var myRook = game.add.image(x - 2, y, 'rook_white')
                        }
                        if (j == 1 || j == 6) {
                            var myKnight = game.add.image(x - 2, y, 'knight_white')
                        }
                        if(j == 2 || j == 5){
                            var myBishop = game.add.image(x - 2, y, 'bishop_white')
                        }
                        if(j == 3){
                            var myQueen = game.add.image(x - 2, y, 'queen_white')
                        }
                        if(j == 4){
                            var myKing = game.add.image(x - 2, y , 'king_white')
                        }
                    }

                    (function (cell) {
                        cell.events.onInputDown.add(listener, this)
                    })(cell);

                    cells[i][j] = cell;
                    j++;
                }
                i++;
            }

            /*   var cell = game.add.image(54,54,'cell');
             cell.inputEnabled = true;
             cell.events.onInputDown.add(listener, this);*/

            function listener() {
                cell.visible = true;
                console.log('clicked');
            }
        }
    }


    return {
        init: init
    }
})();