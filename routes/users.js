module.exports = function (server, models) {
    var Player = models["Player"];
    //Required for NotFoundError when a player does not exist
    var restify = require('restify');

    function getAllUsersResponse(request, response, next) {

        Player.find({}, function (err, players) {
            if (err) return console.error(err);
            response.send(players);
            next();
        });

    }

    function getUserResponse(request, response, next) {
        Player.find({"_id": request.params.id}, function (err, player) {
            response.send(player);
            next();
        });
    }

    function putUserResponse(request, response, next) {
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
            var newPlayer = Player({alias : request.body.alias});
            newPlayer.save(function(err) {
                if(err) throw err;
                response.send(newPlayer);
                next();
            });
        }
    }

    server.get('/users', getAllUsersResponse);
    server.get('/user/:id', getUserResponse);
    server.put('/user', putUserResponse);

};