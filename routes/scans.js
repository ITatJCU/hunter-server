module.exports = function (server, models) {
    var Code = models['Code'];
    var Event = models['Event'];
    var Player = models['Player'];

    var restify = require('restify');

    /**
     * Add a new scan for a player
     * @param request
     * @param response
     * @param next
     */
    function addPlayerScan(request, response, next) {

        var playerId = request.headers.player;

        if (!playerId) {
            response.send(new restify.UnauthorizedError("Player Not Identified"));
        } else {
            Player.findOne({"_id": playerId}, function (err, player) {
                if (err) return next(new restify.NotFoundError("Unknown Player Specified"));

                player.scans.push({
                    event: request.params.eventId,
                    code: request.params.codeId
                });
                player.validate(function(err) {
                    //err.errors would contain a validation error for manufacturer with default message

                    if (err) return next(new restify.NotFoundError("Invalid Code or Event Id Specified"));
                    else{
                        player.save(function (err){
                            if (err) throw err;
                            response.send(player);
                            next();
                        })
                    }

                });

            });
        }
    }

    server.get('/scan/:eventId/:codeId', addPlayerScan);

};