/*angular.module('chessApp').factory('socket', function ($rootScope) {*/
var ws = require('nodejs-websocket');
const MY_GAME_ID = 'my-game';


var clients = [];
var gameIDInfo = {MY_GAME_ID: []};

function onDisconnect(socket) {
    var index = clients.indexOf(socket);

    if (clients[index]) {
        clients.splice(index, 1);
    }

    if (gameIDInfo[socket.gameID]) {
        index = gameIDInfo[socket.gameID].indexOf(socket.$$$unuiqueID);
        if (index > -1) {
            gameIDInfo[socket.gameID].splice(index, 1);
        }
    }

    console.log(index + 'removed');
}

function register(socket) {
    socket.$$$unuiqueID = Date.now() + Math.random();
    //TODO - some game id negotiation
    addGameID({id: MY_GAME_ID}, socket);
    clients.push(socket);
    socket.sendText(JSON.stringify({'type': 'connected', syncID: socket.$$$unuiqueID, gameID: MY_GAME_ID}));
    console.log("Socket registered...\n");
}

function addGameID(params, socket) {
    "use strict;"
    params.id = params.id ? params.id : MY_GAME_ID;
    socket.gameID = params.id;

    if (!gameIDInfo[socket.gameID]) {
        gameIDInfo[socket.gameID] = [];
    }

    gameIDInfo[socket.gameID].push(socket.$$$unuiqueID)

}

function onDataReceived(data, socket) {
    console.log(data);
    switch (data.type) {
        case 'add_game_id' :
            addGameID(data, socket);
            break;
        case 'data.all' :
            for (var i in clients) {
                if (clients[i] != socket) {
                    clients[i].sendText(JSON.stringify(data));
                }
            }
            break;
        case 'data.game' :
            for (var i = 0; i < clients.length;i++) {
                console.log(clients[i].gameID, data.gameID);
                if (clients[i] != socket && data.gameID == socket.gameID) {
                    var txt = JSON.stringify(data);
                    clients[i].sendText(txt);
                    console.log('Data sent : ' + txt);
                }
            }
            break;
    }
}

    /*socket.on = function (eventName, callback) {
        socket.addEventListener('message', function (event) {
            var normalizedEvent = JSON.parse(event.data);
            if (normalizedEvent.eventName == eventName) {
                callback();
            }
        });

        //socket.on(eventName, function () {
        //    var args = arguments;
        //    $rootScope.$apply(function () {
        //        callback.apply(socket, args);
        //    });
        //});
    };

    socket.emit = function (eventName, data) {
        //socket.emit(eventName, data, function () {
        //    var args = arguments;
        //    $rootScope.$apply(function () {
        //        if (callback) {
        //            callback.apply(socket, args);
        //        }
        //    });
        //})

        var eventData = {
            eventName: eventName,
            data: data
        };

        socket.send(JSON.stringify(eventData));
    }*/

    ws.createServer(function(socket){
        register(socket);

        socket.on('text', function (data) {
            try {
                var json = JSON.parse(data);
                onDataReceived(json, socket);
                console.log('Data received: ' + data );
            } catch (e) {
                console.error(e);
            }

        });

        socket.on('close', function (code, reason) {

            onDisconnect(socket);
        })
        console.log('connected');
    }).listen(5000);



   /* return socket;
});*/