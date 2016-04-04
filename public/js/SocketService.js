angular.module('chessApp').factory('socket', function ($rootScope) {
    var socket = new WebSocket('ws://localhost:8088');
    socket.on = function (eventName, callback) {
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
    }

    return socket;
});