module.exports = function (server, models) {
    var Player = models["Player"];
    //Required for NotFoundError when a player does not exist
    var restify = require('restify');

    function getAllPlayersResponse(request, response, next) {

        Player.find({}, function (err, players) {
            if (err) return console.error(err);
            response.send(players);
            next();
        });

    }

    function getPlayerResponse(request, response, next) {
        Player.find({"_id": request.params.id}, function (err, player) {
            response.send(player);
            next();
        });
    }

    function putPlayerResponse(request, response, next) {
        if (request.body._id !== null && request.body._id != undefined) {
            Player.findOne({_id: request.body._id}, function (err, player) {
                if (err) return next(new restify.NotFoundError("Unknown user"));
                player.alias = request.body.alias;
                player.save(function (err) {
                    if (err) throw err;
                    response.send(player);
                    next();
                });
            });
        } else {
            var newPlayer = Player({alias: request.body.alias});
            newPlayer.save(function (err) {
                if (err) throw err;
                response.send(newPlayer);
                next();
            });
        }
    }

    function removePlayer(request, response, next) {
        Player.remove({_id: request.params.id}, function (err) {
            if (err) {
                console.log("failed to remove : " + request);
                response.send("failed to remove : " + request);
            } else {
                console.log(request + "deleted : ");
                response.send(request + "deleted : ");
            }
        });
        next();
    }

    function createPlayer(request, response, next) {
        var newPlayer = Player({alias: request.body.alias});
        newPlayer.save(function (err) {
            if (typeof err === 'undefined') {
                response.send(newPlayer);
                next();
            }
            else {
                response.setHeader('content-type', 'application/json');
                response.send(400, { message: err.message });
                next();
            }
        });
    }

    server.get('/players', getAllPlayersResponse);
    server.get('/players/:id', getPlayerResponse);
    server.put('/players', putPlayerResponse);
    server.del('/players/:id', removePlayer);
    server.post('/players', createPlayer);
};
