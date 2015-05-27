module.exports = function (server, models) {
    var Player = models["Player"];
    //Required for NotFoundError when a player does not exist
    var restify = require('restify');

    function getAllPlayers(request, response, next) {

        Player.find({},"-scans -__v",{sort: { 'createdAt' : -1 }}, function (err, players) {
            if (err) return console.error(err);
            response.send({ players: players });
            next();
        });

    }

    function getPlayerById(request, response, next) {
        Player.findOne({"_id": request.params.id}, function (err, player) {
            response.send({ player: player });
            next();
        });
    }

    function updatePlayer(request, response, next) {
        Player.findOne({_id: request.body._id}, function (err, player) {
            if (err) return next(new restify.NotFoundError("Unknown user"));
            player.alias = request.body.alias;
            player.save(function (err) {
                if (err) throw err;
                response.send({ player: player });
                next();
            });
        });
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
            if (!err) {
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

    function upsertPlayer(request, response, next) {
        if (request.body._id !== null && request.body._id != undefined) {
            updatePlayer(request, response, next);
        } else {
            createPlayer(request, response, next);
        }
    }

    //Workaround as .head is not sending data in the response
    server.get('/players', getAllPlayers);
    server.get('/players/:id', getPlayerById);
    server.put('/players', upsertPlayer);
    server.del('/players/:id', removePlayer);
    server.post('/players', createPlayer);

};
