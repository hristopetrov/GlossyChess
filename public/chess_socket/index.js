var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var gameRooms = {};

server.listen(8088);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');


    socket.on('joinRoom', function (data) {
        console.log(data);

        console.log('Game rooms');
        console.log(gameRooms);

        //Vkarvame potrebitelq v staqta
        if (typeof gameRooms[data.roomId] != 'undefined' && gameRooms[data.roomId].playersJoined < 2) {
            console.log('Empty room found');

            gameRooms[data.roomId].addPlayer(data.playerId);
            //dobavq horata v otdelna staq - komynikaciq na socket-a
            //socket.join(data.roomId.toString());

            if (gameRooms[data.roomId].playersJoined == 2) {
                socket.broadcast.emit('startGame', {
                    playerOnMove: gameRooms[data.roomId].getPlayerOnMove()
                });
            }

            console.log('Players in room: ' + gameRooms[data.roomId].playersJoined);
        //V staqta imame 2ma igracha => e pulna
        } else if (typeof gameRooms[data.roomId] != 'undefined' && gameRooms[data.roomId].playersJoined == 2) {
            socket.emit('error', 'Room is full!');

        //Staqta ne sushtestvuva, suzdavame q
        } else if (typeof gameRooms[data.roomId] == 'undefined') {
            console.log('Creating new room');

            gameRooms[data.roomId] = new Room();
            gameRooms[data.roomId].addPlayer(data.playerId);

            console.log('Players in room: ' + gameRooms[data.roomId].playersJoined);

            //dobavq horata v otdelna staq - komynikaciq na socket-a
            //socket.join(data.roomId.toString());
        }
    });



    socket.on('moveFigure', function (data) {
        console.log(data);
        //proverka dali potrebitelq koito trqbva e pratil hoda
        if (data.playerId == gameRooms[data.roomId].getPlayerOnMove()) {
            gameRooms[data.roomId].changeTurn();

            socket.broadcast.emit('moveFigure', {
                playerOnMove: gameRooms[data.roomId].getPlayerOnMove(),
                move: data.move,
                isMatt: data.isMatt
            });
        }



    });
});




function Room() {
    this.playersJoined = 0;
    this.players = []; //masiv ot id-ta na igrachite
    this.playerOnMove = 0;

    this.addPlayer = function (playerId) {
        this.players.push(playerId);
        this.playersJoined++;
    };

    this.getPlayerOnMove = function () {
      return this.players[this.playerOnMove];
    };

    this.changeTurn = function () {
        this.playerOnMove++;
        if (this.playerOnMove >= 2) {
            this.playerOnMove = 0;
        }
    }
}
